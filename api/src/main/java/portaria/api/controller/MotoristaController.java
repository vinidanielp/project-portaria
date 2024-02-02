package portaria.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
import portaria.api.domain.motorista.DadosAtualizacaoMotorista;
import portaria.api.domain.motorista.DadosCadastroMotorista;
import portaria.api.domain.motorista.DadosDetalhamentoMotorista;
import portaria.api.domain.motorista.DadosListagemMotorista;
import portaria.api.domain.motorista.DadosListagemMotoristaInput;
import portaria.api.domain.motorista.MotoristaService;

@RestController
@RequestMapping("api/motorista")
@SecurityRequirement(name = "bearer-key")
public class MotoristaController {

	@Autowired
	private MotoristaService motoristaService;
	
	@GetMapping
    public ResponseEntity<Page<DadosListagemMotorista>> listar(Pageable paginacao) {
        Page<DadosListagemMotorista> page = motoristaService.listar(paginacao);
        return ResponseEntity.ok(page);
    }
	
	@GetMapping("/{id}")
	public ResponseEntity<DadosDetalhamentoMotorista> listarById(@PathVariable Long id) {
		var motorista = motoristaService.listarById(id);
		return ResponseEntity.ok(motorista);
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<DadosDetalhamentoMotorista> cadastrar(@RequestBody @Valid DadosCadastroMotorista dados, UriComponentsBuilder uriBuilder){
		var dto = motoristaService.cadastrar(dados);
		var uri = uriBuilder.path("api/motorista/{id}").buildAndExpand(dto.id()).toUri();
		
		return ResponseEntity.created(uri).body(dto);
	}
	
	@PutMapping
	@Transactional
	public ResponseEntity<DadosDetalhamentoMotorista> atualizar(@RequestBody @Valid DadosAtualizacaoMotorista dados) {
		var dto = motoristaService.atualizar(dados);
		return ResponseEntity.ok(dto);
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
		motoristaService.excluir(id);
	    return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/motorista-ativo")
	public ResponseEntity<Page<DadosListagemMotoristaInput>> listarTodosMotoristasAtivos(@PageableDefault(size = 10, sort = {"id"}) Pageable paginacao) {
	  Page<DadosListagemMotoristaInput> page = motoristaService.listarMotoristasAtivos(paginacao);
        return ResponseEntity.ok(page);
	}
}
