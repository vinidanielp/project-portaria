package portaria.api.domain.veiculo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroVeiculo(
		
	    @NotBlank
	    String proprietario,

	    @NotBlank
	    String chassis,

	    @NotBlank
	    String marca,

	    @NotBlank
	    String placa,

	    @NotBlank
	    String modelo,

	    @NotNull
	    Long idMotorista,

	    @NotBlank
	    String idFilial
	    ) {
}
