package portaria.api.domain.motorista;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import portaria.api.domain.ValidacaoException;
import portaria.api.domain.filial.Filial;
import portaria.api.domain.filial.FilialRepository;
import portaria.api.domain.motorista.validacoes.atualizar.ValidadorAtualizarMotorista;
import portaria.api.domain.motorista.validacoes.cadastro.ValidadorCadastrarMotorista;

@Service
public class MotoristaService {

	@Autowired
	private MotoristaRepository motoristaRepository;
	
	@Autowired
	private FilialRepository filialRepository;
	
	@Autowired
	private List<ValidadorCadastrarMotorista> validadorCadastrarMotorista;
	
	@Autowired
	private List<ValidadorAtualizarMotorista> validadorAtualizarMotorista;
	
	
	/**
	 * 
	 */
	public DadosDetalhamentoMotorista cadastrar(DadosCadastroMotorista dados) {
		
		if(!filialRepository.existsById(dados.idFilial())) {
			throw new ValidacaoException("Id da Filial informada não existe!");
		}
		
		validadorCadastrarMotorista.forEach(v -> v.validar(dados));
		
		var filial = filialRepository.getReferenceById(dados.idFilial());
		
		var motorista = new Motorista(dados, filial);
		
		motoristaRepository.save(motorista);
		
		return new DadosDetalhamentoMotorista(motorista);
	}
	
	
	public DadosDetalhamentoMotorista atualizar(DadosAtualizacaoMotorista dados) {
		var motorista = motoristaRepository.getReferenceById(dados.id());
		var filial = new Filial();
		
		if(dados.idFilial() != null && !filialRepository.existsById(dados.idFilial())) {
			throw new ValidacaoException("Id da Filial informada não existe!");
		}
		
		if(dados.idFilial() != null) {
			filial = filialRepository.getReferenceById(dados.idFilial());
		}
		
		if(dados.cpf() != null) {
			validadorAtualizarMotorista.forEach(v -> v.validar(dados));
		}
		
		
		motorista.atualizarInformacoes(dados, filial);
		
		return new DadosDetalhamentoMotorista(motorista);
	}
	
	public Page<DadosListagemMotorista> listar(Pageable paginacao) {
        return motoristaRepository.findAll(paginacao).map(DadosListagemMotorista::new);
    }
	
	public DadosDetalhamentoMotorista listarById(Long id) {
		var motorista = motoristaRepository.getReferenceById(id);
		return new DadosDetalhamentoMotorista(motorista);
	}
	
	public void excluir(Long id) {
		
	    if (!motoristaRepository.existsById(id)) {
	        throw new ValidacaoException("Id do Motorista informado não existe!");
	    }

	    var motorista = motoristaRepository.getReferenceById(id);
	    motorista.excluir();
	}
	
	public Page<DadosListagemMotoristaInput> listarMotoristasAtivos(Pageable paginacao) {
        return motoristaRepository.findAllByStatusTrue(paginacao).map(DadosListagemMotoristaInput::new);
    }
}
