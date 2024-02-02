package portaria.api.domain.lancamento;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import portaria.api.domain.ValidacaoException;
import portaria.api.domain.filial.Filial;
import portaria.api.domain.filial.FilialRepository;
import portaria.api.domain.motorista.Motorista;
import portaria.api.domain.motorista.MotoristaRepository;
import portaria.api.domain.veiculo.Veiculo;
import portaria.api.domain.veiculo.VeiculoRepository;

@Service
public class LancamentoService {

	@Autowired
	private LancamentoRepository lancamentoRepository;
	
	@Autowired
	private VeiculoRepository veiculoRepository;
	
	@Autowired
	private MotoristaRepository motoristaRepository;
	
	@Autowired
	private FilialRepository filialRepository;
	
	
	public DadosDetalhamentoLancamento cadastrar(DadosCadastroLancamento dados) {
		
		if(!filialRepository.existsById(dados.idFilial())) {
			throw new ValidacaoException("Id da Filial informada não existe!");
		}
		
		if(!motoristaRepository.existsById(dados.idMotorista())) {
			throw new ValidacaoException("Id do Motorista informado não existe!");
		}
		
		if(!veiculoRepository.existsById(dados.idVeiculo())) {
			throw new ValidacaoException("Id do Veículo informado não existe!");
		}
		
		var motorista = motoristaRepository.getReferenceById(dados.idMotorista());
		var veiculo = veiculoRepository.getReferenceById(dados.idMotorista());
		var filial = filialRepository.getReferenceById(dados.idFilial());
		
		var lancamento = new Lancamento(dados, motorista, veiculo, filial);
		
		lancamentoRepository.save(lancamento);
		
		return new DadosDetalhamentoLancamento(lancamento);
	}
	
	public DadosDetalhamentoLancamento atualizar(DadosAtualizacaoLancamento dados) {
		var lancamento = lancamentoRepository.getReferenceById(dados.id());
		
		var motorista = new Motorista();
		var veiculo = new Veiculo();
		var filial = new Filial();
		
		if(dados.idMotorista() != null && !motoristaRepository.existsById(dados.idMotorista())) {
			throw new ValidacaoException("Id do Motorista informado não existe!");
		}
		
		if(dados.idVeiculo() != null && !veiculoRepository.existsById(dados.idVeiculo())) {
			throw new ValidacaoException("Id do Veículo informado não existe!");
		} 
		
		if(dados.idFilial() != null && !filialRepository.existsById(dados.idFilial())) {
			throw new ValidacaoException("Id da Filial informada não existe!");
		}
		
		
		if(dados.idMotorista() != null) {
			motorista = motoristaRepository.getReferenceById(dados.idMotorista());
		}
		
		if(dados.idVeiculo() != null) {
			veiculo = veiculoRepository.getReferenceById(dados.idVeiculo());
		}
		
		if(dados.idFilial() != null) {
			filial = filialRepository.getReferenceById(dados.idFilial());
		}
		
		lancamento.atualizarInformacoes(dados, motorista, veiculo, filial);
		
		return new DadosDetalhamentoLancamento(lancamento);
	}

	
	public Page<DadosListagemLancamento> listar(Pageable paginacao) {
        return lancamentoRepository.findAll(paginacao).map(DadosListagemLancamento::new);
    }
	
	
	public DadosDetalhamentoLancamento listarById(Long id) {
		var lancamento = lancamentoRepository.getReferenceById(id);
		return new DadosDetalhamentoLancamento(lancamento);
	}
	
	
	public void excluir(Long id) {
		
	    if (!lancamentoRepository.existsById(id)) {
	        throw new ValidacaoException("Id do Lançamento informado não existe!");
	    }

	    var veiculo = lancamentoRepository.getReferenceById(id);
	    veiculo.excluir();
	}
}
