package portaria.api.controller;

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
import portaria.api.domain.lancamento.DadosAtualizacaoLancamento;
import portaria.api.domain.lancamento.DadosCadastroLancamento;
import portaria.api.domain.lancamento.DadosDetalhamentoLancamento;
import portaria.api.domain.lancamento.DadosListagemLancamento;
import portaria.api.domain.lancamento.LancamentoService;

@RestController
@RequestMapping("api/lancamento")
@SecurityRequirement(name = "bearer-key")
public class LancamentoController {
	
	@Autowired
	private LancamentoService lancamentoService;
	
	@GetMapping
    public ResponseEntity<Page<DadosListagemLancamento>> listar(Pageable paginacao) {
        Page<DadosListagemLancamento> page = lancamentoService.listar(paginacao);
        return ResponseEntity.ok(page);
    }
	
	@GetMapping("/{id}")
	public ResponseEntity<DadosDetalhamentoLancamento> listarById(@PathVariable Long id) {
		var lancamento = lancamentoService.listarById(id);
		return ResponseEntity.ok(lancamento);
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<DadosDetalhamentoLancamento> cadastrar(@RequestBody @Valid DadosCadastroLancamento dados, UriComponentsBuilder uriBuilder) {
		var dto = lancamentoService.cadastrar(dados);
		var uri = uriBuilder.path("api/lancamento/{id}").buildAndExpand(dto.id()).toUri();
		
		return ResponseEntity.created(uri).body(dto);
	}
	
	@PutMapping
	@Transactional
	public ResponseEntity<DadosDetalhamentoLancamento> atualizar(@RequestBody @Valid DadosAtualizacaoLancamento dados) {
		var dto = lancamentoService.atualizar(dados);
		return ResponseEntity.ok(dto);
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
		lancamentoService.excluir(id);
	    return ResponseEntity.noContent().build();
	}

}
