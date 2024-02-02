package portaria.api.domain.usuario;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import portaria.api.domain.filial.Filial;
import portaria.api.domain.perfil.Perfil;

@Table(name = "usuario")
@Entity(name = "Usuario")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Usuario implements UserDetails{

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
    private Long id;

	@Column(name = "nome")
	private String nome;

	@Column(name = "login")
	private String login;

	@Column(name = "senha")
    private String senha;

	@Column(name = "email")
  	private String email;
  
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "usuario_filial", joinColumns = @JoinColumn(name = "usuario_id"), inverseJoinColumns = @JoinColumn(name = "filial_id"))
    private Set<Filial> filiais;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "perfil_id", referencedColumnName = "id")
    private Perfil perfil;
  
  	@Column(name = "status")
  	private Boolean status;
  	
	@Column(name = "dt_inclusao")
	private LocalDateTime dtInclusao;
	
	@Column(name = "dt_alteracao")
	private LocalDateTime dtAlteracao;
	
	@Column(name = "dt_exclusao")
	private LocalDateTime dtExclusao;
	
	public Usuario(DadosCadastroUsuario dados, Set<Filial> filiais, Perfil perfil) {
		this.nome = dados.nome();
		this.login = dados.login();
		this.email = dados.email();
		this.filiais = filiais;
		this.perfil = perfil;
		this.status = true;
		this.dtInclusao = LocalDateTime.now();
	}
	
	public void atualizarInformacoes(DadosAtualizacaoUsuario dados, Set<Filial> filiais, Perfil perfil) {
		if(dados.nome() != null) {
			this.nome = dados.nome();
		}
		
		if(dados.login() != null) {
			this.login = dados.login();
		}
		
		if(dados.email() != null) {
			this.email = dados.email();
		}
		
		if(dados.filiais() != null && filiais != null) {
			this.filiais = filiais;
		}
		
		if(dados.idPerfil() != null && perfil != null) {
			this.perfil = perfil;
		}
		
		if(dados.status() != null) {
			this.status = dados.status();
		}
		
		this.dtAlteracao = LocalDateTime.now();
	}
	
	public void excluir() {
		this.status = false;
		this.dtExclusao = LocalDateTime.now();
	}

	
	@Override
	public Collection<GrantedAuthority> getAuthorities() {
		return null;
//        Set<GrantedAuthority> permissoes = new HashSet<>();
//
//        for (Perfil perfil : perfis) {
//            for (Permissao permissao : perfil.getPermissoes()) {
//                permissoes.add(new SimpleGrantedAuthority(permissao.getNome()));
//            }
//        }
//
//        return permissoes;
	}

	@Override
	public String getPassword() {
		return senha;
	}

	@Override
	public String getUsername() {
		return login;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
	
	
}
