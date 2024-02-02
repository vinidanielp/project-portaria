package portaria.api.domain.visitante;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoVisitante(	
		
		@NotNull
		Long id, 
		
		String nome,

		String cpf,
		
		String contato,
		
		String empresa,
		
		String departamento,
		
		String horaVisita,
		
		LocalDate dataVisita,
		
		String observacao,

	    String idFilial,
	    
	    Boolean status
		) {
}
