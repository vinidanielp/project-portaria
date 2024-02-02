import { PermissaoService } from './../services/permissao.service';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoModalAction, PoModalComponent, PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { first } from 'rxjs';
import { Permissao } from 'src/app/core/models/permissao';

@Component({
  selector: 'app-permissao-list',
  templateUrl: './permissao-list.component.html',
  styleUrls: ['./permissao-list.component.scss']
})
export class PermissaoListComponent {

  @ViewChild('modalExcluir', { static: true })
  modalExcluirPermissao!: PoModalComponent;

  public nomePermissao: string = '';
  public listaPermissoes: Array<Permissao> = new Array();
  private permissaoSelecionada: Permissao = new Permissao();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private permissaoService: PermissaoService,
    private poNotification: PoNotificationService,
  ) {}

  ngOnInit(): void {
    this.carregarListaPermissoes();
  }

  //Metódo responsável por listar as permissões
  public carregarListaPermissoes(): void {
    this.permissaoService.getListaPermissoes().subscribe({
      next: (response) => {
        this.listaPermissoes = response.content;
      },
      error: () => {
        this.poNotification.error('Erro ao carregar as Permissões.');
      },
    });
  }
  //Ações do header
  public readonly acoesFiltro: Array<PoPageAction> = [
    { label: 'Novo', action: this.novaPermissao.bind(this) },
  ];

  public readonly colunas: Array<PoTableColumn> = [
    {
      property: 'id',
      label: 'Código',
      visible: true,
      width: '250px'
    },
    {
      property: 'nome',
      label: 'Nome',
      visible: true,
    },
  ];

  public acoesTabela: Array<PoTableAction> = [
    {
      action: this.editar.bind(this),
      icon: 'po-icon po-icon-edit',
      label: 'Editar',
      separator: true,
    },
    {
      action: this.modalExcluir.bind(this),
      icon: 'po-icon po-icon-delete',
      label: 'Excluir',
      separator: true,
      type: 'danger',
    },
  ];

  private novaPermissao() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  private editar(permissao: Permissao) {
    this.router.navigate(['editar', permissao.id], { relativeTo: this.route });
  }

  private modalExcluir(permissao: Permissao) {
    this.permissaoSelecionada = permissao;
    this.nomePermissao = `${permissao.id} - ${permissao.nome}`;
    this.modalExcluirPermissao.open();
  }

  public cancelar: PoModalAction = {
    action: () => {
      this.modalExcluirPermissao.close();
    },
    label: 'Não',
    danger: true,
  };

  public confirmar: PoModalAction = {
    action: () => {
      this.excluir();
      this.modalExcluirPermissao.close();
    },
    label: 'Sim',
  };

  private excluir() {
    this.permissaoService
      .deleteExcluirPermissao(this.permissaoSelecionada)
      .pipe(first())
      .subscribe({
        next: () => {
          this.carregarListaPermissoes();
          this.poNotification.success('Permissão Excluida.');
        },
        error: () => this.poNotification.error('Erro ao excluir Permissão.'),
      });
  }
}
