package portaria.api.domain.visitante;

import java.time.LocalDate;

public record DadosListagemVisitanteHome(
	
		String horaVisita,
		
		LocalDate dataVisita,
		
		String nome
		
		) {
	
	public DadosListagemVisitanteHome(Visitante visitante) {
		this(
				visitante.getHoraVisita(),
				visitante.getDataVisita(),
				visitante.getNome()
			);
	}

}
