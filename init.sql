create type usertype as enum ('admin', 'folk');

alter type usertype owner to callsys;

create type userlevel as enum ('diamond', 'platinum', 'gold');

alter type userlevel owner to callsys;

create type conveningstatus as enum ('completed', 'toResponse', 'canceled', 'uncompleted');

alter type conveningstatus owner to callsys;

create type licensetype as enum ('ID', 'passport');

alter type licensetype owner to callsys;

create type request_status as enum ('pending', 'accepted', 'rejected', 'canceled');

alter type request_status owner to callsys;

create table if not exists users
(
	uid serial not null
		constraint user_pk
			primary key,
	nickname varchar(16) not null,
	pwd varchar(32) not null,
	user_type usertype default 'folk'::usertype not null,
	user_name varchar(16) not null,
	license_type licensetype default 'ID'::licensetype not null,
	license_id varchar(18) not null,
	phone varchar(11) not null,
	introduction varchar(128),
	city varchar(16),
	create_at timestamp with time zone default now() not null,
	update_at timestamp with time zone,
	user_level userlevel default 'gold'::userlevel not null
);

comment on column users.user_type is 'usertype:[admin,folk]';

comment on column users.license_type is 'ID.passport';

alter table users owner to callsys;

create unique index if not exists user_nickname_uindex
	on users (nickname);

create unique index if not exists user_uid_uindex
	on users (uid);

create table if not exists convenings
(
	cid serial not null
		constraint convening_pk
			primary key,
	owner integer not null
		constraint convenings_users_uid_fk
			references users
				on update cascade on delete cascade,
	type varchar(32) not null,
	name varchar(32) not null,
	introduction varchar(256),
	crowd_number integer not null,
	endtime timestamp with time zone not null,
	create_at timestamp with time zone default now() not null,
	update_at timestamp with time zone,
	status conveningstatus default 'toResponse'::conveningstatus not null
);

comment on column convenings.status is '''completed'', ''toResponse'', ''canceled'', ''uncompleted''';

alter table convenings owner to callsys;

create unique index if not exists convening_cid_uindex
	on convenings (cid);

create table if not exists requests
(
	rid serial not null
		constraint c_requests_pk
			primary key,
	cid integer not null
		constraint c_requests_convening_cid_fk
			references convenings
				on update cascade on delete cascade,
	uid integer not null
		constraint c_requests_user_uid_fk
			references users
				on update cascade on delete cascade,
	comments varchar(128),
	create_at timestamp with time zone default now() not null,
	update_at timestamp with time zone,
	status request_status default 'pending'::request_status
);

comment on column requests.rid is 'request_id';

comment on column requests.status is 'pending待处理,accepted已接受,rejected已拒绝,canceled已取消';

alter table requests owner to callsys;

create unique index if not exists c_requests_rid_uindex
	on requests (rid);

create table if not exists info
(
	info_id serial not null
		constraint info_pk
			primary key,
	rid integer not null
		constraint info_requests_rid_fk
			references requests
				on delete cascade,
	owner integer not null,
	contractor integer not null,
	finished_at timestamp with time zone default now() not null,
	owner_fee real default 0 not null,
	contractor_fee real default 0 not null
);

comment on column info.contractor is '接受者';

alter table info owner to callsys;

create index if not exists info_contractor_index
	on info (contractor);

create unique index if not exists info_info_id_uindex
	on info (info_id);

create index if not exists info_owner_index
	on info (owner);

create index if not exists info_rid_index
	on info (rid);

create table if not exists income
(
	date date not null,
	city varchar(16) not null,
	ctype varchar(32) not null,
	quantity integer default 0 not null,
	income integer default 0 not null,
	constraint income_pk
		primary key (date, ctype, city)
);

alter table income owner to callsys;

create or replace function last_updatetime() returns trigger
	language plpgsql
as $$
begin
    NEW.update_at:=now();
    return  NEW;
end;
$$;

alter function last_updatetime() owner to callsys;

create trigger last_update
	before insert or update
	on users
	for each row
	execute procedure last_updatetime();

create trigger last_update
	before insert or update
	on convenings
	for each row
	execute procedure last_updatetime();

create trigger last_update
	before insert or update
	on requests
	for each row
	execute procedure last_updatetime();

