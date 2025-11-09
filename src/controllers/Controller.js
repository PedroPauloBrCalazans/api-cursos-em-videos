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

  async getPorId(req, res) {
    const { id } = req.params;
    try {
      const registroEncontrado =
        await this.entidadeService.pegarUmRegistroPorId(Number(id));
      return res.status(200).json(registroEncontrado);
    } catch (error) {
      //erro
    }
  }

  async cadastrarRegistro(req, res) {
    const dadosRequest = req.body;
    try {
      const novoRegistro = await this.entidadeService.criarRegistro(
        dadosRequest
      );
      return res.status(200).json(novoRegistro);
    } catch (error) {
      //erro
    }
  }

  async atualizarRegistro(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try {
      const isUpdated = await this.entidadeService.atualizaRegistro(
        dadosAtualizados,
        Number(id)
      );

      if (!isUpdated) {
        return res
          .status(400)
          .json({ mensagem: "Registro não foi atualizado." });
      }
      return res.status(200).json({ mensagem: "Atualizado com sucesso" });
    } catch (error) {}
  }

  async excluirRegistros(req, res) {
    const { id } = req.params;
    try {
      await this.entidadeService.excluirRegistro(Number(id));
      return res
        .status(200)
        .json({ mensagem: `id ${id} deletado com sucesso.` });
    } catch (error) {
      //erro
    }
  }
}

module.exports = Controller;
