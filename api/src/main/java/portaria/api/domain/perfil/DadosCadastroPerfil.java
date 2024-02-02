package portaria.api.domain.perfil;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroPerfil(
		
		@NotBlank
		String nome,
		
		@NotNull
		Set<Long> permissoes
		) {

}
