package portaria.api.domain.permissao;

public record DadosListagemPermissao(
		Long id,
		String nome
		) {

	public DadosListagemPermissao(Permissao permissao) {
		this(permissao.getId(), permissao.getNome());
	}
}
