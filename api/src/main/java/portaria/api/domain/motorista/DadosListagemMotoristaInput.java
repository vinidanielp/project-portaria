package portaria.api.domain.motorista;

public record DadosListagemMotoristaInput(
		Long id,
		String nome
		) {
	
	public DadosListagemMotoristaInput(Motorista motorista) {
		this(
				motorista.getId(), 
				motorista.getNome()
			);
	}
}
