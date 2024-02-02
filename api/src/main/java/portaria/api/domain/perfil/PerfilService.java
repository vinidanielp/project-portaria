package portaria.api.domain.perfil;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import portaria.api.domain.ValidacaoException;
import portaria.api.domain.permissao.Permissao;
import portaria.api.domain.permissao.PermissaoRepository;

@Service
public class PerfilService {

	@Autowired
	private PerfilRepository perfilRepository;
	
	@Autowired
	private PermissaoRepository permissaoRepository;
	
	
	public DadosDetalhamentoPerfil cadastrar(DadosCadastroPerfil dados) {
		
		if(!permissaoRepository.existsById(dados.permissoes())) {
			throw new ValidacaoException("Id da Permissão informada não existe!");
		}
		
		var permissoes = permissaoRepository.getReferenceById(dados.permissoes());
		var perfil = new Perfil(dados, permissoes);
		
		perfilRepository.save(perfil);
		
		return new DadosDetalhamentoPerfil(perfil);
	}
	
	public DadosDetalhamentoPerfil atualizar(DadosAtualizacaoPerfil dados) {
		var perfil = perfilRepository.getReferenceById(dados.id());
		Set<Permissao> permissoes = new HashSet<Permissao>();
		
		if(dados.permissoes() != null && !permissaoRepository.existsById(dados.permissoes())) {
			throw new ValidacaoException("Id da Permissão informada não existe!");
		}
		
		if(dados.permissoes() != null) {
			permissoes = permissaoRepository.getReferenceById(dados.permissoes());
		}
		
		perfil.atualizarInformacoes(dados, permissoes);
		
		return new DadosDetalhamentoPerfil(perfil);
	}
	
	public Page<DadosListagemPerfil> listar(Pageable paginacao) {
        return perfilRepository.findAll(paginacao).map(DadosListagemPerfil::new);
    }
	
	public DadosDetalhamentoPerfil listarById(Long id) {
		var perfil = perfilRepository.getReferenceById(id);
		return new DadosDetalhamentoPerfil(perfil);
	}
	
	public void excluir(Long id) {
	    var perfil = perfilRepository.getReferenceById(id);
	    perfilRepository.deleteById(perfil.getId());
	}
}
