package portaria.api.domain.lancamento;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoLancamento(
	
		@NotNull
		Long id,
		
        String tipoLancamento,

        String numeroPedido,

        String notaFiscal,

        Long idMotorista,

        Long idVeiculo,

        String idFilial) {

}
