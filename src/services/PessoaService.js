const dataSource = require("../database/models");
const Services = require("./Services.js");

class PessoaService extends Services {
  constructor() {
    super("Pessoa");
    this.matriculaService = new Services("Matricula"); //acessando o modelo de matrícula.
  }

  async pegaMatriculasAtivasPorEstudante(id) {
    const estudante = await super.pegarUmRegistroPorId(id);
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
  }

  async pegaTodasAsMatriculasPorEstudante(id) {
    const estudante = await super.pegarUmRegistroPorId(id);
    const listaMatriculas = await estudante.getTodasAsMatriculas();
    return listaMatriculas;
  }

  async pegaPessoasEscopoTodos() {
    const listaPessoas = await super.pegaRegistrosPorEscopo("todosOsRegistros");
    return listaPessoas;
  }

  async cancelaPessoaMatriculas(estudanteId) {
    return dataSource.sequelize.transaction(async (transacao) => {
      await super.atualizaRegistro(
        { ativo: false },
        { id: estudanteId },
        transacao
      );
      await this.matriculaService.atualizaRegistro(
        { status: "cancelado" },
        { estudante_id: estudanteId },
        transacao
      );
    });
  }
}

module.exports = PessoaService;
