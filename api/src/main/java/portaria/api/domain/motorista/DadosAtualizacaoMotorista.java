package portaria.api.domain.motorista;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoMotorista(
		
		@NotNull
		Long id, 
		
		String nome,
		
		String cpf,
		
		String empresa,
		
		String contato,
		
	    String idFilial,
	    
	    Boolean status
		) {

}
