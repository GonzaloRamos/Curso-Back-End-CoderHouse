class Factory {
  static generationInstance(canonicalName, tipo) {
    const name = require(`../dao/${tipo}/${canonicalName}`);
    return new name();
  }
}

module.exports = Factory;
