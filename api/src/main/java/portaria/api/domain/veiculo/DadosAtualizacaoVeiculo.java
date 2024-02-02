package portaria.api.domain.veiculo;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoVeiculo(
		
		@NotNull
		Long id,
		
	    String proprietario,

	    String chassis,

	    String marca,

	    String placa,

	    String modelo,

	    Long idMotorista,

	    String idFilial,
	    
	    Boolean status
		) {

}
