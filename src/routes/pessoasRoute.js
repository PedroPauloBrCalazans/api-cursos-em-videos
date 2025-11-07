const { Route } = require("express");
const PessoaController = require("../controllers/PessoaController.js");

const router = Route();

router.get("/pessoas", PessoaController.getAll);

module.exports = router;
