CREATE TABLE perfil_permissao (
  perfil_id bigint NOT NULL,
  permissao_id bigint NOT NULL,
  
  PRIMARY KEY (perfil_id,permissao_id),
  constraint fk_perfil_permissao_perfil FOREIGN KEY (perfil_id) REFERENCES perfil(id),
  constraint fk_perfil_permissao_permissao FOREIGN KEY (permissao_id) REFERENCES permissao(id)
) ;