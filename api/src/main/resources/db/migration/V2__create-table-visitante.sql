CREATE TABLE visitante (
  id bigint NOT NULL AUTO_INCREMENT,
  contato varchar(255) NOT NULL,
  cpf varchar(255) NOT NULL,
  dt_visita date NOT NULL,
  departamento varchar(255) NOT NULL,
  dt_exclusao datetime(6) NULL,
  dt_inclusao datetime(6) NOT NULL,
  empresa varchar(255) NOT NULL,
  hora_visita varchar(10) NOT NULL,
  nome varchar(255) NOT NULL,
  obs varchar(255) DEFAULT NULL,
  status tinyint NOT NULL,
  filial_id varchar(255) NOT NULL,
  
  PRIMARY KEY (id),
  constraint fk_filial_visitante foreign key(filial_id) references filial(id)
);