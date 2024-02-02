package portaria.api.domain.usuario;

import java.util.Set;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoUsuario(
		@NotNull
		Long id, 
		
		String nome,
		
		String login,

		String email,
		
		Set<String> filiais,
		
		Long idPerfil,
		
		Boolean status
		) {
	
}
