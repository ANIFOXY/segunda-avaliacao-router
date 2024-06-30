const { describe, expect, it, beforeAll, afterAll } = require('@jest/globals');
const ServicoUsuario = require("../../src/controller/user");
const conexao = require("../../src/database/db");

describe('Testes do primeiro exercício', () => {
   const user = new ServicoUsuario()
   beforeAll(async () => {
      user = new ServicoUsuario();
      this.transaction = await conexao.transaction();
   });
   afterAll(() => {
      this.transaction.rollback()
   });

   it('Should add a person', async () => {
      const mockPessoa = { nome: "teste1", email: "testeadicionar", senha: "teste" }

      const { dataValues } = await user.Adicionar(mockPessoa, this.transaction)

      expect(dataValues.nome).toBe(mockPessoa.nome);
      expect(dataValues.email).toBe(mockPessoa.email);
      expect(dataValues.senha).toBe(mockPessoa.senha);
   })


   it('Should update a person', async () => {
      const mockPessoa = { nome: "teste1", email: "alterar", senha: "teste" }
      const mockPessoaAlterar = { nome: "teste2", email: "alterar23", senha: "teste2" }

      const adicionado = await user
         .Adicionar(mockPessoa, this.transaction)

      const alterado = await user
         .Alterar(adicionado.dataValues.id, mockPessoaAlterar, this.transaction)

      expect(alterado[0]).toBe(1);
   })


   it('Should delete a person', async () => {
      const mockPessoa = { nome: "teste1", email: "alterar", senha: "teste" }

      const adicionado = await user
         .Adicionar(mockPessoa, this.transaction)
      const resposta = await user
         .Deletar(adicionado.dataValues.id, this.transaction)

      expect(resposta).toBe(1);
   })


})