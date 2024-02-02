CREATE TABLE motorista (
  id bigint NOT NULL AUTO_INCREMENT,
  contato varchar(255) NOT NULL,
  cpf varchar(255) NOT NULL UNIQUE,
  dt_exclusao datetime(6) DEFAULT NULL,
  dt_inclusao datetime(6) NOT NULL,
  empresa varchar(255) NOT NULL,
  nome varchar(255) NOT NULL,
  status tinyint NOT NULL,
  filial_id varchar(255) NOT NULL,
  
  PRIMARY KEY (id),
  constraint fk_filial_motoristas foreign key(filial_id) references filial(id)
);