const converteIds = require("../utils/conversorStringHelper.js");
class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async getAll(req, res) {
    try {
      const listaRegistro = await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaRegistro);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async getPorId(req, res) {
    const { id } = req.params;
    try {
      const registroEncontrado =
        await this.entidadeService.pegarUmRegistroPorId(Number(id));
      return res.status(200).json(registroEncontrado);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async pegaUm(req, res) {
    const { ...params } = req.params;
    const where = converteIds(params);
    try {
      const registroEncontrado = await this.entidadeService.pegaUmRegistro(
        where
      );
      return res.status(200).json(registroEncontrado);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async cadastrarRegistro(req, res) {
    const dadosRequest = req.body;
    try {
      const novoRegistro = await this.entidadeService.criarRegistro(
        dadosRequest
      );
      return res.status(200).json(novoRegistro);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async atualizarRegistro(req, res) {
    const { ...params } = req.params;
    const dadosAtualizados = req.body;

    const where = converteIds(params);
    try {
      const isUpdated = await this.entidadeService.atualizaRegistro(
        dadosAtualizados,
        where
      );

      if (!isUpdated) {
        return res
          .status(400)
          .json({ mensagem: "Registro não foi atualizado." });
      }
      return res.status(200).json({ mensagem: "Atualizado com sucesso" });
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async excluirRegistros(req, res) {
    const { id } = req.params;
    try {
      await this.entidadeService.excluirRegistro(Number(id));
      return res
        .status(200)
        .json({ mensagem: `id ${id} deletado com sucesso.` });
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = Controller;
