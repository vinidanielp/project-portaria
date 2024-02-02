package portaria.api.domain.usuario;

public record DadosListagemUsuario(
		Long id,
		String nome,
		String login,
		String perfil,
		Boolean status
		
		) {
	
	public DadosListagemUsuario(Usuario usuario) {
		this(
				usuario.getId(),
				usuario.getNome(),
				usuario.getLogin(),
				usuario.getPerfil().getNome(),
				usuario.getStatus()
			);
	}

}
