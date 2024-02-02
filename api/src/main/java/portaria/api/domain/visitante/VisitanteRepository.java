package portaria.api.domain.visitante;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface VisitanteRepository extends JpaRepository<Visitante, Long> {

	Page<Visitante> findAllByStatusTrue(Pageable paginacao);

	@Query("SELECT v FROM Visitante v WHERE DATE(v.dataVisita) = CURRENT_DATE AND v.status = true")
	List<Visitante> findByVisitasHoje();

	@Query(value = """ 
				SELECT * 
				FROM Visitante v
				WHERE v.dt_visita BETWEEN DATE_ADD(CURRENT_DATE, INTERVAL 1 DAY) AND DATE_ADD(CURRENT_DATE, INTERVAL 5 DAY)
				AND v.status = true
				ORDER BY v.dt_visita 
			""", nativeQuery = true)
	List<Visitante> findByVisitasProximos5Dias();
}
