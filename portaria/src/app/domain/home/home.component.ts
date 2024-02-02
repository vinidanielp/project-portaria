import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { PoNotificationService, PoTreeViewItem } from '@po-ui/ng-components';
import { VisitanteService } from '../visitantes/services/visitante.service';
import { Visitante } from 'src/app/core/models/visitante';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public visitasHoje: Array<PoTreeViewItem> = [];
  public visitasProximas: Array<PoTreeViewItem> = [];

  constructor(
    private visitanteService: VisitanteService,
    private poNotification: PoNotificationService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.carregarListaVisitantesHoje();
    this.carregarListaVisitantesSemana();
  }

  public carregarListaVisitantesHoje(): void {
    this.visitanteService.getListaVisitantesHoje().subscribe({
      next: (response) => {
        // Mapear a resposta para o formato desejado
        const visitantesMapeados = response.map(
          (visitante: Visitante, index: any) => ({
            label: `${visitante.horaVisita} - ${visitante.nome}`,
            value: +(1.1 + index * 0.1).toFixed(2),
          })
        );

        // Atribuir a lista mapeada a visitasHoje
        this.visitasHoje = [
          {
            label: 'Visitas hoje',
            value: 1,
            subItems: visitantesMapeados,
          },
        ];
      },
      error: () => {
        this.visitasHoje = [
          {
            label: 'Visitas hoje',
            value: 1
          },
        ];
        this.poNotification.error('Erro ao carregar os Visitas de hoje');
      },
    });
  }

  public carregarListaVisitantesSemana(): void {
    this.visitanteService.getListaVisitantesProximos().subscribe({
      next: (response) => {
        // Mapear a resposta para o formato desejado
        const visitantesMapeados = response.map(
          (visitante: Visitante, index: any) => ({
            label: `${this.formatarData(visitante.dataVisita)} - ${
              visitante.nome
            }`,
            value: +(1.1 + index * 0.1).toFixed(2),
          })
        );

        // Atribuir a lista mapeada de proximas visitas
        this.visitasProximas = [
          {
            label: 'Visitas próximas (5 dias)',
            value: 1,
            subItems: visitantesMapeados,
          },
        ];
      },
      error: () => {
        this.visitasProximas = [ {
          label: 'Visitas próximas (5 dias)',
          value: 1
        },];
        this.poNotification.error('Erro ao carregar as Visitas dos próximos 5 dias');
      },
    });
  }

  private formatarData(data: Date | null): string {
    if (data === null) {
      return ''; // Retorna uma string vazia se a data for nula
    }

    const dataFormatada: string | null = this.datePipe.transform(
      data,
      'dd/MM/yyyy'
    );
    return dataFormatada || ''; // Retorna uma string vazia se a formatação falhar
  }
}
