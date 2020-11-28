const assert = require('assert')
const api = require('./../api')
let app = {}

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inh1eGFkYXNpbHZhIiwiaWQiOjEsImlhdCI6MTYwNjQzNDUxMn0.W6aHekxgtKEcuzHVa1NOmsN5cgyUH-xUIoUeSDFvTGo'

const headers = {
  Authorization: TOKEN
}

const MOCK_HEROI_CADASTRAR = {
  nome: 'Chapolin Colorado',
  poder: 'Marreta Bionica'
}
const MOCK_HEROI_INICIAL = {
  nome: 'Gavião Negro',
  poder: 'A Mira'
}
let MOCK_ID = ''
describe('Suite de testes da API Herois', function () {
  this.beforeAll(async () => {
    app = await api
    const result = await app.inject({
      method: 'POST',
      url: '/herois',
      headers,
      payload: JSON.stringify(MOCK_HEROI_INICIAL)
    })
    const dados = JSON.parse(result.payload)
    MOCK_ID = dados._id
  })
  it('listar /herois', async () => {
    const result = await app.inject({
      method: 'GET',
      headers,
      url: '/herois?skip=0&limit=10'
    })

    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode

    assert.strictEqual(statusCode, 200),
    assert.ok(Array.isArray(dados))
  })
  it('listar /herois - deve retornar somente 3 registros', async () => {
    const TAMANHO_LIMITE = 3
    const result = await app.inject({
      method: 'GET',
      headers,
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
    })

    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode
    assert.strictEqual(statusCode, 200)
    assert.ok(dados.length === TAMANHO_LIMITE)
  })  
  it('listar /herois - deve retornar um erro com limit incorreto', async () => {
    const TAMANHO_LIMITE = 'AEE'
    const result = await app.inject({
      method: 'GET',
      headers,
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
    })

    const errorResult = {
      "statusCode": 400,
      "error": "Bad Request",
      "message": "\"limit\" must be a number",
      "validation": {
        "source": "query",
        "keys": ["limit"]
      }
    }

    assert.strictEqual(result.statusCode, 400)
    assert.strictEqual(result.payload, JSON.stringify(errorResult))
  })
  it('listar /herois - deve filtrar um item', async () => {
    const NAME = MOCK_HEROI_INICIAL.nome
    const result = await app.inject({
      method: 'GET',
      headers,
      url: `/herois?skip=0&limit=1000&nome=${NAME}`
    })

    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode
    assert.strictEqual(statusCode, 200)
    assert.strictEqual(dados[0].nome, NAME)
  })
  it('cadastrar POST - /herois', async () => {

    const result = await app.inject({
      method: 'POST',
      url: `/herois`,
      headers,
      payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
    })

    const statusCode = result.statusCode
    const { message, _id } = JSON.parse(result.payload)
    assert.ok(statusCode === 200)
    assert.notStrictEqual(_id, undefined)
    assert.strictEqual(message, "Heroi cadastrado com sucesso")
  })
  it('atualizar PATCH - /herois/:id', async () => {
    const _id = MOCK_ID
    const expected = {
      poder: 'Super Mira'
    }

    const result = await app.inject({
      method: 'PATCH',
      url: `/herois/${_id}`,
      headers,
      payload: JSON.stringify(expected)
    })

    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)

    assert.ok(statusCode === 200)
    assert.strictEqual(dados.message, 'Heroi atualizado com sucesso')
  })
  it('atualizar PATCH - /herois/:id - não deve atualizar com ID incorreto!', async () => {
    const _id = '5fadd0e0476b48eb2ac4f2d0'

    const result = await app.inject({
      method: 'PATCH',
      url: `/herois/${_id}`,
      headers,
      payload: JSON.stringify({ poder: 'Super Mira' })
    })

    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)
    const expected = {
      error: 'Precondition Failed',
      message: 'Id Não encontrado no banco!',
      statusCode: 412
    }

    assert.ok(statusCode === 412)
    assert.deepStrictEqual(dados, expected)
  })
  it('remover DELETE - /herois/:id', async () => {
    const _id = MOCK_ID
    const result = await app.inject({
      method: 'DELETE',
      headers,
      url: `/herois/${_id}`
    })
    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)

    assert.ok(statusCode === 200)
    assert.strictEqual(dados.message, 'Heroi Removido com sucesso!')
  })
  it('remover DELETE - /herois/:id - não deve remover', async () => {
    const _id = '5fadd0e0476b48eb2ac4f2d0'
    const result = await app.inject({
      method: 'DELETE',
      headers,
      url: `/herois/${_id}`
    })
    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)
    const expected = {
      error: 'Precondition Failed',
      message: 'Id Não encontrado no banco!',
      statusCode: 412
    }

    assert.ok(statusCode === 412)
    assert.deepStrictEqual(dados, expected)
  })
  it('remover DELETE - /herois/:id - não deve remover com Id invalido', async () => {
    const _id = 'ID_INVALIDO'
    const result = await app.inject({
      method: 'DELETE',
      headers,
      url: `/herois/${_id}`
    })
    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)
    const expected = {
      error: 'Internal Server Error',
      message: 'An internal server error occurred',
      statusCode: 500
    }

    assert.ok(statusCode === 500)
    assert.deepStrictEqual(dados, expected)
  })
})