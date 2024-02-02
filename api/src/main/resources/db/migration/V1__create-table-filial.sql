create table filial(
	id varchar(10) not null,
	bairro varchar(255) not null,
	cep varchar(8) not null unique,
	cidade varchar(255) not null unique,
	cnpj varchar(14) not null,
	dt_exclusao datetime,
	dt_inclusao datetime not null,
	endereco varchar(255) not null,
	estado varchar(255) not null,
	ins_estadual varchar(100) not null,
	nome varchar(150) not null,
	status tinyint not null,
    
	primary key(id)
);

insert into filial values ('301', 'DAIA', '75132110', 'ANAPOLIS', '37249299000122', NULL, '2024-01-01 08:00', 'RUA R VP - 4E, QUADRA 06 MODULO 08, S/N', 'GO', '10.238.081-3', 'ISOESTE METÁLICA IND. E COMÉRCIO LTDA', 1);
insert into filial values ('303', 'BARRA', '37567000', 'SAO SEBASTIAO DA BELA VISTA', '37249299000203', NULL, '2024-01-01 08:00', 'ROD FERNAO DIAS, SN, BR 381 KM 844', 'MG', '003496683.00-10', 'ISOESTE METÁLICA IND. E COMÉRCIO LTDA', 1);