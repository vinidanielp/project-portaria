import { first } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {
  PoNotificationService,
  PoPageAction,
  PoSelectOption,
} from '@po-ui/ng-components';
import { UsuarioService } from '../services/usuario.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { Filial } from 'src/app/core/models/filial';
import { Usuario } from 'src/app/core/models/usuario';
import { Perfil } from 'src/app/core/models/perfil';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
})
export class UsuarioFormComponent {
  private rota: string = this.route.snapshot.url[2].path;

  public tituloPagina: string = '';
  public acoes: Array<PoPageAction> = [];

  public formUsuario!: UntypedFormGroup;

  public filiaisOptions: Array<PoSelectOption> = [];
  private filiais: Array<Filial> = [];

  public perfisOptions: Array<PoSelectOption> = [];
  private perfis: Array<Perfil> = [];

  public idUsuario: number | any;
  public isDisabledBool: boolean = false;
  public isDisabledString: string = 'false';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private poNotification: PoNotificationService,
    private usuarioService: UsuarioService,
    private formGroup: UntypedFormBuilder
  ) {
    this.route.data.subscribe((data) => {
      this.filiais = data['filialData'].content;
      this.perfis = data['perfilData'].content;

      this.filiaisOptions = this.filiais.map((filial) => ({
        label: `${filial.id} - ${filial.nome}`,
        value: filial.id,
      }));

      this.perfisOptions = this.perfis.map((perfil) => ({
        label: `${perfil.id} - ${perfil.nome}`,
        value: perfil.id !== null ? perfil.id : 0,
      }));
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parameters) => {
      this.idUsuario = parameters.get('id');
    });

    this.iniciarForm();

    //se tem 'novo' e ID na URL, significa alteração
    if (this.rota === 'novo' && !this.idUsuario) {
      this.tituloPagina = 'Novo Usuário';
    }

    //se tem 'editar' e ID na URL, significa alteração
    if (this.rota === 'editar' && this.idUsuario) {
      this.tituloPagina = 'Alterar Usuário';
    }

    //se tem 'visualizar' e ID na URL, significa alteração
    if (this.rota === 'visualizar' && this.idUsuario) {
      this.tituloPagina = 'Visualizar Usuário';
      this.isDisabledBool = true;
      this.isDisabledString = 'true';
    }

    this.rota !== 'visualizar'
      ? (this.acoes = this.acoesDefault)
      : (this.acoes = this.acoesVisualizar);

    this.rota !== 'novo' ? this.setValorForm() : null;
  }

  //Ações de acordo com o tipo de método
  private readonly acoesDefault: Array<PoPageAction> = [
    {
      label: 'Salvar',
      action: this.salvar.bind(this),
      icon: 'po-icon-ok',
      disabled: this.validarForm.bind(this),
    },
    {
      label: 'Cancelar',
      action: this.cancelar.bind(this),
      icon: 'po-icon-close',
    },
  ];

  private readonly acoesVisualizar: Array<PoPageAction> = [
    { label: 'Voltar', action: this.cancelar.bind(this) },
  ];

  //Inicia o formulário
  private iniciarForm(): void {
    this.formUsuario = this.formGroup.group({
      id: null,
      nome: [''],
      login: [''],
      email: [''],
      idPerfil: [''],
      filiais: [''],
      status: null,
    });
  }

  private voltarPagina() {
    this.location.back();
  }

  private validarForm(): Boolean {
    return this.formUsuario.valid ? false : true;
  }

  //Método para atribuir valores aos campos do formulário, metodo editar
  private setValorForm(): void {
    this.usuarioService
      .getUsuarioById(this.idUsuario)
      .pipe(first())
      .subscribe((usuario: Usuario) => {
        this.formUsuario.patchValue({
          ...usuario,
          filiais: usuario.filiais.map((res: Filial) => res.id)
        });
      });
  }

  public cancelar() {
    this.voltarPagina();

    this.rota !== 'visualizar'
      ? this.poNotification.information('Alterações canceladas!')
      : null;
  }

  public salvar(): void {
    if (this.idUsuario) {
      this.editarUsuario();
    } else {
      this.novoUsuario();
    }
  }

  // Método grava novo usuario
  private novoUsuario() {
    if (this.formUsuario.valid) {
      this.usuarioService.postUsuario(this.formUsuario.value).subscribe({
        next: () => {
          this.formUsuario.reset();
          this.voltarPagina();
          this.poNotification.success('Usuário cadastrado com Sucesso.');
        },
        error: () => {
          this.poNotification.error('Erro de comunicação com o servidor, Usuário não foi salvo.');
        },
      });
    }
  }

  // Método editar usuario
  private editarUsuario() {
    if (this.formUsuario.valid) {
      this.usuarioService
        .putUsuario(this.formUsuario.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.formUsuario.reset();
            this.voltarPagina();
            this.poNotification.success('Usuário alterado com Sucesso.');
          },
          error: () => this.poNotification.error('Erro ao alterar Usuário.'),
        });
    }
  }
}
