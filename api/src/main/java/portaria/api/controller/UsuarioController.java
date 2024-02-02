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
import portaria.api.domain.usuario.DadosAtualizacaoUsuario;
import portaria.api.domain.usuario.DadosCadastroUsuario;
import portaria.api.domain.usuario.DadosDetalhamentoUsuario;
import portaria.api.domain.usuario.DadosListagemUsuario;
import portaria.api.domain.usuario.UsuarioService;

@RestController
@RequestMapping("api/usuario")
@SecurityRequirement(name = "bearer-key")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;
	
	@GetMapping
    public ResponseEntity<Page<DadosListagemUsuario>> listar(Pageable paginacao) {
        Page<DadosListagemUsuario> page = usuarioService.listar(paginacao);
        return ResponseEntity.ok(page);
    }
	
	@GetMapping("/{id}")
	public ResponseEntity<DadosDetalhamentoUsuario> listarById(@PathVariable Long id) {
		var usuario = usuarioService.listarById(id);
		return ResponseEntity.ok(usuario);
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<DadosDetalhamentoUsuario> cadastrar(@RequestBody @Valid DadosCadastroUsuario dados, UriComponentsBuilder uriBuilder){
		var dto = usuarioService.cadastrar(dados);
		var uri = uriBuilder.path("api/usuario/{id}").buildAndExpand(dto.id()).toUri();
		
		return ResponseEntity.created(uri).body(dto);
	}
	
	@PutMapping
	@Transactional
	public ResponseEntity<DadosDetalhamentoUsuario> atualizar(@RequestBody @Valid DadosAtualizacaoUsuario dados) {
		var dto = usuarioService.atualizar(dados);
		return ResponseEntity.ok(dto);
	}
	
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
		usuarioService.excluir(id);
	    return ResponseEntity.noContent().build();
	}
}
