import configDataBase from "../../config/configDataBase";
import admin from "firebase-admin";

import {v4 as uuidv4} from "uuid";

admin.initializeApp({
  credential: admin.credential.cert(configDataBase.fireBase),
});
const db = admin.firestore();

class FireBaseContainter {
  constructor(collection) {
    this.collection = db.collection(collection);
  }

  async getById(id) {
    try {
      const doc = await this.collection.doc(id).get();
      if (!doc.exists) {
        throw new Error(`Error al listar por id: no se encontró`);
      } else {
        const data = doc.data();
        return {...data, id};
      }
    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`);
    }
  }

  async getAll() {
    try {
      const result = [];
      const allDocsReference = this.collection.get();
      allDocsReference.forEach((doc) => {
        result.push({id: doc.id, ...doc.data()});
      });
    } catch (error) {
      throw new Error(`Error al listar: ${error}`);
    }
  }

  async save(id = uuidv4(), item) {
    try {
      const itemComplete = {
        id,
        ...item,
      };
      const success = await this.collection.add(itemComplete);
      return {...itemComplete, idDoc: success.id};
    } catch (error) {
      throw new Error(`Error al guardar el item: ${error}`);
    }
  }

  async update(id, item) {
    try {
      const writeTime = await this.collection.doc(id).set(item);
      return {...item, writeTime};
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  }
  async delete(id) {
    try {
      const document = await this.collection.doc(id);
      const timeDeleted = await document.delete();
      return {...document, timeDeleted};
    } catch (error) {
      throw new Error(`Error al borrar el item: ${error}`);
    }
  }
}

export default FireBaseContainter;
