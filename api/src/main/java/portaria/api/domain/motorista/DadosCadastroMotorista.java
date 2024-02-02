package portaria.api.domain.motorista;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record DadosCadastroMotorista(
		
		@NotBlank
		String nome,
		
		@NotBlank
		@Pattern(regexp = "\\d{3}\\.?\\d{3}\\.?\\d{3}\\-?\\d{2}")
		String cpf,
		
		@NotBlank
		String empresa,
		
		@NotBlank
		String contato,
		
		@NotBlank
	    String idFilial
		
		) {

}
