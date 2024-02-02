import { Permissao } from "./permissao";

export class Perfil {
  id: number | null = null;
  nome: string = '';
  permissoes: Permissao[] = [];
}
