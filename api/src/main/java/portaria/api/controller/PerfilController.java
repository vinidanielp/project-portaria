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
import portaria.api.domain.perfil.DadosAtualizacaoPerfil;
import portaria.api.domain.perfil.DadosCadastroPerfil;
import portaria.api.domain.perfil.DadosDetalhamentoPerfil;
import portaria.api.domain.perfil.DadosListagemPerfil;
import portaria.api.domain.perfil.PerfilService;

@RestController
@RequestMapping("api/perfil")
@SecurityRequirement(name = "bearer-key")
public class PerfilController {
	
	@Autowired
	private PerfilService perfilService;
	
	@GetMapping
    public ResponseEntity<Page<DadosListagemPerfil>> listar(Pageable paginacao) {
        Page<DadosListagemPerfil> page = perfilService.listar(paginacao);
        return ResponseEntity.ok(page);
    }
	
	@GetMapping("/{id}")
	public ResponseEntity<DadosDetalhamentoPerfil> listarById(@PathVariable Long id) {
		var perfil = perfilService.listarById(id);
		return ResponseEntity.ok(perfil);
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<DadosDetalhamentoPerfil> cadastrar(@RequestBody @Valid DadosCadastroPerfil dados, UriComponentsBuilder uriBuilder){
		var dto = perfilService.cadastrar(dados);
		var uri = uriBuilder.path("api/perfil/{id}").buildAndExpand(dto.id()).toUri();
		
		return ResponseEntity.created(uri).body(dto);
	}
	
	@PutMapping
	@Transactional
	public ResponseEntity<DadosDetalhamentoPerfil> atualizar(@RequestBody @Valid DadosAtualizacaoPerfil dados) {
		var dto = perfilService.atualizar(dados);
		return ResponseEntity.ok(dto);
	}
	
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
		perfilService.excluir(id);
	    return ResponseEntity.noContent().build();
	}
}
