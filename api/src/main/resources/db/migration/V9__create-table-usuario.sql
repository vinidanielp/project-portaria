CREATE TABLE usuario (
  id bigint NOT NULL AUTO_INCREMENT,
  dt_alteracao datetime(6) DEFAULT NULL,
  dt_exclusao datetime(6) DEFAULT NULL,
  dt_inclusao datetime(6) DEFAULT NULL,
  email varchar(255) NOT NULL UNIQUE,
  login varchar(255) NOT NULL,
  nome varchar(255) NOT NULL,
  perfil_id bigint NOT NULL,
  senha varchar(255),
  status tinyint NOT NULL,
  
  PRIMARY KEY (id),
  constraint fk_usuario_perfil FOREIGN KEY (perfil_id) REFERENCES perfil(id)
);