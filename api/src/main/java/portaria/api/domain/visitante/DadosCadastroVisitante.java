package portaria.api.domain.visitante;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record DadosCadastroVisitante(

		@NotBlank
		String nome,
		
		@NotBlank
		@Pattern(regexp = "\\d{3}\\.?\\d{3}\\.?\\d{3}\\-?\\d{2}")
		String cpf,
		
		@NotBlank
		String contato,
		
		@NotBlank
		String empresa,
		
		@NotBlank
		String departamento,
		
		@NotBlank
		String horaVisita,
		
		@NotNull
		LocalDate dataVisita,
		
		String observacao,

		@NotBlank
	    String idFilial
		
		) {

}
