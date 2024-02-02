package portaria.api.domain.veiculo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long>{

	Page<Veiculo> findAllByStatusTrue(Pageable paginacao);

	List<Veiculo> findByMotoristaId(Long idMotorista);
}
