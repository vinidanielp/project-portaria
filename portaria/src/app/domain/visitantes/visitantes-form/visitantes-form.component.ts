import { Visitante } from './../../../core/models/visitante';
import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  PoNotificationService,
  PoPageAction,
  PoSelectOption,
} from '@po-ui/ng-components';

import { VisitanteService } from '../services/visitante.service';
import { first } from 'rxjs';
import { Location } from '@angular/common';
import { Filial } from 'src/app/core/models/filial';

@Component({
  selector: 'app-visitantes-form',
  templateUrl: './visitantes-form.component.html',
  styleUrls: ['./visitantes-form.component.scss'],
})
export class VisitantesFormComponent {
  private rota: string = this.route.snapshot.url[1].path;

  public tituloPagina: string = '';
  public acoes: Array<PoPageAction> = [];

  public formVisitante!: UntypedFormGroup;
  public filiaisOptions: Array<PoSelectOption> = [];
  private filiais: Array<Filial> = [];

  public idVisitante: number | any;
  public isDisabledBool: boolean = false;
  public isDisabledString: string = 'false';
  public dataAtual: Date | string = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private poNotification: PoNotificationService,
    private visitanteService: VisitanteService,
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
      this.idVisitante = parameters.get('id');
    });

    this.iniciarForm();

    //se tem 'novo' e ID na URL, significa alteração
    if (this.rota === 'novo' && !this.idVisitante) {
      this.tituloPagina = 'Novo Visitante';
      this.dataAtual = new Date();
    }

    //se tem 'editar' e ID na URL, significa alteração
    if (this.rota === 'editar' && this.idVisitante) {
      this.tituloPagina = 'Alterar Visitante';
    }

    //se tem 'visualizar' e ID na URL, significa alteração
    if (this.rota === 'visualizar' && this.idVisitante) {
      this.tituloPagina = 'Visualizar Visitante';
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
    },
  ];

  private readonly acoesVisualizar: Array<PoPageAction> = [
    { label: 'Voltar', action: this.cancelar.bind(this) },
  ];

  //Inicia o formulário
  private iniciarForm(): void {
    this.formVisitante = this.formGroup.group({
      id: null,
      nome: [''],
      cpf: [''],
      contato: [''],
      departamento: [''],
      empresa: [''],
      horaVisita: [''],
      dataVisita: [''],
      idFilial: [''],
      status: null,
      observacao: [''],
    });
  }

  private voltarPagina() {
    this.location.back();
  }

  private validarForm(): Boolean {
    return this.formVisitante.valid ? false : true;
  }

  //Método para atribuir valores aos campos do formulário, metodo editar
  private setValorForm(): void {
    this.visitanteService
      .getVisitantesById(this.idVisitante)
      .pipe(first())
      .subscribe((visitante: Visitante) => {
        this.formVisitante.patchValue(visitante);
      });
  }

  public cancelar() {
    this.voltarPagina();

    this.rota !== 'visualizar'
      ? this.poNotification.information('Alterações canceladas!')
      : null;
  }

  public salvar(): void {
    if (this.idVisitante) {
      this.editarVisitante();
    } else {
      this.novoVisitante();
    }
  }

  // Método grava novo visitante
  private novoVisitante() {
    if (this.formVisitante.valid) {
      this.visitanteService
        .postVisitante(this.formVisitante.value)
        .subscribe({
          next: () => {
            this.formVisitante.reset();
            this.voltarPagina();
            this.poNotification.success('Visitante cadastrado com Sucesso.');
          },
          error: () => {
            this.poNotification.error(
              'Erro de comunicação com o servidor, Visitante não foi salvo.'
            );
          },
        });
    }
  }

  // Método editar visitante
   private editarVisitante() {
    if (this.formVisitante.valid) {
      this.visitanteService
        .putVisitante(this.formVisitante.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.formVisitante.reset();
            this.voltarPagina();
            this.poNotification.success('Visitante alterado com Sucesso.');
          },
          error: () => this.poNotification.error('Erro ao alterar Visitante.'),
        });
    }
  }
}
