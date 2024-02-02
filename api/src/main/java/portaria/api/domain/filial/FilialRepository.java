package portaria.api.domain.filial;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FilialRepository extends JpaRepository<Filial, String>{

	@Query("SELECT p FROM Filial p WHERE p.id IN :idFiliais")
	Set<Filial> getReferenceById(@Param("idFiliais") Set<String> idFiliais);
	
	@Query("""
			SELECT COUNT(p) > 0 
			FROM Filial p 
			WHERE p.id IN :idFiliais
			""")
	boolean existsById(@Param("idFiliais") Set<String> idFiliais);

	Page<Filial> findAllByStatusTrue(Pageable paginacao);
}
