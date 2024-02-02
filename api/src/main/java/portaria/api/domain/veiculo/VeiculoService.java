package portaria.api.domain.veiculo;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import portaria.api.domain.ValidacaoException;
import portaria.api.domain.filial.Filial;
import portaria.api.domain.filial.FilialRepository;
import portaria.api.domain.motorista.Motorista;
import portaria.api.domain.motorista.MotoristaRepository;

@Service
public class VeiculoService {

	@Autowired
	private VeiculoRepository veiculoRepository;
	
	@Autowired
	private MotoristaRepository motoristaRepository;
	
	@Autowired
	private FilialRepository filialRepository;
	
	public DadosDetalhamentoVeiculo cadastrar(DadosCadastroVeiculo dados) {
		
		if(!filialRepository.existsById(dados.idFilial())) {
			throw new ValidacaoException("Id da Filial informada não existe!");
		}
		
		if(!motoristaRepository.existsById(dados.idMotorista())) {
			throw new ValidacaoException("Id do Motorista informado não existe!");
		}
		
		var motorista = motoristaRepository.getReferenceById(dados.idMotorista());
		var filial = filialRepository.getReferenceById(dados.idFilial());
	
		var veiculo = new Veiculo(dados, motorista, filial);
		
		veiculoRepository.save(veiculo);
		
		return new DadosDetalhamentoVeiculo(veiculo);
	}
	
	public DadosDetalhamentoVeiculo atualizar(DadosAtualizacaoVeiculo dados) {
		var veiculo = veiculoRepository.getReferenceById(dados.id());
		var filial = new Filial();
		var motorista = new Motorista();
		
		if(dados.idMotorista() != null && !motoristaRepository.existsById(dados.idMotorista())) {
			throw new ValidacaoException("Id do Motorista informado não existe!");
		}
		
		if(dados.idFilial() != null && !filialRepository.existsById(dados.idFilial())) {
			throw new ValidacaoException("Id da Filial informada não existe!");
		}
		
		if(dados.idMotorista() != null) {
			motorista = motoristaRepository.getReferenceById(dados.idMotorista());
		}
		
		if(dados.idFilial() != null) {
			filial = filialRepository.getReferenceById(dados.idFilial());
		}
		
		veiculo.atualizarInformacoes(dados, motorista, filial);
		
		return new DadosDetalhamentoVeiculo(veiculo);
	}
	
	public Page<DadosListagemVeiculo> listar(Pageable paginacao) {
        return veiculoRepository.findAll(paginacao).map(DadosListagemVeiculo::new);
    }
	
	public DadosDetalhamentoVeiculo listarById(Long id) {
		var veiculo = veiculoRepository.getReferenceById(id);
		return new DadosDetalhamentoVeiculo(veiculo);
	}
	
	public void excluir(Long id) {
		
	    if (!veiculoRepository.existsById(id)) {
	        throw new ValidacaoException("Id do Veículo informado não existe!");
	    }

	    var veiculo = veiculoRepository.getReferenceById(id);
	    veiculo.excluir();
	}
	
	public List<DadosListagemVeiculoInput> listarVeiculoByIdMotorista(Long id) {
		return veiculoRepository.findByMotoristaId(id).stream()
				.map(DadosListagemVeiculoInput::new)
				.collect(Collectors.toList());
	}
}
