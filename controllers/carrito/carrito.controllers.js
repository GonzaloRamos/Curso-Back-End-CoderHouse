import {Carrito} from "../../models/carrito/carrito.api.js";
const carritoApi = new Carrito();

const createCarritoController = (req, res) => {
  const id = carritoApi.createCarrito();
  return res.status(200).json({message: `Se creo el carrito con id: ${id}`});
};

const deleteCarritoController = (req, res) => {
  const {id} = req.params;
  if (id) {
    const carrito = carritoApi.delete(id);
    if (carrito) {
      return res
        .status(200)
        .json({message: `Se elimino el carrito con id: ${id}`});
    }
    return res.status(400).json({error: "No se encontro el carrito"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

export {createCarritoController, deleteCarritoController};
