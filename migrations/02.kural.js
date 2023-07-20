const knex = require("../knex");

exports.up = function () {
  return knex.schema.createTable("thirukural", function (table) {
    // table.increments("id").primary();
    table.integer("number").notNullable();
    table.integer("paal_id").notNullable();
    table.integer("eyal_id").notNullable();
    table.integer("athigaram_id").notNullable();
    table.string("sect_tam", 5000).notNullable();
    table.string("chapgrp_tam", 5000).notNullable();
    table.string("chap_tam", 5000).notNullable();
    table.string("line1", 5000).notNullable();
    table.string("line2", 5000).notNullable();
    table.string("tam_exp", 5000).notNullable();
    table.string("sect_eng", 5000).notNullable();
    table.string("chap_eng", 5000).notNullable();
    table.string("chapgrp_eng", 5000).notNullable();
    table.string("eng_exp", 5000).notNullable();
    table.string("eng", 5000).notNullable();
  });
};

exports.down = function () {
  return knex.schema.dropTable("thirukural");
};
