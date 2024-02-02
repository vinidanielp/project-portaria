package portaria.api.domain.motorista;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MotoristaRepository extends JpaRepository<Motorista, Long> {

	Page<Motorista> findAllByStatusTrue(Pageable paginacao);

	boolean existsByCpf(String cpf);
}
