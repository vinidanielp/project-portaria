import { PerfilService } from './../services/perfil.service';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoModalAction, PoModalComponent, PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { first } from 'rxjs';
import { Perfil } from 'src/app/core/models/perfil';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.scss']
})
export class PerfilListComponent {

  @ViewChild('modalExcluir', { static: true })
  modalExcluirPerfil!: PoModalComponent;

  public nomePerfil: string = '';
  public listaPerfis: Array<Perfil> = new Array();
  private perfilSelecionado: Perfil = new Perfil();


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private poNotification: PoNotificationService,
    private perfilService: PerfilService,
  ) {}

  ngOnInit(): void {
    this.carregarListaPerfis();
  }

  //Metódo responsável por listar os perfis
  public carregarListaPerfis(): void {
    this.perfilService.getListaPerfis().subscribe({
      next: (response) => {
        this.listaPerfis = response.content;
      },
      error: () => {
        this.poNotification.error('Erro ao carregar os Perfis.');
      },
    });
  }
  //Ações do header
  public readonly acoesFiltro: Array<PoPageAction> = [
    { label: 'Novo', action: this.novoPerfil.bind(this) },
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

  private novoPerfil() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  private editar(perfil: Perfil) {
    this.router.navigate(['editar', perfil.id], { relativeTo: this.route });
  }

  private modalExcluir(perfil: Perfil) {
    this.perfilSelecionado = perfil;
    this.nomePerfil = `${perfil.id} - ${perfil.nome}`;
    this.modalExcluirPerfil.open();
  }

  public cancelar: PoModalAction = {
    action: () => {
      this.modalExcluirPerfil.close();
    },
    label: 'Não',
    danger: true,
  };

  public confirmar: PoModalAction = {
    action: () => {
      this.excluir();
      this.modalExcluirPerfil.close();
    },
    label: 'Sim',
  };

  private excluir() {
    this.perfilService
      .deleteExcluirPerfil(this.perfilSelecionado)
      .pipe(first())
      .subscribe({
        next: () => {
          this.carregarListaPerfis();
          this.poNotification.success('Perfil Excluido.');
        },
        error: () => this.poNotification.error('Erro ao excluir Perfi.'),
      });
  }
}
