package portaria.api.domain.motorista;

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

@Table(name = "motorista")
@Entity(name = "Motorista")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Motorista {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
    private Long id;

	@Column(name = "nome", nullable = false)
	private String nome;

	@Column(name = "cpf",  nullable = false)
	private String cpf;

	@Column(name = "empresa",  nullable = false)
  	private String empresa;

	@Column(name = "contato",  nullable = false)
  	private String contato;

	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "filial_id", referencedColumnName = "id")
    private Filial filial;
  
  	@Column(name = "status",  nullable = false, length = 1)
  	private Boolean status;

	@Column(name = "dt_inclusao")
	private LocalDateTime dtInclusao;
	
	@Column(name = "dt_exclusao")
	private LocalDateTime dtExclusao;
	
	
	public Motorista(DadosCadastroMotorista dados, Filial filial) {
		this.nome = dados.nome();
		this.cpf = dados.cpf();
		this.empresa = dados.empresa();
		this.contato = dados.contato();
		this.filial = filial;
		this.dtInclusao = LocalDateTime.now();
		this.status = true;
	}
	
	public void atualizarInformacoes(DadosAtualizacaoMotorista dados, Filial filial) {

		if(dados.nome() != null) {
			this.nome = dados.nome();
		}
		
		if(dados.cpf() != null) {
			this.cpf = dados.cpf();
		}
		
		if(dados.empresa() != null) {
			this.empresa = dados.empresa();
		}
		
		if(dados.contato() != null) {
			this.contato = dados.contato();
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
