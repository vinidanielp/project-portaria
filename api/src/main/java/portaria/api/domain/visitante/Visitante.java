package portaria.api.domain.visitante;

import java.time.LocalDate;
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

@Table(name = "visitante")
@Entity(name = "Visitante")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Visitante {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
    private Long id;

	@Column(name = "nome")
	private String nome;
	
	@Column(name = "cpf")
	private String cpf;
	
	@Column(name = "contato")
	private String contato;
	
	@Column(name = "empresa")
	private String empresa;
	
	@Column(name = "departamento")
	private String departamento;
	
	@Column(name = "hora_visita")
	private String horaVisita;
	
	@Column(name = "dt_visita")
	private LocalDate dataVisita;
	
	@Column(name = "obs")
	private String observacao;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "filial_id", referencedColumnName = "id")
    private Filial filial;

	@Column(name = "status")
  	private Boolean status;
	
	@Column(name = "dt_inclusao")
	private LocalDateTime dtInclusao;
	
	@Column(name = "dt_exclusao")
	private LocalDateTime dtExclusao;
	
	
	public Visitante(DadosCadastroVisitante dados, Filial filial) {
		this.nome = dados.nome();
		this.cpf = dados.cpf();
		this.contato = dados.contato();
		this.empresa = dados.empresa();
		this.departamento = dados.departamento();
		this.horaVisita = dados.horaVisita();
		this.dataVisita = dados.dataVisita();
		this.observacao = dados.observacao();
		this.dtInclusao = LocalDateTime.now();
		this.filial = filial;
		this.status = true;
	}

	public void atualizarInformacoes(DadosAtualizacaoVisitante dados, Filial filial) {

		if(dados.nome() != null) {
			this.nome = dados.nome();
		}
		
		if(dados.cpf() != null) {
			this.cpf = dados.cpf();
		}
		
		if(dados.contato() != null) {
			this.contato = dados.contato();
		}
		
		if(dados.empresa() != null) {
			this.empresa = dados.empresa();
		}
		
		if(dados.departamento() != null) {
			this.departamento = dados.departamento();
		}
		
		if(dados.horaVisita() != null) {
			this.horaVisita = dados.horaVisita();
		}
		
		if(dados.dataVisita() != null) {
			this.dataVisita = dados.dataVisita();
		}
		
		if(dados.observacao() != null) {
			this.observacao = dados.observacao();
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
	
	public void ativar() {
		this.status = true;
		this.dtExclusao = null;
	}
}
