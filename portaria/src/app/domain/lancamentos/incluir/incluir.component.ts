import { LancamentoService } from './../services/lancamento.service';
import { VeiculoService } from './../../veiculo/services/veiculo.service';
import { Component, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  PoComboOption,
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoRadioGroupOption,
} from '@po-ui/ng-components';
import { Motorista } from 'src/app/core/models/motorista';
import { Veiculo } from 'src/app/core/models/veiculo';
import { Lancamento } from 'src/app/core/models/lancamento';
import { Filial } from 'src/app/core/models/filial';

@Component({
  selector: 'app-incluir',
  templateUrl: './incluir.component.html',
  styleUrls: ['./incluir.component.scss'],
})
export class IncluirComponent {
  public formLancamento!: UntypedFormGroup;
  public formTipoLancamento!: UntypedFormGroup;

  public motoristasOptions: Array<any> = [];
  private motoristas: Array<Motorista> = [];

  public veiculosOptions: Array<any> = [];
  private veiculos: Veiculo[] = [];

  public filiaisOptions: Array<any> = [];
  private filiais: Array<Filial> = [];

  public isLoading: boolean = false;

  public labelVoltarWidget: string = 'Voltar';
  public labelProximoWidget: string = 'Próximo';
  public labelSalvarWidget: string = 'Salvar';

  public lancamento: Lancamento = new Lancamento();

  public orientacao: any = 'vertical';

  public motoristaSelecionado: string | undefined = "";
  public veiculoSelecionado: string | undefined = "";
  public idLancamento: number | null = null;

  @ViewChild('lancamentoConfirmado', { static: true })
  lancamentoConfirmado!: PoModalComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private poNotification: PoNotificationService,
    private formGroup: UntypedFormBuilder,
    private veiculoService: VeiculoService,
    private lancamentoService: LancamentoService
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

  public readonly tipoLancamentoOpcao: Array<PoRadioGroupOption> = [
    { label: 'Carregamento', value: 'C' },
    { label: 'Descarga', value: 'D', disabled: true },
  ];

  ngOnInit() {
    this.iniciarForms();
  }

  private iniciarForms() {
    this.formTipoLancamento = this.formGroup.group({
      tipoLancamento: ['C'],
    });

    this.formLancamento = this.formGroup.group({
      idMotorista: [''],
      idVeiculo: [''],
      numeroPedido: [''],
      notaFiscal: [''],
      idFilial: [''],
    });
  }

  public onChangeMotorista(motoristaOption: PoComboOption) {
    if (motoristaOption.value !== null && motoristaOption.value !== undefined) {
      this.motoristaSelecionado = motoristaOption.label;

      this.getVeiculosByMotorista(motoristaOption.value);

      this.veiculo.setValue('');
      this.veiculosOptions = [];
    }
  }

  private getVeiculosByMotorista(idMotorista: any) {
    this.veiculoService.getVeiculoByIdMotorista(idMotorista).subscribe({
      next: (veiculos: any) => {
        this.veiculos = veiculos

        this.veiculosOptions = this.veiculos.map((veiculo) => ({
          label: `${veiculo.marca}/${veiculo.modelo}: ${veiculo.placa}`,
          value: veiculo.id,
        }));
      },
    });
  }

  public onChangeVeiculo(veiculoOption: PoComboOption) {
    if (veiculoOption.value !== null && veiculoOption.value !== undefined) {
      this.veiculoSelecionado = veiculoOption.label;
    }
  }

  public ativaProximoStepForm(form: UntypedFormGroup) {
    return form.valid;
  }

  public getLancamento(): Lancamento {
    this.lancamento = {
      ...this.formTipoLancamento.value,
      ...this.formLancamento.value,
    };

    return this.lancamento;
  }

  public salvar() {
    if (this.formTipoLancamento.valid && this.formLancamento.valid) {
      this.isLoading = true;
      this.lancamento = this.getLancamento();

      this.lancamentoService.postLancamento(this.lancamento).subscribe({
        next: (lancamento) => {
          setTimeout(() => {
            this.isLoading = false;
            this.idLancamento = lancamento.id;
            this.lancamentoConfirmado.open();
            this.resetForms();
          }, 2000);
        },
        error: () => {
          this.isLoading = false;
          this.poNotification.error(
            'Erro de comunicação com o servidor, Lançamento não foi salvo.'
          );
        },
      });
    }
  }

  private resetForms(): void {
    this.formTipoLancamento.reset();
    this.formLancamento.reset();
    this.veiculo.setValue('');
    this.veiculosOptions = [];
  }

  public fecharModal: PoModalAction = {
    action: () => {
      this.lancamentoConfirmado.close();
      this.router.navigate(['/lancamentos/consultar'], { relativeTo: this.route });
    },
    label: 'Fechar',
  };

  get tipoLancamento(): UntypedFormControl {
    return <UntypedFormControl>this.formTipoLancamento.get('tipoLancamento');
  }

  get motorista(): UntypedFormControl {
    return <UntypedFormControl>this.formLancamento.get('idMotorista');
  }

  get veiculo(): UntypedFormControl {
    return <UntypedFormControl>this.formLancamento.get('idVeiculo');
  }

  get numeroPedido(): UntypedFormControl {
    return <UntypedFormControl>this.formLancamento.get('numeroPedido');
  }

  get notaFiscal(): UntypedFormControl {
    return <UntypedFormControl>this.formLancamento.get('notaFiscal');
  }
}
