const assert = require('assert')
const MongoDB = require('./../db/strategies/mongodb/mongodb')
const HeroiSchema =  require('./../db/strategies/mongodb/schemas/heroisSchema')
const Context = require('./../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
  nome: 'Mulher Maravilha',
  poder: 'Laço'
}

const MOCK_HEROI_ATUALIZAR = {
  nome: `Patolino-${Date.now()}`,
  poder: 'chatice'
}
let MOCK_HEROI_ID = ''

let context = {}
describe('MongoDB Suite de testes', function () {
  this.beforeAll(async () => {
    const connection = MongoDB.connect()
    context = new Context(new MongoDB(connection, HeroiSchema))

    await context.create(MOCK_HEROI_ATUALIZAR)
    const result = await context.create(MOCK_HEROI_ATUALIZAR)
    MOCK_HEROI_ID = result._id
  })
  it('verificar conexão', async () => {
    const result = await context.isConnected()
    const expexted = 'Conectado'
    assert.deepStrictEqual(result, expexted)
  })
  it('cadastrar', async () => {
    const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
    
    assert.deepStrictEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
  })
  it('listar', async () => {
    const [{nome , poder}] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
    const result = {
      nome, poder
    }
    assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR)
  })
  it('atualizar', async () => {
    const result = await context.update(MOCK_HEROI_ID, {
      nome: 'Pernalonga'
    })
    assert.deepStrictEqual(result.nModified, 1)
  })
  it('remover', async () => {
    const result = await context.delete(MOCK_HEROI_ID)
    assert.deepStrictEqual(result.n, 1)
  })

})
