package portaria.api.domain.veiculo;

public record DadosDetalhamentoVeiculo(
		Long id,
	    String proprietario,
	    String chassis,
	    String marca,
	    String placa,
	    String modelo,
	    Long idMotorista,
	    String idFilial,
	    Boolean status) {

	public DadosDetalhamentoVeiculo(Veiculo veiculo) {
		this(
				veiculo.getId(),
				veiculo.getProprietario(),
				veiculo.getChassis(),
				veiculo.getMarca(),
				veiculo.getPlaca(),
				veiculo.getModelo(),
				veiculo.getMotorista().getId(),
				veiculo.getFilial().getId(),
				veiculo.getStatus()
			);
	}
}
