const Utils = require("./Utils");

/**
 * Clase que extiende la principal de utilidades.
 * Contiene los métodos principales para usuarios.
 */

class UserUtils extends Utils {
  /**
   * Función simple que agrega algunos datos útiles para la base de datos como cuando fue creado el usuario.
   * @param {Object} userObj Objeto con la infromacón del usuario a ser guardad a la DB
   * @returns {Object}
   */
  static formatUserForDB(userObj) {
    const newUser = {
      email: userObj.email,
      password: userObj.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return newUser;
  }
}

module.exports = UserUtils;
