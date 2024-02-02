package portaria.api.domain.visitante;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import portaria.api.domain.ValidacaoException;
import portaria.api.domain.filial.Filial;
import portaria.api.domain.filial.FilialRepository;

@Service
public class VisitanteService {
	
	@Autowired
	private VisitanteRepository visitanteRepository;
	
	@Autowired
	private FilialRepository filialRepository;
	
	public DadosDetalhamentoVisitante cadastrar(DadosCadastroVisitante dados) {
		
		if(!filialRepository.existsById(dados.idFilial())) {
			throw new ValidacaoException("Id da Filial informada não existe!");
		}
		
		var filial = filialRepository.getReferenceById(dados.idFilial());
		var visita = new Visitante(dados, filial);
		
		visitanteRepository.save(visita);
		
		return new DadosDetalhamentoVisitante(visita);
	}
	
	public DadosDetalhamentoVisitante atualizar(DadosAtualizacaoVisitante dados) {
		var visitante = visitanteRepository.getReferenceById(dados.id());
		var filial = new Filial();
		
		if(dados.idFilial() != null && !filialRepository.existsById(dados.idFilial())) {
			throw new ValidacaoException("Id da Filial informada não existe!");
		}
		
		if(dados.idFilial() != null) {
			filial = filialRepository.getReferenceById(dados.idFilial());
		}
		
		
		visitante.atualizarInformacoes(dados, filial);
		
		return new DadosDetalhamentoVisitante(visitante);
	}
	
	public Page<DadosListagemVisitante> listar(Pageable paginacao) {
        return visitanteRepository.findAllByStatusTrue(paginacao).map(DadosListagemVisitante::new);
    }
	
	public DadosDetalhamentoVisitante listarById(Long id) {
		var visitante = visitanteRepository.getReferenceById(id);
		return new DadosDetalhamentoVisitante(visitante);
	}
	
	public void excluir(Long id) {
		
	    if (!visitanteRepository.existsById(id)) {
	        throw new ValidacaoException("Id do visitante informado não existe!");
	    }

	    var visitante = visitanteRepository.getReferenceById(id);
	    visitante.excluir();
	}

	public List<DadosListagemVisitanteHome> listarVisitantesHoje() {
		return visitanteRepository.findByVisitasHoje().stream()
				.map(DadosListagemVisitanteHome::new)
				.collect(Collectors.toList());
	}
	
	public List<DadosListagemVisitanteHome> listarVisitantesProximos5Dias() {
		return visitanteRepository.findByVisitasProximos5Dias().stream()
				.map(DadosListagemVisitanteHome::new)
				.collect(Collectors.toList());
	}
}
