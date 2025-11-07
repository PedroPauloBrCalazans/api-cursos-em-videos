const dataBase = require("../models");

class PessoaController {
  static async getAll(req, res) {
    try {
      const listaPessoas = await dataBase.Pessoa.findAll();
      return res.status(200).json(listaPessoas);
    } catch (error) {
      //tratamentos de erros
    }
  }
}

module.exports = PessoaController;
