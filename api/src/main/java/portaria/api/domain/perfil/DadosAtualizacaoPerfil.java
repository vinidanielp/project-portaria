package portaria.api.domain.perfil;

import java.util.Set;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoPerfil(
		
		@NotNull
		Long id, 
		
		String nome,

		Set<Long> permissoes
		) {

}
