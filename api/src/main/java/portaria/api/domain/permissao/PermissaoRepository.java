package portaria.api.domain.permissao;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PermissaoRepository extends JpaRepository<Permissao, Long>{

	@Query("SELECT p FROM Permissao p WHERE p.id IN :idPermissoes")
	Set<Permissao> getReferenceById(@Param("idPermissoes") Set<Long> idPermissoes);

	@Query("""
			SELECT COUNT(p) > 0 
			FROM Permissao p 
			WHERE p.id IN :idPermissoes
			""")
	boolean existsById(@Param("idPermissoes") Set<Long> idPermissoes);
}
