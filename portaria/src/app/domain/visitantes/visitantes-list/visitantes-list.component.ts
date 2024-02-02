import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoPageAction,
  PoTableAction,
  PoTableColumn,
} from '@po-ui/ng-components';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitanteService } from '../services/visitante.service';
import { first } from 'rxjs';
import { Visitante } from 'src/app/core/models/visitante';

@Component({
  selector: 'app-visitantes-list',
  templateUrl: './visitantes-list.component.html',
  styleUrls: ['./visitantes-list.component.scss'],
})
export class VisitantesListComponent implements OnInit {
  @ViewChild('modalExcluir', { static: true })
  modalExcluirVisitante!: PoModalComponent;

  public nomeVisitante: string = '';
  public listaVisitantes: Array<Visitante> = new Array();
  private visitanteSelecionado: Visitante = new Visitante();

  public colunasPesquisa: Array<string> = ['id', 'nome'];

  constructor(
    private router: Router,
    private visitanteService: VisitanteService,
    private route: ActivatedRoute,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.carregarListaVisitantes();
  }

  //Metódo responsável por listar os visitantes
  public carregarListaVisitantes(): void {
    this.visitanteService.getVisitantes().subscribe({
      next: (response) => {
        this.listaVisitantes = response.content.map((visitante: Visitante) => {
          visitante.status = visitante.status ? 'true' : 'false';
          return visitante;
        });
      },
      error: () => {
        this.poNotification.error('Erro ao carregar os Visitantes.');
      },
    });
  }

  //Ações do header
  public readonly acoesFiltro: Array<PoPageAction> = [
    { label: 'Novo', action: this.novoVisitante.bind(this) },
  ];
  //Colunas da tabela
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
    { property: 'cpf', label: 'CPF', visible: true },
    { property: 'horaVisita', label: 'Hora', visible: true },
    {
      property: 'dataVisita',
      label: 'Data Visita',
      type: 'date',
      format: 'dd/MM/YYYY',
      visible: true,
    },
    { property: 'contato', label: 'Contato', visible: false },
    {
      property: 'departamento',
      label: 'Departamento',
      visible: true,
    },
    { property: 'empresa', label: 'Empresa', visible: true },
    { property: 'idFilial', label: 'Filial', visible: true },
    { property: 'observacao', label: 'Obs.', visible: false },

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
      action: this.modalExcluir.bind(this),
      icon: 'po-icon po-icon-delete',
      label: 'Excluir',
      separator: true,
      type: 'danger',
    },
  ];

  private novoVisitante() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  private visualizar(visitante: Visitante) {
    this.router.navigate(['visualizar', visitante.id], {
      relativeTo: this.route,
    });
  }

  private editar(visitantes: Visitante) {
    this.router.navigate(['editar', visitantes.id], { relativeTo: this.route });
  }

  private modalExcluir(visitante: Visitante) {
    this.visitanteSelecionado = visitante;
    this.nomeVisitante = visitante.nome;
    this.modalExcluirVisitante.open();
  }

  public cancelar: PoModalAction = {
    action: () => {
      this.modalExcluirVisitante.close();
    },
    label: 'Não',
    danger: true,
  };

  public confirmar: PoModalAction = {
    action: () => {
      this.excluir();
      this.modalExcluirVisitante.close();
    },
    label: 'Sim',
  };

  private excluir() {
    this.visitanteService
      .deleteVisitante(this.visitanteSelecionado)
      .pipe(first())
      .subscribe({
        next: () => {
          this.carregarListaVisitantes();
          this.poNotification.success('Visitante Excluido.');
        },
        error: () => this.poNotification.error('Erro ao excluir Visitante.'),
      });
  }
}
