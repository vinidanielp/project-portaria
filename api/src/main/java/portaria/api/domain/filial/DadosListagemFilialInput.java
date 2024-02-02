package portaria.api.domain.filial;

public record DadosListagemFilialInput(
		String id,
		String nome
		) {

	public DadosListagemFilialInput(Filial filial) {
		this(
				filial.getId(), 
				filial.getNome()
			);
	}
}
