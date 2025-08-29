const express = require('express');
const routes = express.Router();


const usercontroller = require("./controllers/usercontroller");
const comandacontroller = require("./controllers/comandacontroller");
const itenscontroller = require("./controllers/itenscontroller");


// user controller
routes.post("/usuarios", usercontroller.createUser);
routes.get("/usuarios", usercontroller.getAllUsers);
routes.get("/usuarios/:id", usercontroller.getUserById);
routes.put("/usuarios/:id", usercontroller.updateUser);
routes.delete("/usuarios/:id", usercontroller.deleteUser);


// comanda controller
routes.post("/comandas", comandacontroller.createComanda);
routes.get("/comandas", comandacontroller.getAllComandas);
routes.get("/comandas/:id", comandacontroller.getComandaById);
routes.put("/comandas/:id", comandacontroller.updateComanda);
routes.delete("/comandas/:id", comandacontroller.deleteComanda);


// itens controller
routes.post("/comandas-itens", itenscontroller.createOrderItem);
routes.get("/comandas-itens", itenscontroller.getOrderItems);
routes.put("/comandas-itens/:id", itenscontroller.updateOrderItem);
routes.delete("/comandas-itens/:id", itenscontroller.deleteOrderItem);

module.exports = routes;
