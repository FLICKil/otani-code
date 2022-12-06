# add constraint for users
ALTER TABLE users
    ADD CONSTRAINT UC_users UNIQUE (id, email);

create table admin
(
    id        bigint       not null AUTO_INCREMENT,
    name      varchar(100) NOT NULL,
    password  varchar(100) NOT NULL,
    createdAt datetime,
    updatedAt datetime,
    createdBy bigint,
    updatedBy bigint,
    primary key (id),
    unique (id)
);

create table author
(
    id        bigint       not null auto_increment,
    name      varchar(100) not null,
    createdAt datetime,
    updatedAt datetime,
    createdBy bigint,
    updatedBy bigint,
    primary key (id),
    unique (id)
);

create table category
(
    id        bigint       not null auto_increment,
    name      varchar(100) not null,
    createdAt datetime,
    updatedAt datetime,
    createdBy bigint,
    updatedBy bigint,
    primary key (id),
    unique (id)
);

create table publisher
(
    id        bigint       not null auto_increment,
    name      varchar(100) not null,
    createdAt datetime,
    updatedAt datetime,
    createdBy bigint,
    updatedBy bigint,
    primary key (id),
    unique (id)
);

create table book
(
    id          bigint       not null auto_increment,
    title       varchar(100) not null,
    authorId    bigint       not null,
    categoryId  bigint       not null,
    publisherId bigint       not null,
    amount      int          not null,
    createdAt   datetime,
    updatedAt   datetime,
    createdBy   bigint,
    updatedBy   bigint,
    primary key (id),
    unique (id),
    foreign key (authorId) references author (id),
    foreign key (categoryId) references category (id),
    foreign key (publisherId) references publisher (id)
);

create table setting
(
    id              bigint not null auto_increment,
    userIssuedLimit int    not null,
    bookReturnDay   int    not null,
    currency        varchar(100),
    oneDayFee       decimal(4, 2),
    createdAt       datetime,
    updatedAt       datetime,
    createdBy       bigint,
    updatedBy       bigint,
    unique (id),
    primary key (id)
);

create table rent
(
    id        bigint not null auto_increment,
    bookId    bigint not null,
    userId    bigint not null,
    startDate date,
    endDate   date,
    createdAt datetime,
    updatedAt datetime,
    createdBy bigint,
    updatedBy bigint,
    unique (id),
    primary key (id),
    foreign key (bookId) references book (id),
    foreign key (userId) references users (id)
);

# create trigger for users

DROP TRIGGER IF EXISTS `library`.`users_BEFORE_INSERT`;
DROP TRIGGER IF EXISTS `library`.`users_BEFORE_UPDATE`;

delimiter
$$

CREATE TRIGGER `users_BEFORE_INSERT`
    before INSERT
    ON `users`
    FOR EACH ROW
BEGIN
    SET NEW.`createdAt` = current_timestamp();
    SET NEW.`updatedAt` = current_timestamp();
END
;

$$

delimiter ;

delimiter
$$

CREATE TRIGGER `users_BEFORE_UPDATE`
    before UPDATE
    ON `users`
    FOR EACH ROW
BEGIN
    SET NEW.`updatedAt` = current_timestamp();
END
;

$$

delimiter ;

# create trigger for admin
DROP TRIGGER IF EXISTS `library`.`admin_BEFORE_INSERT`;
DROP TRIGGER IF EXISTS `library`.`admin_BEFORE_UPDATE`;

delimiter
$$

CREATE TRIGGER `admin_BEFORE_INSERT`
    before INSERT
    ON `admin`
    FOR EACH ROW
BEGIN
    SET NEW.`createdAt` = current_timestamp();
    SET NEW.`updatedAt` = current_timestamp();
END
;

$$

delimiter ;

delimiter
$$

CREATE TRIGGER `admin_BEFORE_UPDATE`
    before UPDATE
    ON `admin`
    FOR EACH ROW
BEGIN
    SET NEW.`updatedAt` = current_timestamp();
END
;

$$

delimiter ;

# create trigger for created and update author
DROP TRIGGER IF EXISTS `library`.`author_BEFORE_INSERT`;
DROP TRIGGER IF EXISTS `library`.`author_BEFORE_UPDATE`;

delimiter
$$

CREATE TRIGGER `author_BEFORE_INSERT`
    before INSERT
    ON `author`
    FOR EACH ROW
