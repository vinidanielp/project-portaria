import { Permissao } from "../models/permissao";
import { LocalStorageService } from "../services/local-storage.service";

export class Util {
  /**
   * @param value
   */
  static isEmpty(value: any): boolean {
    return (
      value === null ||
      value === undefined ||
      (value.length !== undefined && value.length === 0) ||
      Object.keys(value).length === 0
    );
  }

  /**
   * Coloca mascara de cpf
   * @param cpfSemMascara
   */
  static adicionarMascaraCPF(cpfSemMascara: string) {
    // Adiciona a máscara
    cpfSemMascara = cpfSemMascara.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4'
    );

    return cpfSemMascara;
  }

  /**
   * Coloca mascara no telefone
   * @param telefoneSemMascara
   */
  static adicionarMascaraTelefone(telefoneSemMascara: string) {
    // Adiciona a máscara
    telefoneSemMascara = telefoneSemMascara.replace(
      /(\d{2})(\d{5})(\d{4})/,
      '($1) $2-$3'
    );

    return telefoneSemMascara;
  }

  /**
   * Checa se o usuario tem permissão
   *
   * @param permissao
   */
  static isPermissao(permissao: string): boolean {
    let isAllowed = false;

    const localStorageService = new LocalStorageService();
    const permissoes: Permissao[] = localStorageService.getObject('userAuth').permissoes;

    for(let i = 0; i < permissoes.length && !isAllowed ; i++){
      if(permissoes[i].toString() === permissao){
        isAllowed = true;
        break;
      }
    }

    return isAllowed;
  }
}
