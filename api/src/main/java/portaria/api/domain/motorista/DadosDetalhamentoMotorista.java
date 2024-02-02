package portaria.api.domain.motorista;

public record DadosDetalhamentoMotorista(
		Long id, 
		String nome,
		String cpf,
		String empresa,
		String contato,
	    String idFilial,
	    Boolean status
		) {

	public DadosDetalhamentoMotorista(Motorista motorista) {
		this(
				motorista.getId(),
				motorista.getNome(),
				motorista.getCpf(),
				motorista.getEmpresa(),
				motorista.getContato(),
				motorista.getFilial().getId(),
				motorista.getStatus()
			);
	}
}
