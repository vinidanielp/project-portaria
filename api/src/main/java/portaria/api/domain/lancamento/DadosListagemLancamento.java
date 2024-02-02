package portaria.api.domain.lancamento;

import java.time.LocalDateTime;

public record DadosListagemLancamento(
		Long id,
        String tipoLancamento,
        String numeroPedido,
        String notaFiscal,
        String motorista,
        String veiculo,
        String idFilial,
        LocalDateTime dtInclusao) {

	
	public DadosListagemLancamento(Lancamento lancamento) {
		this(
				lancamento.getId(),
				lancamento.getTipoLancamento(),
				lancamento.getNumeroPedido(),
				lancamento.getNotaFiscal(),
				lancamento.getMotorista().getNome(),
				lancamento.getVeiculo().getModelo()+ "/" + lancamento.getVeiculo().getPlaca(),
				lancamento.getFilial().getId(),
				lancamento.getDtInclusao()
			);
	}
}
