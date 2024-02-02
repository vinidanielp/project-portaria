package portaria.api.domain.lancamento;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroLancamento(

        @NotBlank
        String tipoLancamento,

        @NotBlank
        String numeroPedido,

        @NotBlank
        String notaFiscal,

        @NotNull
        Long idMotorista,

        @NotNull
        Long idVeiculo,

        @NotBlank
        String idFilial) {

}
