const compression = require("compression");
const faker = require("faker");
const {normalize, schema} = require("normalizr");

/**
 * Clase que contiene todas las utilidades.
 * No es necesario instanciarla, todos sus metodos son estáticos
 * @author Gonzalo Ramos
 */
class Utils {
  /**
   * Función middleware que evalua si hacer o no compression
   * @param {*} req Requiere que se le pase por params /?compress=true para que comprima los datos
   * @param {*} res No hace nada de respuesta
   * @param {*} next Pasa la ejecución al handler.
   */
  static doCompression(req, res, next) {
    const validate = req.params.compress || false;

    if (validate) {
      compression();
      next();
    }
    next();
  }

  /**
   * Función que crea data falsa de un producto. Utiliza faker como dependencia
   * @param {string} locale Recibe la localidad con la que crear la data. Por default es "es" (Español).
   * @returns Objeto con @title Titulo de producto. @price Precio de producto. @imageURL Imagen avatar del producto.
   */
  static createProductItem(locale = "es") {
    faker.locale = locale;
    return {
      title: faker.commerce.productName(),
      price: faker.commerce.price(100, 5000, 2, "$"),
      imageURL: faker.image.avatar(),
    };
  }

  /**
   * Funcion que normaliza la información y disminuir el peso en bytes.
   * Usa como dependencia normalizr.
   * @param {Object} data
   * @returns La información normalizada.
   */

  static getNormalizedData(data) {
    const dataJson = JSON.stringify(data);
    const dataParsed = JSON.parse(dataJson);

    const schemaAuthor = new schema.Entity("author", {}, {idAttribute: "id"});

    const schemaMensaje = new schema.Entity("post", {author: schemaAuthor});

    const schemaMensajes = new schema.Entity(
      "posts",
      {mensajes: [schemaMensaje]},
      {idAttribute: "mensajes"}
    );

    const normalizeData = normalize(
      {id: "mensajes", mensajes: dataParsed},
      schemaMensajes
    );
    return normalizeData;
  }

  /**
   * Función simple que retorna un número aleatorio.
   * @param {Number} min Número mínimo
   * @param {Number} max Número máximo
   * @returns Un número aleatorio entre los dos número extremos
   */
  static getRandomArbitrary(min = 0, max = 100000) {
    return Math.random() * (max - min) + min;
  }

  /**
   * Función que guarda en un objeto los números generados aleatoriamente.
   * Si se repite algun número no genera una nueva propiedad sino que suma 1 a si misma.
   * @param {Number} quantity Recibe la cantidad máxima de números.
   * @returns Objeto con número aleatorios generados
   */
  static randomNumbers(quantity) {
    let collection = {};
    if (Number(cant) > 0) {
      for (let i = 0; i < cant; i++) {
        let random = Math.round(this.getRandomArbitrary(0, 10000));

        if (collection.hasOwnProperty(random)) {
          collection[random] = collection[random] + 1;
        } else {
          collection[random] = 0;
        }
      }
    }

    return collection;
  }

  /**
   * Mira las keys de un objeto. Si no tiene devuelve true.
   * @param {Object} obj
   * @returns Boolean
   */
  static isEmpty(obj) {
    return Object.keys(obj).length === 0 || false;
  }
}

module.exports = Utils;
