import { Filial } from './filial';

export class Motorista {
  id: number | null = null;
  nome: string = '';
  cpf: string = '';
  empresa: string = '';
  contato: string = '';
  filial: Filial = new Filial();
  status: boolean | string = false;
}
