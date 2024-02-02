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
import portaria.api.domain.veiculo.DadosAtualizacaoVeiculo;
import portaria.api.domain.veiculo.DadosCadastroVeiculo;
import portaria.api.domain.veiculo.DadosDetalhamentoVeiculo;
import portaria.api.domain.veiculo.DadosListagemVeiculo;
import portaria.api.domain.veiculo.DadosListagemVeiculoInput;
import portaria.api.domain.veiculo.VeiculoService;

@RestController
@RequestMapping("api/veiculo")
@SecurityRequirement(name = "bearer-key")
public class VeiculoController {

	@Autowired
	private VeiculoService veiculoService;
	
	@GetMapping
    public ResponseEntity<Page<DadosListagemVeiculo>> listar(Pageable paginacao) {
        Page<DadosListagemVeiculo> page = veiculoService.listar(paginacao);
        return ResponseEntity.ok(page);
    }
	
	@GetMapping("/{id}")
	public ResponseEntity<DadosDetalhamentoVeiculo> listarById(@PathVariable Long id) {
		var veiculo = veiculoService.listarById(id);
		return ResponseEntity.ok(veiculo);
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<DadosDetalhamentoVeiculo> cadastrar(@RequestBody @Valid DadosCadastroVeiculo dados, UriComponentsBuilder uriBuilder){
		var dto = veiculoService.cadastrar(dados);
		var uri = uriBuilder.path("api/veiculo/{id}").buildAndExpand(dto.id()).toUri();
		
		return ResponseEntity.created(uri).body(dto);
	}
	
	@PutMapping
	@Transactional
	public ResponseEntity<DadosDetalhamentoVeiculo> atualizar(@RequestBody @Valid DadosAtualizacaoVeiculo dados) {
		var dto = veiculoService.atualizar(dados);
		return ResponseEntity.ok(dto);
	}
	
	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
		veiculoService.excluir(id);
	    return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/veiculo-por-id-motorista/{id}")
	public ResponseEntity<List<DadosListagemVeiculoInput>> findVeiculoByIdMotorista(@PathVariable Long id) {
		var veiculos = veiculoService.listarVeiculoByIdMotorista(id);
		return ResponseEntity.ok(veiculos);
	}
}
