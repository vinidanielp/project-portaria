import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoPageAction,
  PoTableAction,
  PoTableColumn,
} from '@po-ui/ng-components';
import { first } from 'rxjs';
import { Veiculo } from 'src/app/core/models/veiculo';
import { VeiculoService } from '../services/veiculo.service';

@Component({
  selector: 'app-veiculo-list',
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.scss'],
})
export class VeiculoListComponent {
  @ViewChild('modalInativarVeiculo', { static: true })
  modalInativarVeiculo!: PoModalComponent;

  public nomeVeiculo: string = '';
  public listaVeiculos: Array<Veiculo> = new Array();
  public veiculoSelecionado: Veiculo = new Veiculo();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private veiculoService: VeiculoService,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.carregarListaVeiculos();
  }

  //Metódo responsável por listar os veiculos
  public carregarListaVeiculos(): void {
    this.veiculoService.getVeiculos().subscribe({
      next: (response) => {
        this.listaVeiculos = response.content.map((veiculo: Veiculo) => {
          veiculo.status = veiculo.status ? 'true' : 'false';
          return veiculo;
        });
      },
      error: () => {
        this.poNotification.error('Erro ao carregar os Veículos.');
      },
    });
  }

  //Ações do header
  public readonly acoesFiltro: Array<PoPageAction> = [
    { label: 'Novo', action: this.novoVeiculo.bind(this) },
  ];

  //Tabela
  public readonly colunas: Array<PoTableColumn> = [
    {
      property: 'id',
      label: 'Código',
      visible: true,
    },
    {
      property: 'idFilial',
      label: 'Filial',
      visible: true,
    },
    {
      property: 'motorista',
      label: 'Motorista',
      visible: true,
    },
    {
      property: 'proprietario',
      label: 'Proprietário',
      visible: false,
    },
    {
      property: 'placa',
      label: 'Placa',
      visible: true,
    },
    {
      property: 'modelo',
      label: 'Modelo',
      visible: true,
    },
    {
      property: 'marca',
      label: 'Marca',
      visible: true,
    },
    {
      property: 'chassis',
      label: 'Chassis',
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

  acoesTabela: Array<PoTableAction> = [
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

  private novoVeiculo() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  private visualizar(veiculo: Veiculo) {
    this.router.navigate(['visualizar', veiculo.id], {
      relativeTo: this.route,
    });
  }

  private editar(veiculo: Veiculo) {
    this.router.navigate(['editar', veiculo.id], { relativeTo: this.route });
  }

  private isAtivo(veiculo: Veiculo) {
    return veiculo.status === 'true' ? false : true;
  }

  private modalInativar(veiculo: Veiculo) {
    this.veiculoSelecionado = veiculo;
    this.nomeVeiculo = veiculo.modelo;
    this.modalInativarVeiculo.open();
  }

  cancelar: PoModalAction = {
    action: () => {
      this.modalInativarVeiculo.close();
    },
    label: 'Não',
    danger: true,
  };

  confirmar: PoModalAction = {
    action: () => {
      this.excluir();
      this.modalInativarVeiculo.close();
    },
    label: 'Sim',
  };

  private excluir() {
    this.veiculoService
      .deleteVeiculo(this.veiculoSelecionado)
      .pipe(first())
      .subscribe({
        next: () => {
          this.carregarListaVeiculos();
          this.poNotification.success('Veículo Inativado.');
        },
        error: () => this.poNotification.error('Erro ao excluir Veículo.'),
      });
  }
}
