package portaria.api.domain.filial;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "filial")
@Entity(name = "Filial")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Filial {
	
    @Id
    private String id;

    @Column(name="nome")
    private String nome;
    
    @Column(name="endereco")
    private String endereco;
    
    @Column(name="bairro")
    private String bairro;
    
    @Column(name="cidade")
    private String cidade;
    
    @Column(name="estado")
    private String estado;
    
    @Column(name="cep")
    private Long cep;
    
    @Column(name="cnpj")
    private String cnpj;
    
    @Column(name="ins_estadual")
    private String inscricaoEstadual;
    
    @Column(name="status")
  	private Boolean status;
    
    @Column(name="dt_inclusao")
	private LocalDateTime dtInclusao;
    
    @Column(name="dt_exclusao")
	private LocalDateTime dtExclusao;
}
