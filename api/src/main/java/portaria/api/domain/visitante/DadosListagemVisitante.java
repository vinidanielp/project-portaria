package portaria.api.domain.visitante;

import java.time.LocalDate;

public record DadosListagemVisitante(
        Long id, 
        String nome, 
        String cpf, 
        String contato, 
        String departamento, 
        String empresa, 
        String idFilial, 
        String horaVisita, 
        LocalDate dataVisita, 
        String observacao, 
        Boolean status) {

	public DadosListagemVisitante(Visitante visitante) {
		 this(
				 visitante.getId(),
				 visitante.getNome(),
				 visitante.getCpf(),
				 visitante.getContato(),
				 visitante.getDepartamento(),
				 visitante.getEmpresa(),
				 visitante.getFilial().getId(),
				 visitante.getHoraVisita(),
				 visitante.getDataVisita(),
				 visitante.getObservacao(),
				 visitante.getStatus()
			);
	}
}
