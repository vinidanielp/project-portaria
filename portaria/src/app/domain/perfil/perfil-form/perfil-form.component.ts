import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PoMultiselectOption, PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { first } from 'rxjs';
import { PerfilService } from '../services/perfil.service';
import { Perfil } from 'src/app/core/models/perfil';
import { Permissao } from 'src/app/core/models/permissao';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.scss']
})
export class PerfilFormComponent {
  private rota: string = this.route.snapshot.url[2].path;

  public tituloPagina: string = '';

  public formPerfil!: UntypedFormGroup;
  public permissoesOptions: Array<PoMultiselectOption> = [];
  private permissoes: Array<Permissao> = [];

  private idPerfil: number | any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private formGroup: UntypedFormBuilder,
    private poNotification: PoNotificationService,
    private perfilService: PerfilService,
  ) {
    this.route.data.subscribe((data) => {
      this.permissoes = data['permissaoData'].content;

      this.permissoesOptions = this.permissoes.map((permissao) => ({
        label: `${permissao.nome}`,
        value: (permissao.id !== null) ? permissao.id : 0,
        // value: permissao.nome
      }));
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parameters) => {
      this.idPerfil = parameters.get('id');
    });

    //se tem 'novo' e ID na URL, significa alteração
    if (this.rota === 'novo' && !this.idPerfil) {
      this.tituloPagina = 'Novo Perfil';
    }

    //se tem 'editar' e ID na URL, significa alteração
    if (this.rota === 'editar' && this.idPerfil) {
      this.tituloPagina = 'Alterar Perfil';
    }

    this.iniciarForm();

    this.rota !== 'novo' ? this.setValorForm() : null;
  }

  //Inicia o formulário
  private iniciarForm(): void {
    this.formPerfil = this.formGroup.group({
      id: null,
      nome: [""],
      permissoes: [""],
    });
  }

  //Ações de acordo com o tipo de método
  public readonly acoes: Array<PoPageAction> = [
    {
      label: 'Salvar',
      action: this.salvar.bind(this),
      icon: 'po-icon-ok',
      disabled: this.validarForm.bind(this),
    },
    {
      label: 'Cancelar',
      action: this.cancelar.bind(this),
    },
  ];

  private validarForm(): Boolean {
    return this.formPerfil.valid ? false : true;
  }

  private voltarPagina() {
    this.location.back();
  }

  public cancelar() {
    this.voltarPagina();
    this.poNotification.information('Alterações canceladas!');
  }

  public salvar(): void {
    if (this.idPerfil) {
      this.editarPerfil();
    } else {
      this.novoPerfil();
    }
  }

  // Método grava novo perfil
  private novoPerfil() {
    if (this.formPerfil.valid) {
      this.perfilService
        .postNovoPerfil(this.formPerfil.value)
        .subscribe({
          next: () => {
            this.formPerfil.reset();
            this.voltarPagina();
            this.poNotification.success('Perfil cadastrado com Sucesso.');
          },
          error: () => {
            this.poNotification.error(
              'Erro de comunicação com o servidor, Perfil não foi salvo.'
            );
          },
        });
    }
  }

  // Método editar perfil
  private editarPerfil() {
    if (this.formPerfil.valid) {
      this.perfilService
        .putEditarPerfil(this.formPerfil.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.formPerfil.reset();
            this.voltarPagina();
            this.poNotification.success('Perfil alterada com Sucesso.');
          },
          error: () => this.poNotification.error('Erro ao alterar o Perfil.'),
        });
    }
  }

  // Método para atribuir valores aos campos do formulário, metodo editar
  private setValorForm(): void {
    this.perfilService
      .getPerfilById(this.idPerfil)
      .pipe(first())
      .subscribe((perfil: Perfil) => {
        this.formPerfil.patchValue({
          ...perfil,
          permissoes: perfil.permissoes.map(permissao => permissao.id)
        });
      });
  }
}
