CREATE TABLE lancamento (
  id bigint NOT NULL AUTO_INCREMENT,
  dt_alteracao datetime(6) DEFAULT NULL,
  dt_exclusao datetime(6) DEFAULT NULL,
  dt_inclusao datetime(6) NOT NULL,
  nota_fiscal varchar(7) NOT NULL,
  numero_pedido varchar(8) NOT NULL,
  tipo_lancamento varchar(1) NOT NULL,
  filial_id varchar(255) NOT NULL,
  motorista_id bigint NOT NULL,
  veiculo_id bigint NOT NULL,
  
  PRIMARY KEY (id),
  constraint fk_motorista_lancamento FOREIGN KEY (motorista_id) REFERENCES motorista(id),
  constraint fk_veiculo_lancamento FOREIGN KEY (veiculo_id) REFERENCES veiculo(id),
  constraint fk_filial_lancamento foreign key(filial_id) references filial(id)
);