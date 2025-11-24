//a service é uma camada intermediária, e fica responsavel por pegar o modelo,
//  aplicar regras e fazer a interface com a controller, aqui vou trabalhar com qualque modelo
const dataSource = require("../database/models");

class Services {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async pegaTodosOsRegistros(where = {}) {
    return dataSource[this.model].findAll({ where: { ...where } });
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

  async pegarContaRegistros(options) {
    return dataSource[this.model].findAndCountAll({
      ...options,
    });
  }

  async criarRegistro(dadosRequest) {
    return dataSource[this.model].create(dadosRequest);
  }

  async atualizaRegistro(dadosAtualizados, where, transacao = null) {
    const listaRegistrosAtualizados = await dataSource[this.model].update(
      dadosAtualizados,
      {
        where: { ...where },
        transaction: transacao,
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
