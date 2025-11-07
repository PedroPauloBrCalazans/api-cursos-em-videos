const express = require("express");
const PessoaController = require("../controllers/PessoaController.js");

const router = express.Router();

router.get("/pessoas", PessoaController.getAll);

module.exports = router;
