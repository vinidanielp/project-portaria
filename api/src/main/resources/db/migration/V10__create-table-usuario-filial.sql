CREATE TABLE usuario_filial (
  usuario_id bigint NOT NULL,
  filial_id varchar(255) NOT NULL,
  
  PRIMARY KEY (usuario_id,filial_id),
  CONSTRAINT fk_usuario_filial_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  CONSTRAINT fk_usuario_filial_filial FOREIGN KEY (filial_id) REFERENCES filial(id)
);