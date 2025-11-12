const express = require("express");
const CategoriaController = require("../controllers/CategoriaController.js");

const categoriaController = new CategoriaController();

const router = express.Router();

router.get("/categorias", (req, res) => categoriaController.getAll(req, res));
router.get("/categorias/:id", (req, res) =>
  categoriaController.getPorId(req, res)
);
router.post("/categorias", (req, res) =>
  categoriaController.cadastrarRegistro(req, res)
);
router.put("/categorias/:id", (req, res) =>
  categoriaController.atualizarRegistro(req, res)
);
router.delete("/categorias/:id", (req, res) =>
  categoriaController.excluirRegistros(req, res)
);

module.exports = router;
