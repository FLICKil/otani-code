create table users
(
    id   bigint not null auto_increment,
    name varchar(100) not null,
    email varchar(100) not null,
    password varchar(100) not null,
    createOn datetime not null,
    updateOn datetime not null,
    status boolean default 1,
    createdBy bigint not null,
    updateBy bigint not null,
    primary key (id)
);
