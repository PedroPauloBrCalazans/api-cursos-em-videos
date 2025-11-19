const Sequelize = require("sequelize");

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
          where: {
            estudante_id: Number(estudante_id),
            status: "matriculado",
            limit: 2,
            order: [["id", "ASC"]],
          },
        });
      return res.status(200).json(listaMatriculasPorEstudante);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async pegaCursosLotados(req, res) {
    const lotacaoCurso = 2; //se 2 pessoas se inscreveu em determinado curso, já é considerado lotado..

    try {
      const cursosLotados = await matriculaService.pegarContaRegistros({
        where: {
          status: "matriculado",
        },
        attributes: ["curso_id"], //nome da coluna que queremos trabalhar.
        group: ["curso_id"], //passa a coluna pelo qual queremos agrupar nossos valores.
        having: Sequelize.literal(`count(curso_id) >= ${lotacaoCurso}`),
      });
      return res.status(200).json(cursosLotados.count);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = MatriculaController;
