package portaria.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import portaria.api.domain.visitante.DadosAtualizacaoVisitante;
import portaria.api.domain.visitante.DadosCadastroVisitante;
import portaria.api.domain.visitante.DadosDetalhamentoVisitante;
import portaria.api.domain.visitante.DadosListagemVisitante;
import portaria.api.domain.visitante.DadosListagemVisitanteHome;
import portaria.api.domain.visitante.VisitanteService;

@RestController
@RequestMapping("api/visitante")
@SecurityRequirement(name = "bearer-key")
public class VisitanteController {
	
	@Autowired
	private VisitanteService visitanteService;
	
	@GetMapping
    public ResponseEntity<Page<DadosListagemVisitante>> listar(Pageable paginacao) {
        Page<DadosListagemVisitante> page = visitanteService.listar(paginacao);
        return ResponseEntity.ok(page);
    }
	
	@GetMapping("/{id}")
	public ResponseEntity<DadosDetalhamentoVisitante> listarById(@PathVariable Long id) {
		var visitante = visitanteService.listarById(id);
		return ResponseEntity.ok(visitante);
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<DadosDetalhamentoVisitante> cadastrar(@RequestBody @Valid DadosCadastroVisitante dados, UriComponentsBuilder uriBuilder){
		var dto = visitanteService.cadastrar(dados);
		var uri = uriBuilder.path("api/visitante/{id}").buildAndExpand(dto.id()).toUri();
		
		return ResponseEntity.created(uri).body(dto);
	}
	
	@PutMapping
	@Transactional
	public ResponseEntity<DadosDetalhamentoVisitante> atualizar(@RequestBody @Valid DadosAtualizacaoVisitante dados) {
		var dto = visitanteService.atualizar(dados);
		return ResponseEntity.ok(dto);
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
		visitanteService.excluir(id);
	    return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/visitante-hoje")
	public ResponseEntity<List<DadosListagemVisitanteHome>> listarVisitantesHoje() {
		var visitantes = visitanteService.listarVisitantesHoje();
		return ResponseEntity.ok(visitantes);
	}
	
	@GetMapping("/visitante-proximo")
	public ResponseEntity<List<DadosListagemVisitanteHome>> listarVisitantesProximos5Dias() {
		var visitantes = visitanteService.listarVisitantesProximos5Dias();
		return ResponseEntity.ok(visitantes);
	}
}
