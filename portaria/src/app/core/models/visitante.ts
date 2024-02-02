import { Filial } from './filial';

export class Visitante {
  id: number | null = null;
  cpf: string = '';
  nome: string = '';
  empresa: string = '';
  contato: string = '';
  departamento: string = '';
  horaVisita: string = '';
  dataVisita: Date | null = null;
  observacao: string = '';
  filial: Filial = new Filial();
  status: boolean | string = false;
}
