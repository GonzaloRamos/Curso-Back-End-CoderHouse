class Database {
  constructor(config, tableName) {
    this.knex = require("knex")(config);
    this.tableName = tableName;
    this.open();
  }

  open() {
    this.knex.schema.hasTable(this.tableName).then((exists) => {
      if (!exists) {
        this.knex.schema
          .createTable(this.tableName, (table) => {
            table.increments("id");
            table.string("title");
            table.integer("price");
            table.string("imageURL");
          })
          .then(() => {
            console.log("Tabla creada");
          })
          .catch((err) => console.log(err))
          .finally(() => {
            this.knex.destroy();
          });
      }
    });
  }

  getAll() {
    this.knex
      .from(this.tableName)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        this.knex.destroy();
      });
  }

  getById(id) {
    if (id) {
      this.knex
        .from(this.tableName)
        .where("id", id)
        .then((data) => {
          return data;
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => {
          this.knex.destroy();
        });
    }
    return null;
  }

  save(producto) {
    this.knex
      .from(this.tableName)
      .insert(producto)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        this.knex.destroy();
      });
  }

  updateProducto(id, producto) {
    if (id) {
      this.knex
        .from(this.tableName)
        .where("id", id)
        .update(producto)
        .then((data) => {
          return data;
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => {
          this.knex.destroy();
        });
    }
    return null;
  }

  deleteProducto(id) {
    if (id) {
      this.knex
        .from(this.tableName)
        .where("id", id)
        .del()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => {
          this.knex.destroy();
        });
    }
    return null;
  }
}

module.exports = Database;
