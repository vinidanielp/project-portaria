package portaria.api.domain.perfil;

import java.util.Set;

import portaria.api.domain.permissao.Permissao;

public record DadosDetalhamentoPerfil(		
		Long id,
		String nome,
		Set<Permissao> permissoes
		) {

	public DadosDetalhamentoPerfil(Perfil perfil) {
		this(
				perfil.getId(), 
				perfil.getNome(), 
				perfil.getPermissoes()
			);
	}
}
