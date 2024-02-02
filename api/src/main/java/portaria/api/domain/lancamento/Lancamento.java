package portaria.api.domain.lancamento;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import portaria.api.domain.filial.Filial;
import portaria.api.domain.motorista.Motorista;
import portaria.api.domain.veiculo.Veiculo;

@Table(name = "lancamento")
@Entity(name = "Lancamento")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Lancamento {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
    private Long id;

  	@Column(name = "tipo_lancamento")
  	private String tipoLancamento;
  	
  	@Column(name = "numero_pedido")
  	private String numeroPedido;

  	@Column(name = "nota_fiscal")
  	private String notaFiscal;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "motorista_id", referencedColumnName = "id")
    private Motorista motorista;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "veiculo_id", referencedColumnName = "id")
    private Veiculo veiculo;
  
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "filial_id", referencedColumnName = "id")
    private Filial filial;
	
	@Column(name = "dt_inclusao")
	private LocalDateTime dtInclusao;
	
	@Column(name = "dt_alteracao")
	private LocalDateTime dtAlteracao;
	
	@Column(name = "dt_exclusao")
	private LocalDateTime dtExclusao;
	
	
    public Lancamento(DadosCadastroLancamento dados, Motorista motorista, Veiculo veiculo, Filial filial) {
        this.tipoLancamento = dados.tipoLancamento();
        this.numeroPedido = dados.numeroPedido();
        this.notaFiscal = dados.notaFiscal();
        this.motorista = motorista;
        this.veiculo = veiculo;
        this.filial = filial;
        this.dtInclusao = LocalDateTime.now();
    }
    
    public void atualizarInformacoes(DadosAtualizacaoLancamento dados, Motorista motorista, Veiculo veiculo, Filial filial) {
        
    	if (dados.tipoLancamento() != null) {
            this.tipoLancamento = dados.tipoLancamento();
        }

        if (dados.numeroPedido() != null) {
            this.numeroPedido = dados.numeroPedido();
        }

        if (dados.notaFiscal() != null) {
            this.notaFiscal = dados.notaFiscal();
        }

        if (dados.idMotorista() != null &&  motorista != null) {
            this.motorista = motorista;
        }

        if (dados.idVeiculo() != null && veiculo != null) {
            this.veiculo = veiculo;
        }

        if (dados.idFilial() != null && filial != null)  {
            this.filial = filial;
        }
        
        this.dtAlteracao = LocalDateTime.now();
    }
    
	public void excluir() {
		this.dtExclusao = LocalDateTime.now();
	}
}
