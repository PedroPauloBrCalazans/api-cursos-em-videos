//a service é uma camada intermediária, e fica responsavel por pegar o modelo,
//  aplicar regras e fazer a interface com a controller, aqui vou trabalhar com qualque modelo
const dataSource = require("../models");

class Services {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async pegaTodosOsRegistros() {
    return await dataSource[this.model].findAll();
  }
}

module.exports = Services;
