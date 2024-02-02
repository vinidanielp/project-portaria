import { Filial } from './filial';
import { Motorista } from './motorista';
import { Veiculo } from './veiculo';

export class Lancamento {
  id: number | null = null;
  tipoLancamento: string = '';
  motorista: Motorista = new Motorista();
  veiculo: Veiculo = new Veiculo();
  filial: Filial = new Filial();
  numeroPedido: string = '';
  notaFiscal: string = '';
}
