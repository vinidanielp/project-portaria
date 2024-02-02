package portaria.api.domain.perfil;

public record DadosListagemPerfil(
		Long id,
		String nome
		) {

	public DadosListagemPerfil(Perfil perfil) {
		this(
				perfil.getId(), 
				perfil.getNome()
			);
	}
}
