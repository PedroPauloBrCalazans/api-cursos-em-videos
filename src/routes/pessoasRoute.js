const express = require("express");
const PessoaController = require("../controllers/PessoaController.js");
const MatriculaController = require("../controllers/MatriculaController.js");

const pessoaController = new PessoaController();
const matriculaController = new MatriculaController();

const router = express.Router();

router.get("/pessoas", (req, res) => pessoaController.getAll(req, res));
router.get("/pessoas/:id", (req, res) => pessoaController.getPorId(req, res));
router.post("/pessoas", (req, res) =>
  pessoaController.cadastrarRegistro(req, res)
);
router.put("/pessoas/:id", (req, res) =>
  pessoaController.atualizarRegistro(req, res)
);
router.delete("/pessoas/:id", (req, res) =>
  pessoaController.excluirRegistros(req, res)
);
router.get("/pessoas/:estudanteId/matriculas", (req, res) =>
  pessoaController.pegaMatricula(req, res)
);
router.post("/pessoas/:estudanteId/matriculas", (req, res) =>
  matriculaController.cadastrarRegistro(req, res)
);

module.exports = router;
