CREATE TABLE veiculo (
  id bigint NOT NULL AUTO_INCREMENT,
  chassis varchar(255) NOT NULL,
  dt_exclusao datetime(6) DEFAULT NULL,
  dt_inclusao datetime(6) NOT NULL,
  marca varchar(255) NOT NULL,
  modelo varchar(255) NOT NULL,
  placa varchar(255) NOT NULL,
  proprietario varchar(255) NOT NULL,
  status tinyint NOT NULL,
  filial_id varchar(255) NOT NULL,
  motorista_id bigint NOT NULL,
  
  PRIMARY KEY (id),
  constraint fk_filial_veiculo foreign key(filial_id) references filial(id),
  constraint fk_motorista_veiculo FOREIGN KEY (motorista_id) REFERENCES motorista(id)
);