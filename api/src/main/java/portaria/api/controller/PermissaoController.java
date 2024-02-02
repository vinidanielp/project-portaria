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
import portaria.api.domain.permissao.DadosAtualizacaoPermissao;
import portaria.api.domain.permissao.DadosCadastroPermissao;
import portaria.api.domain.permissao.DadosDetalhamentoPermissao;
import portaria.api.domain.permissao.DadosListagemPermissao;
import portaria.api.domain.permissao.Permissao;
import portaria.api.domain.permissao.PermissaoRepository;

@RestController
@RequestMapping("api/permissao")
@SecurityRequirement(name = "bearer-key")
public class PermissaoController {
	
	@Autowired
	private PermissaoRepository permissaoRepository;

	@GetMapping
	public ResponseEntity<Page<DadosListagemPermissao>> listar(Pageable paginacao){
		var page = permissaoRepository.findAll(paginacao).map(DadosListagemPermissao::new);
		
		return ResponseEntity.ok(page);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<DadosDetalhamentoPermissao> detalhar(@PathVariable Long id) {
		var permissao = permissaoRepository.getReferenceById(id);
		
		return ResponseEntity.ok(new DadosDetalhamentoPermissao(permissao));
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<DadosDetalhamentoPermissao> cadastrar(@RequestBody @Valid DadosCadastroPermissao dados, UriComponentsBuilder uriBuilder) {
		var permissao = new Permissao(dados);
		permissaoRepository.save(permissao);
		
		var uri = uriBuilder.path("api/permissao/{id}").buildAndExpand(permissao.getId()).toUri();
		
		return ResponseEntity.created(uri).body(new DadosDetalhamentoPermissao(permissao));
	}
	
	@PutMapping
	@Transactional
	public ResponseEntity<DadosDetalhamentoPermissao> atualizar(@RequestBody @Valid DadosAtualizacaoPermissao dados) {
		var permissao = permissaoRepository.getReferenceById(dados.id());
		permissao.atualizarInformacoes(dados);
		
		return ResponseEntity.ok(new DadosDetalhamentoPermissao(permissao));
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
		var permissao = permissaoRepository.getReferenceById(id);
		permissaoRepository.deleteById(permissao.getId());
		
		return ResponseEntity.noContent().build();
	}
}
