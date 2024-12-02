create database bd_pagaFacil;
use bd_pagaFacil;

create table tb_cliente (
    cnpj varchar(25)NOT NULL PRIMARY key,
    email varchar(20) NOT NULL,
    senha varchar(30) NOT NULL
    );
