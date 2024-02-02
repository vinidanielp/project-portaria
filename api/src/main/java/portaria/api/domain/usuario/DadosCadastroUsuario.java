package portaria.api.domain.usuario;

import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroUsuario(
		@NotBlank
		String nome,
		
		@NotBlank
		String login,
		
		@Email
		String email,
		
		@NotNull
		Set<String> filiais,
		
		@NotNull
		Long idPerfil
		) {
	
}
