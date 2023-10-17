import { Migration } from '@mikro-orm/migrations';

export class Migration20231017202453 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tags" ("name" varchar(255) not null, "date_created" timestamptz(0) not null, "date_modified" timestamptz(0) null, "date_deleted" timestamptz(0) null, constraint "tags_pkey" primary key ("name"));');

    this.addSql('create table "todos" ("id" uuid not null default uuid_generate_v4(), "date_created" timestamptz(0) not null, "date_modified" timestamptz(0) null, "date_deleted" timestamptz(0) null, "value" varchar(255) not null, "completed" boolean null default false, constraint "todos_pkey" primary key ("id"));');
    this.addSql('create index "todos_value_index" on "todos" ("value");');

    this.addSql('create table "todos_tags" ("todo_id" uuid not null, "tag_name" varchar(255) not null, constraint "todos_tags_pkey" primary key ("todo_id", "tag_name"));');

    this.addSql('alter table "todos_tags" add constraint "todos_tags_todo_id_foreign" foreign key ("todo_id") references "todos" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "todos_tags" add constraint "todos_tags_tag_name_foreign" foreign key ("tag_name") references "tags" ("name") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "todos_tags" drop constraint "todos_tags_tag_name_foreign";');

    this.addSql('alter table "todos_tags" drop constraint "todos_tags_todo_id_foreign";');

    this.addSql('drop table if exists "tags" cascade;');

    this.addSql('drop table if exists "todos" cascade;');

    this.addSql('drop table if exists "todos_tags" cascade;');
  }

}
