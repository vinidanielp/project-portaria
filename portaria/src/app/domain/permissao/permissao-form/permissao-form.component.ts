import { PermissaoService } from './../services/permissao.service';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { first } from 'rxjs';
import { Permissao } from 'src/app/core/models/permissao';

@Component({
  selector: 'app-permissao-form',
  templateUrl: './permissao-form.component.html',
  styleUrls: ['./permissao-form.component.scss']
})
export class PermissaoFormComponent {
  private rota: string = this.route.snapshot.url[2].path;

  public tituloPagina: string = '';

  public formPermissao!: UntypedFormGroup;

  private idPermissao: number | any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private formGroup: UntypedFormBuilder,
    private poNotification: PoNotificationService,
    private permissaoService: PermissaoService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((parameters) => {
      this.idPermissao = parameters.get('id');
    });

    //se tem 'novo' e ID na URL, significa alteração
    if (this.rota === 'novo' && !this.idPermissao) {
      this.tituloPagina = 'Nova Permissão';
    }

    //se tem 'editar' e ID na URL, significa alteração
    if (this.rota === 'editar' && this.idPermissao) {
      this.tituloPagina = 'Alterar Permissão';
    }

    this.iniciarForm();

    this.rota !== 'novo' ? this.setValorForm() : null;
  }

   //Inicia o formulário
   private iniciarForm(): void {
    this.formPermissao = this.formGroup.group({
      id: 0,
      nome: null,
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
    return this.formPermissao.valid ? false : true;
  }

  private voltarPagina() {
    this.location.back();
  }

  public cancelar() {
    this.voltarPagina();
    this.poNotification.information('Alterações canceladas!');
  }

  public salvar(): void {
    if (this.idPermissao) {
      this.editarPermissao();
    } else {
      this.novaPermissao();
    }
  }

  // Método grava nova permissão
  private novaPermissao() {
    if (this.formPermissao.valid) {
      this.permissaoService
        .postNovaPermissao(this.formPermissao.value)
        .subscribe({
          next: () => {
            this.formPermissao.reset();
            this.voltarPagina();
            this.poNotification.success('Permissão cadastrado com Sucesso.');
          },
          error: () => {
            this.poNotification.error(
              'Erro de comunicação com o servidor, Permissão não foi salva.'
            );
          },
        });
    }
  }

  // Método editar permissão
  private editarPermissao() {
    if (this.formPermissao.valid) {
      this.permissaoService
        .putEditarPermissao(this.formPermissao.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.formPermissao.reset();
            this.voltarPagina();
            this.poNotification.success('Permissão alterada com Sucesso.');
          },
          error: () => this.poNotification.error('Erro ao alterar Permissão.'),
        });
    }
  }

  // Método para atribuir valores aos campos do formulário, metodo editar
  private setValorForm(): void {
    this.permissaoService
      .getPermissaoById(this.idPermissao)
      .pipe(first())
      .subscribe((permissao: Permissao) => {
        this.formPermissao.patchValue(permissao);
      });
  }
}
