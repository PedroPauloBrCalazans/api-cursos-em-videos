const Services = require("./Services.js");

class PessoaService extends Services {
  constructor() {
    super("Pessoa");
  }

  async pegaMatriculasPorEstudante(id) {
    const estudante = await super.pegarUmRegistroPorId(id);
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
  }
}

module.exports = PessoaService;
