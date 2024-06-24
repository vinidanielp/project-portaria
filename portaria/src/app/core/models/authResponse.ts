import { Permissao } from './permissao';

export interface AuthResponse {
  id: number;
  usuario: string;
  permissoes: Permissao[];
  token: string;
  expire?: Date;
}
