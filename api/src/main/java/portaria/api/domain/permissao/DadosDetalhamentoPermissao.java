package portaria.api.domain.permissao;

public record DadosDetalhamentoPermissao(		
		Long id,
		String nome
		) {

	public DadosDetalhamentoPermissao(Permissao permissao) {
		this(permissao.getId(), permissao.getNome());
	}
}
