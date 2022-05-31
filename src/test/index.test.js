//Tests witch mocha
const request = require("supertest")("http://localhost:3000");
const expect = require("chai").expect;
const axios = require("axios");
const assert = require("assert");

//Productos controller tests y con assert

describe("Test en productos controller", () => {
  describe("Test en metodos get", () => {
    it("Debe retornar  un array de productos", (done) => {
      axios
        .get("http://localhost:3000/api/productos")
        .then((res) => {
          assert.equal(res.status, 200);
          assert.equal(Array.isArray(res.data), true);
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    /*---------------------------------------------------------------------------------------------------------------------*/

    it("Debe retornar un array de productos con la estructura de producto", (done) => {
      axios
        .get("http://localhost:3000/api/productos")
        .then((res) => {
          assert.equal(res.status, 200);
          Object.keys(res.data[0]).forEach((key) => {
            assert.notEqual(res.data[0][key], undefined);
          });
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    /*---------------------------------------------------------------------------------------------------------------------*/

    it("Debe retornar un producto", (done) => {
      axios
        .get("http://localhost:3000/api/productos/6293091fbe1223b05f9e85ad")
        .then((res) => {
          assert.equal(res.status, 200);
          assert.equal(res.data._id, "6293091fbe1223b05f9e85ad");
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    /*---------------------------------------------------------------------------------------------------------------------*/

    it("Debe retornar un error status code 404 si el id no existe", (done) => {
      const id = "12345";
      axios
        .get(`http://localhost:3000/api/productos/${id}`)
        .then((res) => {})
        .catch((err) => {
          assert.equal(err.response.status, 404);
          done();
        });
    });
  });

  /*---------------------------------------------------------------------------------------------------------------------*/

  //Incorporo chai y supertest para testear el post
  describe("Test en metodos post", () => {
    it("Debe crear un producto", (done) => {
      const producto = {
        title: "Producto test",
        price: 100,
        image: "https://via.placeholder.com/150",
      };

      request
        .post("/api/productos/save")
        .send(producto)
        .then((res) => {
          expect(res.status).to.equal(201);
          expect(res.body.title).to.equal(producto.title);
          expect(res.body.price).to.equal(producto.price);
          expect(res.body.image).to.equal(producto.image);
          expect(res.body._id).to.not.equal(undefined);
          done();
        })
        .catch((err) => console.error(err));
    });
    /*---------------------------------------------------------------------------------------------------------------------*/
    it("Debe retornar un error status code 400 si el producto no tiene title", (done) => {
      const producto = {
        price: 100,
        image: "https://via.placeholder.com/150",
      };
      request
        .post("/api/productos/save")
        .send(producto)
        .then((res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    /*---------------------------------------------------------------------------------------------------------------------*/

    it("Debe retornar un error status code 400 si el producto no tiene price", (done) => {
      const producto = {
        title: "Producto test",
        image: "https://via.placeholder.com/150",
      };

      request
        .post("/api/productos/save")
        .send(producto)
        .then((res) => {
          expect(res.status).to.equal(400);
          done();
        })
        .catch((err) => console.error(err));
    });
    /*---------------------------------------------------------------------------------------------------------------------*/

    it("Debe retornar un error status code 400 si el producto no tiene image", (done) => {
      const producto = {
        title: "Producto test",
        price: 100,
      };

      request
        .post("/api/productos/save")
        .send(producto)
        .then((res) => {
          expect(res.status).to.equal(400);
          done();
        })
        .catch((err) => console.error(err));
    });
  });
  /*---------------------------------------------------------------------------------------------------------------------*/

  //Incorporo chai y supertest para testear el put
  describe("Test en metodos put", () => {
    //Globales para tests en put
    const producto = {
      title: "Producto test",
      price: 100,
      image: "https://via.placeholder.com/150",
    };
    const productoUpdate = {
      title: "Producto test update",
      price: 200,
      image: "https://via.placeholder.com/150",
    };

    /*---------------------------------------------------------------------------------------------------------------------*/

    it("Debe actualizar un producto", (done) => {
      request
        .post("/api/productos/save")
        .send(producto)
        .then((res) => {
          const id = res.body._id;
          request
            .put(`/api/productos/update/${id}`)
            .send(productoUpdate)
            .then((res) => {
              expect(res.status).to.equal(200);
              expect(res.body.title).to.equal(productoUpdate.title);
              expect(res.body.price).to.equal(productoUpdate.price);
              expect(res.body.image).to.equal(productoUpdate.image);
              done();
            })
            .catch((err) => {
              console.error(err);
            });
        });
    });

    after((done) => {
      //Borrar productos con title: Producto test
      axios
        .delete(
          `http://localhost:3000/api/productos/deleteByFilter?title=${producto.title}`
        )
        .then(() => {});
      axios
        .delete(
          `http://localhost:3000/api/productos/deleteByFilter?title=${productoUpdate.title}`
        )
        .then(() => {});
      done();
    });
  });

  /*---------------------------------------------------------------------------------------------------------------------*/

  describe("Test en metodos delete", () => {
    const producto = {
      title: "Producto test",
      price: 100,
      image: "https://via.placeholder.com/150",
    };

    /*---------------------------------------------------------------------------------------------------------------------*/

    it("Debe eliminar un producto", (done) => {
      axios
        .post("http://localhost:3000/api/productos/save", producto)
        .then((res) => {
          const id = res.data._id;
          axios
            .delete(`http://localhost:3000/api/productos/deleteById/${id}`)
            .then((res) => {
              assert.equal(res.status, 200);
              done();
            })
            .catch((err) => {
              console.log(err.message);
            });
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  });
});
