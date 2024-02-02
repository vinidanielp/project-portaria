import { first } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoPageAction,
  PoTableAction,
  PoTableColumn,
} from '@po-ui/ng-components';
import { Usuario } from 'src/app/core/models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss'],
})
export class UsuarioListComponent implements OnInit {
  @ViewChild('modalInativarUsuario', { static: true })
  modalInativarUsuario!: PoModalComponent;

  public nomeUsuario: string = '';
  public listaUsuarios: Array<Usuario> = new Array();
  private usuarioSelecionado: Usuario = new Usuario();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit() {
    this.carregarListaUsuarios();
  }

  //Metódo responsável por listar os usuarios
  public carregarListaUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (response) => {
        this.listaUsuarios = response.content.map((usuario: Usuario) => {
          usuario.status = usuario.status ? 'true' : 'false';
          return usuario;
        });
      },
      error: () => {
        this.poNotification.error('Erro ao carregar os Usuários.');
      },
    });
  }

  //Ações do header
  public readonly acoesFiltro: Array<PoPageAction> = [
    { label: 'Novo', action: this.novoUsuario.bind(this) },
  ];

  //Tabela
  public readonly colunas: Array<PoTableColumn> = [
    {
      property: 'id',
      label: 'Código',
      visible: true,
    },
    {
      property: 'nome',
      label: 'Nome',
      visible: true,
    },
    {
      property: 'login',
      label: 'Login',
      visible: true,
    },
    {
      property: 'perfil',
      label: 'Perfil',
      visible: true,
    },
    {
      property: 'status',
      label: 'Status',
      type: 'label',
      labels: [
        {
          value: 'true',
          color: 'color-10',
          label: 'Ativo',
          textColor: '#fff',
        },
        {
          value: 'false',
          color: 'color-07',
          label: 'Inativo',
          textColor: '#fff',
        },
      ],
      visible: true,
    },
  ];

  public acoesTabela: Array<PoTableAction> = [
    {
      action: this.visualizar.bind(this),
      icon: 'po-icon po-icon-eye',
      label: 'Visualizar',
      separator: true,
    },
    {
      action: this.editar.bind(this),
      icon: 'po-icon po-icon-edit',
      label: 'Editar',
      separator: true,
    },
    {
      action: this.modalInativar.bind(this),
      icon: 'po-icon po-icon-delete',
      label: 'Excluir',
      separator: true,
      type: 'danger',
      disabled: this.isAtivo.bind(this),
    },
  ];

  private novoUsuario() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  private visualizar(usuario: Usuario) {
    this.router.navigate(['visualizar', usuario.id], {
      relativeTo: this.route,
    });
  }

  private editar(usuario: Usuario) {
    this.router.navigate(['editar', usuario.id], { relativeTo: this.route });
  }

  private isAtivo(usuario: any) {
    return usuario.status === 'A' ? true : false;
  }

  private modalInativar(usuario: Usuario) {
    this.usuarioSelecionado = usuario;
    this.nomeUsuario = usuario.nome;
    this.modalInativarUsuario.open();
  }

  public cancelar: PoModalAction = {
    action: () => {
      this.modalInativarUsuario.close();
    },
    label: 'Não',
    danger: true,
  };

  public confirmar: PoModalAction = {
    action: () => {
      this.excluir();
      this.modalInativarUsuario.close();
    },
    label: 'Sim',
  };

  private excluir() {
    this.usuarioService
      .deleteUsuario(this.usuarioSelecionado)
      .pipe(first())
      .subscribe({
        next: () => {
          this.carregarListaUsuarios();
          this.poNotification.success('Usuário Inativado.');
        },
        error: () => this.poNotification.error('Erro ao excluir Usuário.'),
      });
  }
}
