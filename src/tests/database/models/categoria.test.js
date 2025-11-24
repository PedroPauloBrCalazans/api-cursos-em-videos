const { describe, expect, it } = require("@jest/globals");
const Categoria = require("../../../services/CategoriaService");

describe("Testando o modelo de categorias", () => {
  const objCategoria = {
    titulo: ".Net Core + Asp Net Core",
  };

  it("Deve instanciar uma nova categoria", () => {
    const categoria = new Categoria(objCategoria);

    expect(categoria).toEqual(expect.objectContaining(objCategoria));
  });
});
