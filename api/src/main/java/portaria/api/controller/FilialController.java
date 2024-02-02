package portaria.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import portaria.api.domain.filial.DadosListagemFilialInput;
import portaria.api.domain.filial.FilialRepository;

@RestController
@RequestMapping("api/filial")
@SecurityRequirement(name = "bearer-key")
public class FilialController {
	
	@Autowired
	private FilialRepository filialRepository;
	
	@GetMapping
	public ResponseEntity<Page<DadosListagemFilialInput>> listar(Pageable paginacao){
		var page = filialRepository.findAll(paginacao).map(DadosListagemFilialInput::new);
		
		return ResponseEntity.ok(page);
	}

}
