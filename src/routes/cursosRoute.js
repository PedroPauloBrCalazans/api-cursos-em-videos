const express = require("express");
const CursoController = require("../controllers/CursoController.js");

const cursoController = new CursoController();

const router = express.Router();

router.get("/cursos", (req, res) => cursoController.pegaCursos(req, res));
router.get("/cursos/:id", (req, res) => cursoController.getPorId(req, res));
router.post("/cursos", (req, res) =>
  cursoController.cadastrarRegistro(req, res)
);
router.put("/cursos/:id", (req, res) =>
  cursoController.atualizarRegistro(req, res)
);
router.delete("/cursos/:id", (req, res) =>
  cursoController.excluirRegistros(req, res)
);

module.exports = router;
