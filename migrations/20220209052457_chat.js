/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("chat", (table) => {
    table.increments("id");
    table.string("anio");
    table.string("email");
    table.integer("hora");
    table.string("mensaje");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("chat");
};
