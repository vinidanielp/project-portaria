import { VeiculoService } from './../services/veiculo.service';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  PoComboFilterMode,
  PoComboOption,
  PoNotificationService,
  PoPageAction,
  PoSelectOption,
} from '@po-ui/ng-components';
import { first } from 'rxjs';
import { Filial } from 'src/app/core/models/filial';
import { Motorista } from 'src/app/core/models/motorista';
import { Veiculo } from 'src/app/core/models/veiculo';

@Component({
  selector: 'app-veiculo-form',
  templateUrl: './veiculo-form.component.html',
  styleUrls: ['./veiculo-form.component.scss'],
})
export class VeiculoFormComponent {
  private rota: string = this.route.snapshot.url[2].path;

  public tituloPagina: string = '';
  public acoes: Array<PoPageAction> = [];
  public filterMode: PoComboFilterMode = PoComboFilterMode.contains;

  public formVeiculo!: UntypedFormGroup;

  public filiaisOptions: Array<PoSelectOption> = [];
  private filiais: Array<Filial> = [];

  public motoristasOptions: Array<any> = [];
  private motoristas: Array<Motorista> = [];

  public idVeiculo: number | any;
  public isDisabledBool: boolean = false;
  public isDisabledString: string = 'false';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private poNotification: PoNotificationService,
    private veiculoService: VeiculoService,
    private formGroup: UntypedFormBuilder
  ) {
    this.route.data.subscribe((data) => {
      this.filiais = data['filialData'].content;
      this.motoristas = data['motoristaData'].content;

      this.filiaisOptions = this.filiais.map((filial) => ({
        label: `${filial.id} - ${filial.nome}`,
        value: filial.id,
      }));

      this.motoristasOptions = this.motoristas.map((motorista) => ({
        label: `${motorista.id} - ${motorista.nome}`,
        value: motorista.id,
      }));
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parameters) => {
      this.idVeiculo = parameters.get('id');
    });

    this.iniciarForm();

    //se tem 'novo' e ID na URL, significa alteração
    if (this.rota === 'novo' && !this.idVeiculo) {
      this.tituloPagina = 'Novo Veículo';
    }

    //se tem 'editar' e ID na URL, significa alteração
    if (this.rota === 'editar' && this.idVeiculo) {
      this.tituloPagina = 'Alterar Veículo';
    }

    //se tem 'visualizar' e ID na URL, significa alteração
    if (this.rota === 'visualizar' && this.idVeiculo) {
      this.tituloPagina = 'Visualizar Veículo';
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
    this.formVeiculo = this.formGroup.group({
      id: null,
      idMotorista: [''],
      proprietario: [''],
      idFilial: [''],
      chassis: [''],
      marca: [''],
      modelo: [''],
      placa: [''],
      status: null,
    });
  }

  private voltarPagina() {
    this.location.back();
  }

  private validarForm(): Boolean {
    return this.formVeiculo.valid ? false : true;
  }

  // Método para atribuir valores aos campos do formulário, metodo editar
  private setValorForm(): void {
    this.veiculoService
      .getVeiculoById(this.idVeiculo)
      .pipe(first())
      .subscribe((veiculo: Veiculo) => {
        this.formVeiculo.patchValue(veiculo);
      });
  }

  public cancelar() {
    this.voltarPagina();

    this.rota !== 'visualizar'
      ? this.poNotification.information('Alterações canceladas!')
      : null;
  }

  public salvar(): void {
    if (this.idVeiculo) {
      this.editarVeiculo();
    } else {
      this.novoVeiculo();
    }
  }

  // Método grava novo veiculo
  private novoVeiculo() {
    if (this.formVeiculo.valid) {
      this.veiculoService.postVeiculo(this.formVeiculo.value).subscribe({
        next: () => {
          this.formVeiculo.reset();
          this.voltarPagina();
          this.poNotification.success('Veículo cadastrado com Sucesso.');
        },
        error: () => {
          this.poNotification.error(
            'Erro de comunicação com o servidor, Veículo não foi salvo.'
          );
        },
      });
    }
  }

  // Método editar veículo
  private editarVeiculo() {
    if (this.formVeiculo.valid) {
      this.veiculoService
        .putVeiculo(this.formVeiculo.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.formVeiculo.reset();
            this.voltarPagina();
            this.poNotification.success('Veículo alterado com Sucesso.');
          },
          error: () => this.poNotification.error('Erro ao alterar Veículo.'),
        });
    }
  }
}
