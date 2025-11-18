const Services = require("./Services.js");

class PessoaService extends Services {
  constructor() {
    super("Pessoa");
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
}

module.exports = PessoaService;
