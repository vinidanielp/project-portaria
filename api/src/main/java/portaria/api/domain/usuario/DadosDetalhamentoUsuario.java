package portaria.api.domain.usuario;

import java.util.Set;

import portaria.api.domain.filial.Filial;

public record DadosDetalhamentoUsuario(
		Long id,
		String nome,
		String login,
		String email,
		Set<Filial> filiais,
		Long idPerfil,
		Boolean status
		
		) {

	public DadosDetalhamentoUsuario(Usuario usuario) {
		this(
				usuario.getId(),
				usuario.getNome(),
				usuario.getLogin(),
				usuario.getEmail(),
				usuario.getFiliais(),
				usuario.getPerfil().getId(),
				usuario.getStatus()
			);
	}
}
