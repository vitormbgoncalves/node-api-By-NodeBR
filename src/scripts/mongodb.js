// listar containers rodando no docker
docker ps

// entrar no shell do Mongo dentro do docker
docker exec -it 35c51fb8b981 mongo -u vitor -p minhasenhasecreta --authenticationDatabase herois

// litar databases
show dbs

// acessar uma determinada database
use herois

// mostar collections
show collections

// insert
db.herois.insert({
  nome:'Flash',
  poder:'Velocidade',
  dataNascimento:'1998-01-01'
})

// read
db.herois.find()
db.herois.find({nome: 'Flash'})
db.herois.find().pretty()
db.herois.findOne()
db.herois.find().limit(1000).sort({ nome: -1} )
db.herois.find({}, { poder: 1, _id:0 })

// update
db.herois.update({ _id: ObjectId("5fadb60fa601f5b2b94df418") }, 
  { $set: { nome:'Mulher maravilha'}})

// delete
db.herois.remove({nome:'Mulher maravilha'})