import { MotoristaService } from './../services/motorista.service';
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
import { Motorista } from 'src/app/core/models/motorista';

@Component({
  selector: 'app-motorista-list',
  templateUrl: './motorista-list.component.html',
  styleUrls: ['./motorista-list.component.scss'],
})
export class MotoristaListComponent {
  @ViewChild('modalInativarMotorista', { static: true })
  modalInativarMotorista!: PoModalComponent;

  public nomeMotorista: string = '';
  public listaMotoristas: Array<Motorista> = new Array();
  private motoristaSelecionado: Motorista = new Motorista();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private motoristaService: MotoristaService,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.carregarListaMotoristas();
  }

  //Metódo responsável por listar os motoristas
  public carregarListaMotoristas(): void {
    this.motoristaService.getMotoristas().subscribe({
      next: (response) => {
        this.listaMotoristas = response.content.map((motorista: Motorista) => {
          motorista.status = motorista.status ? 'true' : 'false';
          return motorista;
        });
      },
      error: () => {
        this.poNotification.error('Erro ao carregar os Motoristas.');
      },
    });
  }

  //Ações do header
  public readonly acoesFiltro: Array<PoPageAction> = [
    { label: 'Novo', action: this.novoMotorista.bind(this) },
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
      property: 'nome',
      label: 'Nome',
      visible: true,
    },
    {
      property: 'cpf',
      label: 'CPF',
      visible: true,
    },
    {
      property: 'empresa',
      label: 'Empresa',
      visible: true,
    },
    {
      property: 'contato',
      label: 'Contato',
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

  private novoMotorista() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  private visualizar(motorista: Motorista) {
    this.router.navigate(['visualizar', motorista.id], {
      relativeTo: this.route,
    });
  }

  private editar(motorista: Motorista) {
    this.router.navigate(['editar', motorista.id], { relativeTo: this.route });
  }

  private isAtivo(motorista: Motorista) {
    return motorista.status === 'true' ? false : true;
  }

  private modalInativar(motorista: Motorista) {
    this.motoristaSelecionado = motorista;
    this.nomeMotorista = motorista.nome;
    this.modalInativarMotorista.open();
  }

  public cancelar: PoModalAction = {
    action: () => {
      this.modalInativarMotorista.close();
    },
    label: 'Não',
    danger: true,
  };

  public confirmar: PoModalAction = {
    action: () => {
      this.excluir();
      this.modalInativarMotorista.close();
    },
    label: 'Sim',
  };

  private excluir() {
    this.motoristaService
      .deleteMotorista(this.motoristaSelecionado)
      .pipe(first())
      .subscribe({
        next: () => {
          this.carregarListaMotoristas();
          this.poNotification.success('Motorista Inativado.');
        },
        error: () => this.poNotification.error('Erro ao excluir Motorista.'),
      });
  }
}
