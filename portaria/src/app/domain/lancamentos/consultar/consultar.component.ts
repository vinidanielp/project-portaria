import { LancamentoService } from './../services/lancamento.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoNotificationService,
  PoTableColumn,
} from '@po-ui/ng-components';
import { Lancamento } from 'src/app/core/models/lancamento';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss'],
})
export class ConsultarComponent {
  listaLancamentos: Array<Lancamento> = new Array();
  veiculoSelecionado: Lancamento = new Lancamento();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lancamentoService: LancamentoService,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.carregarListaLancamentos();
  }

  //Metódo responsável por listar os veiculos
  public carregarListaLancamentos(): void {
    this.lancamentoService.getLancamentos().subscribe({
      next: (response) => {
        console.log(response);

        this.listaLancamentos = response.content;
      },
      error: () => {
        this.poNotification.error('Erro ao carregar os Lançamentos.');
      },
    });
  }

  //Tabela
  public readonly colunas: Array<PoTableColumn> = [
    {
      property: 'id',
      label: 'Lanc.',
      visible: true,
    },
    {
      property: 'idFilial',
      label: 'Filial',
      visible: true,
    },
    {
      property: 'numeroPedido',
      label: 'Pedido',
      visible: true,
    },
    {
      property: 'notaFiscal',
      label: 'NF',
      visible: true,
    },
    {
      property: 'tipoLancamento',
      label: 'Tipo',
      type: 'subtitle',
      width: '115px',
      subtitles: [
        { value: 'C', color: 'color-10', label: 'Carga', content: 'C' },
        { value: 'D', color: 'color-03', label: 'Descarga', content: 'D' },
      ],
      visible: true,
    },

    {
      property: 'motorista',
      label: 'Motorista',
      visible: true,
    },
    {
      property: 'veiculo',
      label: 'Veículo',
      visible: true,
    },
    {
      property: 'dtInclusao',
      label: 'Data Lanc.',
      type: 'date',
      visible: true,
    },
    {
      property: 'status',
      label: 'Status',
      type: 'label',
      labels: [
        {
          value: 'A',
          color: 'color-10',
          label: 'Ativo',
          textColor: '#fff',
        },
        {
          value: 'I',
          color: 'color-07',
          label: 'Inativo',
          textColor: '#fff',
        },
      ],
      visible: false,
    },
  ];
}
