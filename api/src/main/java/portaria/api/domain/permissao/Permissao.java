package portaria.api.domain.permissao;

import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "permissao")
@Entity(name = "Permissao")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Permissao implements GrantedAuthority {

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
    private Long id;
	
	@Column(name = "nome")
	private String nome;

	@Override
	public String getAuthority() {
		return nome;
	}
	
	
	public Permissao(DadosCadastroPermissao dados) {
		this.nome = dados.nome();
	}
	
	public void atualizarInformacoes(DadosAtualizacaoPermissao dados) {
		
		if(dados.nome() != null) {
			this.nome = dados.nome();
		}
	}
}
