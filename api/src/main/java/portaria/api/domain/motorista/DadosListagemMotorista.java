package portaria.api.domain.motorista;

public record DadosListagemMotorista(		
		Long id, 
		String nome,
		String cpf,
		String empresa,
		String contato,
	    String idFilial,
	    Boolean status
		) {

	public DadosListagemMotorista(Motorista motorista) {
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
