const Hapi = require('@hapi/hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const Postgres = require('./db/strategies/postgres/postgres')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const UserSchema = require('./db/strategies/postgres/schemas/userSchema')
const HeroRoutes = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')
const HapiSwagger = require('hapi-swagger')
const Vision = require('@hapi/vision')
const Inert = require('@hapi/inert')
const HapiJwt = require('hapi-auth-jwt2')
const JWT_SECRET = 'MEU_SEGREDO_123'

const app = new Hapi.Server({
  port: 5000
})

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]())
}

async function main() {
  const connection = MongoDB.connect()
  const context = new Context(new MongoDB(connection, HeroiSchema))

  const connectionPostgres = await Postgres.connect()
  const model = await Postgres.defineModel(connectionPostgres, UserSchema)
  const contextPostgres = new Context(new Postgres(connectionPostgres, model))
  
  const swaggerOptions = {
    info: {
      title: 'API Herois - #CursoNodeBR',
      version: 'v1.0'
    }
  }

  await app.register([
    HapiJwt,
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])

  app.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    options: {
      expiresIn: 20
    },
    validate: async (decoded, req) => {
      const [result] = await contextPostgres.read({
        username: decoded.username.toLowerCase()
      })
      if(!result) {
        return { isValid: false }
      }

      return { isValid: true }
    }
  })

  app.auth.default('jwt')

  app.route([
    ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
    ...mapRoutes(new AuthRoute(JWT_SECRET, contextPostgres), AuthRoute.methods()),
  ])

  await app.start()
  console.log('Servidor Rodando na porta', app.info.port)

  return app
}
module.exports = main()