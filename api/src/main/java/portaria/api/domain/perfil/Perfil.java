package portaria.api.domain.perfil;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import portaria.api.domain.permissao.Permissao;

@Table(name = "perfil")
@Entity(name = "Perfil")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Perfil {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
    private Long id;
	
	@Column(name = "nome")
	private String nome;
	
	@ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "perfil_permissao", joinColumns = @JoinColumn(name = "perfil_id"), inverseJoinColumns = @JoinColumn(name = "permissao_id"))
	private Set<Permissao> permissoes;
	
	
	public Perfil(DadosCadastroPerfil dados, Set<Permissao> permissoes) {
		this.nome = dados.nome();
		this.permissoes = permissoes;
	}
	
	public void atualizarInformacoes(DadosAtualizacaoPerfil dados, Set<Permissao> permissoes) {
		
		if(dados.nome() != null) {
			this.nome = dados.nome();
		}
		
		if(dados.permissoes() != null && permissoes != null) {
			this.permissoes = permissoes;
		}
	}
}
