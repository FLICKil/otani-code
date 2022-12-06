alter table users drop createOn;
alter table users drop createdBy;
alter table users drop updateOn;
alter table users drop updateBy;
alter table users add createdAt datetime;
alter table users add updatedAt datetime;
alter table users add createdBy bigint;
alter table users add updatedBy bigint;

