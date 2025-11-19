const Controller = require("./Controller.js");
const MatriculaService = require("../services/MatriculaService.js");

const matriculaService = new MatriculaService();

class MatriculaController extends Controller {
  constructor() {
    super(matriculaService);
  }

  async pegaMatriculasPorEstudante(req, res) {
    const { estudante_id } = req.params;

    try {
      const listaMatriculasPorEstudante =
        await matriculaService.pegarContaRegistros({
          estudante_id: Number(estudante_id),
          status: "matriculado",
        });
      return res.status(200).json(listaMatriculasPorEstudante);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = MatriculaController;
