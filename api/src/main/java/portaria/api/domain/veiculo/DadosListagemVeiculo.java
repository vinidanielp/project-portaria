package portaria.api.domain.veiculo;

public record DadosListagemVeiculo(
		Long id,
	    String proprietario,
	    String chassis,
	    String marca,
	    String placa,
	    String modelo,
	    String motorista,
	    String idFilial,
	    Boolean status) {

	public DadosListagemVeiculo(Veiculo veiculo) {
		this(
				veiculo.getId(),
				veiculo.getProprietario(),
				veiculo.getChassis(),
				veiculo.getMarca(),
				veiculo.getPlaca(),
				veiculo.getModelo(),
				veiculo.getMotorista().getNome(),
				veiculo.getFilial().getId(),
				veiculo.getStatus()
			);
	}
	
}
