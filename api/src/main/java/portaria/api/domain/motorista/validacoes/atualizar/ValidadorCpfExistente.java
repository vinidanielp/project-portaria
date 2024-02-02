package portaria.api.domain.motorista.validacoes.atualizar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import portaria.api.domain.ValidacaoException;
import portaria.api.domain.motorista.DadosAtualizacaoMotorista;
import portaria.api.domain.motorista.MotoristaRepository;

@Component("ValidadorCpfExistenteAtualizar")
public class ValidadorCpfExistente implements ValidadorAtualizarMotorista {

	@Autowired
	private MotoristaRepository motoristaRepository;
	
	public void validar(DadosAtualizacaoMotorista dados) {
		var cpfExistente = motoristaRepository.existsByCpf(dados.cpf());
		
		if(cpfExistente) {
			throw new ValidacaoException("Já existe um motorista com esse CPF.");
		}
	}
}
