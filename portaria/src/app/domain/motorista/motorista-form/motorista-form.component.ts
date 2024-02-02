import { MotoristaService } from './../services/motorista.service';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  PoNotificationService,
  PoPageAction,
  PoSelectOption,
} from '@po-ui/ng-components';
import { first } from 'rxjs';
import { Filial } from 'src/app/core/models/filial';
import { Motorista } from 'src/app/core/models/motorista';

@Component({
  selector: 'app-motorista-form',
  templateUrl: './motorista-form.component.html',
  styleUrls: ['./motorista-form.component.scss'],
})
export class MotoristaFormComponent {
  private rota: string = this.route.snapshot.url[2].path;

  public tituloPagina: string = '';
  public acoes: Array<PoPageAction> = [];

  public formMotorista!: UntypedFormGroup;
  public filiaisOptions: Array<PoSelectOption> = [];
  private filiais: Array<Filial> = [];

  public idMotorista: number | any;
  public isDisabledBool: boolean = false;
  public isDisabledString: string = 'false';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private poNotification: PoNotificationService,
    private motoristaService: MotoristaService,
    private formGroup: UntypedFormBuilder
  ) {
    this.route.data.subscribe((data) => {
      this.filiais = data['filialData'].content;

      this.filiaisOptions = this.filiais.map((filial) => ({
        label: `${filial.id} - ${filial.nome}`,
        value: filial.id,
      }));
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parameters) => {
      this.idMotorista = parameters.get('id');
    });

    this.iniciarForm();

    //se tem 'novo' e ID na URL, significa alteração
    if (this.rota === 'novo' && !this.idMotorista) {
      this.tituloPagina = 'Novo Motorista';
    }

    //se tem 'editar' e ID na URL, significa alteração
    if (this.rota === 'editar' && this.idMotorista) {
      this.tituloPagina = 'Alterar Motorista';
    }

    //se tem 'visualizar' e ID na URL, significa alteração
    if (this.rota === 'visualizar' && this.idMotorista) {
      this.tituloPagina = 'Visualizar Motorista';
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
    this.formMotorista = this.formGroup.group({
      id: null,
      nome: [''],
      cpf: [''],
      contato: [''],
      empresa: [''],
      idFilial: [''],
      status: null,
    });
  }

  private voltarPagina() {
    this.location.back();
  }

  private validarForm(): Boolean {
    return this.formMotorista.valid ? false : true;
  }

  //Método para atribuir valores aos campos do formulário, metodo editar
  private setValorForm(): void {
    this.motoristaService
      .getMotoristaById(this.idMotorista)
      .pipe(first())
      .subscribe((motorista: Motorista) => {
        this.formMotorista.patchValue(motorista);
      });
  }

  public cancelar() {
    this.voltarPagina();

    this.rota !== 'visualizar'
      ? this.poNotification.information('Alterações canceladas!')
      : null;
  }

  public salvar(): void {
    if (this.idMotorista) {
      this.editarMotorista();
    } else {
      this.novoMotorista();
    }
  }

  // Método grava novo motorista
  private novoMotorista() {
    if (this.formMotorista.valid) {
      this.motoristaService
        .postMotorista(this.formMotorista.value)
        .subscribe({
          next: () => {
            this.formMotorista.reset();
            this.voltarPagina();
            this.poNotification.success('Motorista cadastrado com Sucesso.');
          },
          error: () => {
            this.poNotification.error(
              'Erro de comunicação com o servidor, Motorista não foi salvo.'
            );
          },
        });
    }
  }

  // Método editar motorista
  private editarMotorista() {
    if (this.formMotorista.valid) {
      this.motoristaService
        .putMotorista(this.formMotorista.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.formMotorista.reset();
            this.voltarPagina();
            this.poNotification.success('Motorista alterado com Sucesso.');
          },
          error: () => this.poNotification.error('Erro ao alterar Motorista.'),
        });
    }
  }
}
