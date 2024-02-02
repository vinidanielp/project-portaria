package portaria.api.domain.permissao;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoPermissao(
		
		@NotNull
		Long id, 
		
		String nome
		) {

}
