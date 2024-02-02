package portaria.api.domain.veiculo;

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

@Table(name = "veiculo")
@Entity(name = "Veiculo")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Veiculo {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
    private Long id;

	@Column(name = "proprietario", nullable = false)
	private String proprietario;

	@Column(name = "chassis",  nullable = false)
	private String chassis;

	@Column(name = "marca",  nullable = false)
  	private String marca;

	@Column(name = "placa",  nullable = false)
  	private String placa;

	@Column(name = "modelo",  nullable = false)
  	private String modelo;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "motorista_id", referencedColumnName = "id")
    private Motorista motorista;
  
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "filial_id", referencedColumnName = "id")
    private Filial filial;

  	@Column(name = "STATUS",  nullable = false, length = 1)
  	private Boolean status;

	@Column(name = "dt_inclusao")
	private LocalDateTime dtInclusao;
	
	@Column(name = "dt_exclusao")
	private LocalDateTime dtExclusao;
	
	
	
	public Veiculo(DadosCadastroVeiculo dados, Motorista motorista, Filial filial) {
		this.proprietario = dados.proprietario();
		this.chassis = dados.chassis();
		this.marca = dados.marca();
		this.placa = dados.placa();
		this.modelo = dados.modelo();
		this.motorista = motorista;
		this.filial = filial;
		this.dtInclusao = LocalDateTime.now();
		this.status = true;
	}
	
	public void atualizarInformacoes(DadosAtualizacaoVeiculo dados, Motorista motorista,  Filial filial) {

		if(dados.proprietario() != null) {
			this.proprietario = dados.proprietario();
		}
		
		if(dados.chassis() != null) {
			this.chassis = dados.chassis();
		}
		
		if(dados.marca() != null) {
			this.marca = dados.marca();
		}
		
		if(dados.placa() != null) {
			this.placa = dados.placa();
		}
		
		if(dados.modelo() != null) {
			this.modelo = dados.modelo();
		}
		
		if(dados.idMotorista() != null && motorista != null) {
			this.motorista = motorista;
		}
		
		if(dados.idFilial() != null && filial != null) {
			this.filial = filial;	
		}
		
		if(dados.status() != null) {
			this.status = dados.status();
		}
	}
	
	public void excluir() {
		this.status = false;
		this.dtExclusao = LocalDateTime.now();
	}
}
