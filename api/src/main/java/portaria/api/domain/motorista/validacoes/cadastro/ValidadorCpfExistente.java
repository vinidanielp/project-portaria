package portaria.api.domain.motorista.validacoes.cadastro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import portaria.api.domain.ValidacaoException;
import portaria.api.domain.motorista.DadosCadastroMotorista;
import portaria.api.domain.motorista.MotoristaRepository;

@Component("ValidadorCpfExistenteCadastrar")
public class ValidadorCpfExistente implements ValidadorCadastrarMotorista {

	@Autowired
	private MotoristaRepository motoristaRepository;
	
	public void validar(DadosCadastroMotorista dados) {
		var cpfExistente = motoristaRepository.existsByCpf(dados.cpf());
		
		if(cpfExistente) {
			throw new ValidacaoException("Já existe um motorista com esse CPF.");
		}
	}
}
