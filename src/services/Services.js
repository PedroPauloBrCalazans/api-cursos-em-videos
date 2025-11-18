//a service é uma camada intermediária, e fica responsavel por pegar o modelo,
//  aplicar regras e fazer a interface com a controller, aqui vou trabalhar com qualque modelo
const dataSource = require("../database/models");

class Services {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async pegaTodosOsRegistros() {
    return dataSource[this.model].findAll();
  }

  async pegaRegistrosPorEscopo(escopo) {
    return dataSource[this.model].scope(escopo).findAll();
  }

  async pegarUmRegistroPorId(id) {
    return dataSource[this.model].findByPk(id);
  }

  async pegaUmRegistro(where) {
    return dataSource[this.model].findOne({ where: { ...where } });
  }

  async criarRegistro(dadosRequest) {
    return dataSource[this.model].create(dadosRequest);
  }

  async atualizaRegistro(dadosAtualizados, id) {
    const listaRegistrosAtualizados = dataSource[this.model].update(
      dadosAtualizados,
      {
        where: { id: id },
      }
    );
    if (listaRegistrosAtualizados[0] === 0) {
      return false;
    }
    return true;
  }

  async excluirRegistro(id) {
    return dataSource[this.model].destroy({ where: { id: id } });
  }
}

module.exports = Services;
