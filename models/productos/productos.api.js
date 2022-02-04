const configMariaDB = require("../../database/configMariaDB");
class Productos {
  constructor(tableName) {
    this.knex = require("knex")(configMariaDB);
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
          .catch((err) => console.log(err));
      }
    });
  }

  async getAll() {
    try {
      const result = await this.knex.from(this.tableName).select("*");
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getById(id) {
    try {
      const result = await this.knex.from(this.tableName).select("*").where("id", id);
      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }

  async save(producto) {
    try {
      await this.knex(this.tableName).insert(producto);
    } catch (error) {
      console.log(error.message);
    }
  }

  async updateProducto(id, producto) {
    try {
      await this.knex(this.tableName).where("id", id).update(producto);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async deleteProducto(id) {
    try {
      await this.knex(this.tableName).where("id", id).del();
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}

module.exports = Productos;
