package portaria.api.domain.motorista.validacoes.cadastro;

import portaria.api.domain.motorista.DadosCadastroMotorista;

public interface ValidadorCadastrarMotorista {
	
	void validar(DadosCadastroMotorista dados);
}