BEGIN
    SET NEW.`createdAt` = current_timestamp();
    SET NEW.`updatedAt` = current_timestamp();
END
;

$$

delimiter ;

delimiter
$$

CREATE TRIGGER `author_BEFORE_UPDATE`
    before UPDATE
    ON `author`
    FOR EACH ROW
BEGIN
    SET NEW.`updatedAt` = current_timestamp();
END
;

$$

delimiter ;

# create trigger for created and update category
DROP TRIGGER IF EXISTS `library`.`category_BEFORE_INSERT`;
DROP TRIGGER IF EXISTS `library`.`categoty_BEFORE_UPDATE`;
delimiter
$$

CREATE TRIGGER `category_BEFORE_INSERT`
    before INSERT
    ON `category`
    FOR EACH ROW
BEGIN
    SET NEW.`createdAt` = current_timestamp();
    SET NEW.`updatedAt` = current_timestamp();
END
;

$$

delimiter ;

delimiter
$$

CREATE TRIGGER `category_BEFORE_UPDATE`
    before UPDATE
    ON `category`
    FOR EACH ROW
BEGIN
    SET NEW.`updatedAt` = current_timestamp();
END
;

$$

delimiter ;

# create trigger for created and update publisher
DROP TRIGGER IF EXISTS `library`.`publisher_BEFORE_INSERT`;
DROP TRIGGER IF EXISTS `library`.`publisher_BEFORE_UPDATE`;

delimiter
$$

CREATE TRIGGER `publisher_BEFORE_INSERT`
    before INSERT
    ON `publisher`
    FOR EACH ROW
BEGIN
    SET NEW.`createdAt` = current_timestamp();
    SET NEW.`updatedAt` = current_timestamp();
END
;

$$

delimiter ;

delimiter
$$

CREATE TRIGGER `publisher_BEFORE_UPDATE`
    before UPDATE
    ON `publisher`
    FOR EACH ROW
BEGIN
    SET NEW.`updatedAt` = current_timestamp();
END
;

$$

delimiter ;

# create trigger for created and update book
DROP TRIGGER IF EXISTS `library`.`book_BEFORE_INSERT`;
DROP TRIGGER IF EXISTS `library`.`book_BEFORE_UPDATE`;

delimiter
$$

CREATE TRIGGER `book_BEFORE_INSERT`
    before INSERT
    ON `book`
    FOR EACH ROW
BEGIN
    SET NEW.`createdAt` = current_timestamp();
    SET NEW.`updatedAt` = current_timestamp();
END
;

$$

delimiter ;

delimiter
$$

CREATE TRIGGER `book_BEFORE_UPDATE`
    before UPDATE
    ON `book`
    FOR EACH ROW
BEGIN
    SET NEW.`updatedAt` = current_timestamp();
END
;

$$

delimiter ;

# create trigger for created and update rent
DROP TRIGGER IF EXISTS `library`.`rent_BEFORE_INSERT`;
DROP TRIGGER IF EXISTS `library`.`rent_BEFORE_UPDATE`;

delimiter
$$

CREATE TRIGGER `rent_BEFORE_INSERT`
    before INSERT
    ON `rent`
    FOR EACH ROW
BEGIN
    SET NEW.`createdAt` = current_timestamp();
    SET NEW.`updatedAt` = current_timestamp();
END
;

$$

delimiter ;

delimiter
$$

CREATE TRIGGER `rent_BEFORE_UPDATE`
    before UPDATE
    ON `rent`
    FOR EACH ROW
BEGIN
    SET NEW.`updatedAt` = current_timestamp();
END
;

$$

delimiter ;

# create trigger for created and update setting
DROP TRIGGER IF EXISTS `library`.`setting_BEFORE_INSERT`;
DROP TRIGGER IF EXISTS `library`.`setting_BEFORE_UPDATE`;

delimiter
$$

CREATE TRIGGER `setting_BEFORE_INSERT`
    before INSERT
    ON `setting`
    FOR EACH ROW
BEGIN
    SET NEW.`createdAt` = current_timestamp();
    SET NEW.`updatedAt` = current_timestamp();
END
;

$$

delimiter ;

delimiter
$$

CREATE TRIGGER `setting_BEFORE_UPDATE`
    before UPDATE
    ON `setting`
    FOR EACH ROW
BEGIN
    SET NEW.`updatedAt` = current_timestamp();
END
;

$$

delimiter ;
