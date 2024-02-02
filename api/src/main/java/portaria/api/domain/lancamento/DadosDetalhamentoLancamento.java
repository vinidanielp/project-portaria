package portaria.api.domain.lancamento;

import java.time.LocalDateTime;

public record DadosDetalhamentoLancamento(
		Long id,
        String tipoLancamento,
        String numeroPedido,
        String notaFiscal,
        Long idMotorista,
        Long idVeiculo,
        String idFilial,
        LocalDateTime dtInclusao) {

	
	public DadosDetalhamentoLancamento(Lancamento lancamento) {
		this(
				lancamento.getId(),
				lancamento.getTipoLancamento(),
				lancamento.getNumeroPedido(),
				lancamento.getNotaFiscal(),
				lancamento.getMotorista().getId(),
				lancamento.getVeiculo().getId(),
				lancamento.getFilial().getId(),
				lancamento.getDtInclusao()
			);
	}
}
