const { describe, expect, it, beforeAll, afterAll } = require("@jest/globals");
const CategoriaService = require("../../../services/CategoriaService");
const { sequelize, Categoria } = require("../../../database/models");

describe("Testando CRUD de categorias", () => {
  const service = new CategoriaService();

  const objCategoria = { titulo: ".Net Core + Asp Net Core" };

  let categoriaCriada;

  // Cria as tabelas antes de tudo
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  // Fecha a conexão após todos os testes
  afterAll(async () => {
    await sequelize.close();
  });

  it("Deve criar uma nova categoria", async () => {
    categoriaCriada = await service.criarRegistro(objCategoria);

    expect(categoriaCriada).toEqual(expect.objectContaining(objCategoria));
    expect(categoriaCriada.id).toBeDefined();
  });

  it("Deve buscar todas as categorias", async () => {
    const categorias = await service.pegaTodosOsRegistros();
    expect(categorias.length).toBeGreaterThan(0);
    expect(categorias[0]).toEqual(expect.objectContaining(objCategoria));
  });

  it("Deve buscar uma categoria por ID", async () => {
    const categoriaEncontrada = await service.pegarUmRegistroPorId(
      categoriaCriada.id
    );
    expect(categoriaEncontrada).toBeDefined();
    expect(categoriaEncontrada.titulo).toBe(objCategoria.titulo);
  });

  it("Deve atualizar uma categoria", async () => {
    const novosDados = { titulo: ".Net 7 + ASP.NET Core" };
    const atualizado = await service.atualizaRegistro(novosDados, {
      id: categoriaCriada.id,
    });
    expect(atualizado).toBe(true);

    const categoriaAtualizada = await service.pegarUmRegistroPorId(
      categoriaCriada.id
    );
    expect(categoriaAtualizada.titulo).toBe(novosDados.titulo);
  });

  it("Deve deletar uma categoria", async () => {
    await service.excluirRegistro(categoriaCriada.id);

    const categoriaExcluida = await service.pegarUmRegistroPorId(
      categoriaCriada.id
    );
    expect(categoriaExcluida).toBeNull();
  });
});
