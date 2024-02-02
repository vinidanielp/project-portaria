package portaria.api.domain.permissao;

import jakarta.validation.constraints.NotBlank;

public record DadosCadastroPermissao(
		
		@NotBlank
		String nome
		) {

}
