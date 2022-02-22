import configDataBase from "../../config/configDataBase.js";
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

  async getAllDataOrById(id) {
    try {
      if (id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
          throw new Error(`Error al listar por id: no se encontró`);
        } else {
          const data = doc.data();
          return {...data, id};
        }
      }
      const result = [];
      const allDocsReference = await this.collection.get();

      allDocsReference.forEach((doc) => {
        console.log(doc.data());
        result.push({id: doc.id, ...doc.data()});
      });
      return result;
    } catch (error) {
      throw new Error(`Error al obtener todos los datos: ${error}`);
    }
  }

  async createData(item) {
    try {
      const itemComplete = {
        timeStamp: Date.now(),
        ...item,
      };
      const success = await this.collection.add(itemComplete);
      return {...itemComplete, id: success.id};
    } catch (error) {
      throw new Error(`Error al guardar el item: ${error}`);
    }
  }

  async updateData(id, item) {
    try {
      const writeTime = await this.collection.doc(id).update(item);
      return {...item, writeTime};
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  }
  async deleteData(id) {
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
