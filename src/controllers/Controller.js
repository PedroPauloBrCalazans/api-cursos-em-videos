class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async getAll(req, res) {
    try {
      const listaRegistro = await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaRegistro);
    } catch (error) {
      //erro
    }
  }
}

module.exports = Controller;
