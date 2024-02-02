package portaria.api.domain.usuario;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import portaria.api.domain.ValidacaoException;
import portaria.api.domain.filial.Filial;
import portaria.api.domain.filial.FilialRepository;
import portaria.api.domain.perfil.Perfil;
import portaria.api.domain.perfil.PerfilRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private FilialRepository filialRepository;
	
	@Autowired
	private PerfilRepository perfilRepository;
	
	

	public DadosDetalhamentoUsuario cadastrar(DadosCadastroUsuario dados) {
		
		if(!filialRepository.existsById(dados.filiais())) {
			throw new ValidacaoException("Id da Filial informada não existe!");
		}
		
		if(!perfilRepository.existsById(dados.idPerfil())) {
			throw new ValidacaoException("Id do Perfil informado não existe!");
		}
		
		var filiais = filialRepository.getReferenceById(dados.filiais());
		var perfil = perfilRepository.getReferenceById(dados.idPerfil());
		var usuario = new Usuario(dados, filiais, perfil);
		
		usuarioRepository.save(usuario);
		
		return new DadosDetalhamentoUsuario(usuario);
	}
	
	public DadosDetalhamentoUsuario atualizar(DadosAtualizacaoUsuario dados) {
		var usuario = usuarioRepository.getReferenceById(dados.id());
		
		Set<Filial> filiais = new HashSet<Filial>();
		Perfil perfil = new Perfil();
		
		if(dados.filiais() != null && !filialRepository.existsById(dados.filiais())) {
			throw new ValidacaoException("Id da Filial informada não existe!");
		}
		
		if(dados.idPerfil() != null && !perfilRepository.existsById(dados.idPerfil())) {
			throw new ValidacaoException("Id do Perfil informado não existe!");
		}
		
		if(dados.filiais() != null) {
			filiais = filialRepository.getReferenceById(dados.filiais());
		}
		
		if(dados.idPerfil() != null) {
			perfil = perfilRepository.getReferenceById(dados.idPerfil());
		}
		
		usuario.atualizarInformacoes(dados, filiais, perfil);
		
		return new DadosDetalhamentoUsuario(usuario);
	}
	
	
	public Page<DadosListagemUsuario> listar(Pageable paginacao) {
        return usuarioRepository.findAll(paginacao).map(DadosListagemUsuario::new);
    }
	
	
	public DadosDetalhamentoUsuario listarById(Long id) {
		var usuario = usuarioRepository.getReferenceById(id);
		return new DadosDetalhamentoUsuario(usuario);
	}
	
	public void excluir(Long id) {
		
	    if (!usuarioRepository.existsById(id)) {
	        throw new ValidacaoException("Id do Usuário informado não existe!");
	    }

	    var usuario = usuarioRepository.getReferenceById(id);
	    usuario.excluir();
	}
}
