const { beforeAll, afterAll, describe, it, expect } = require("@jest/globals");
const app = require("../../app.js");
const request = require("supertest");
const { sequelize } = require("../../database/models");

describe("GET /categorias", () => {
  let server;

  // // Inicia o servidor antes de todos os testes
  // beforeAll(() => {
  //   const port = 7474;
  //   server = app.listen(port);
  // });

  // // Fecha o servidor após todos os testes
  // afterAll(() => {
  //   server.close();
  // });

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  // Fecha a conexão após todos os testes
  afterAll(async () => {
    await sequelize.close();
  });

  it("Deve retornar uma lista de categorias", async () => {
    await request(app)
      .get("/categorias")
      .set("Accept", "application/json") //setando informação no header
      .expect("content-type", /json/) //verificar se o response retornou um json
      .expect(200);
  });
});
