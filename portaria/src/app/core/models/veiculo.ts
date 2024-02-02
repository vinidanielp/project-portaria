import { Filial } from './filial';
import { Motorista } from './motorista';

export class Veiculo {
  id: number | null = null;
  motorista: Motorista = new Motorista();
  proprietario: string = '';
  filial: Filial = new Filial();
  chassis: string = '';
  marca: string = '';
  modelo: string = '';
  placa: string = '';
  status: boolean | string = false;
}
