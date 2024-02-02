import { Filial } from './filial';
import { Perfil } from './perfil';

export class Usuario {
  id: number | null = null;
  nome: string = '';
  login: string = '';
  email: string = '';
  filiais: Array<Filial> = [];
  perfil: Perfil = new Perfil();
  status: boolean | string = false;
}
