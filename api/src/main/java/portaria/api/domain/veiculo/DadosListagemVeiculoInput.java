package portaria.api.domain.veiculo;

public record DadosListagemVeiculoInput(
		Long id,
		
		String marca,
		
		String modelo,
		
		String placa) {
	
	public DadosListagemVeiculoInput(Veiculo veiculo) {
		this(
				veiculo.getId(),
				veiculo.getMarca(), 
				veiculo.getModelo(), 
				veiculo.getPlaca()
			);
	}

}
