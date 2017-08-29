let should = require('chai').should()
let expect = require('chai').expect
let supertest = require('supertest')
let api = supertest('http://localhost:3000')

describe('GET /candies', function () {
  it('should return a 200 response', function (done) {
    api.get('/candies')
      .set('Accept', 'application/json')
      .expect(200, done)
  })
  it('should return an array', function (done) {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end(function (error, response)  {
        expect(response.body).to.be.an('array')
        done()
      })
  })
  it('should return an array of objects that have a field called "name"', function (done) {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end(function (error, response) {
        expect(response.body[0]).to.have.property('name')
        done()
      })
  })
})


describe('POST /candies', function () {

  let previousLength

  before(function (done) {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end(function (error, response) {
        previousLength = response.body.length
        done()
      })
  })
  before(function (done) {
    api.post('/candies')
      .set('Accept', 'application/json')
      .send({
        'id': previousLength + 1,
        'name': 'Lollipop',
        'color': 'Red'
      })
      .end(done)
  })
  it('should add a candy object to the candies collection and return it', function (done) {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end(function (error, response) {
        expect(response.body.length).to.equal(previousLength + 1)
        done()
      })
  })
})

describe('GET /candies/:id', function () {
  let id
  before(function (done) {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end(function (error, response) {
        id = response.body[0].id
        done()
      })
  })
  it('retrieves a candy by it\'s id with the correct fields', function (done) {
    api.get(`/candies/${id}`)
      .set('Accept', 'application/json')
      .end(function (error, response) {
        expect(response.body.id).to.equal(id)
        expect(response.body.name).to.be.a('string')
        expect(response.body.color).to.be.a('string')
        done()
      })
  })
})

describe('DELETE /candies/:id', function () {

  let previousLength
  let idToDelete

  before(function (done) {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end(function (error, response) {
        console.log(response.body)
        previousLength = response.body.length
        idToDelete = response.body[0].id
        done()
      })
  })
  before(function(done) {
    api.delete(`/candies/${idToDelete}`)
      .set('Accept', 'application/json')
      .end(function (error, response) {
        console.log(response.status)
        done()
      })
  })
  it('deletes a candy by id', function (done) {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end(function (error, response) {
        console.log(response.body)
        expect(response.body.length).to.equal(previousLength - 1)
        expect(response.body.find((candy) => candy.id == idToDelete)).to.equal(undefined)
        done()
      })
  })
})

describe('PUT /candies/:id', function () {

  let candyToUpdate

  before(function (done) {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end(function (error, response) {
        candyToUpdate = response.body[0]
        done()
      })
  })
  before(function (done) {
    api.put(`/candies/${candyToUpdate.id}/edit`)
      .set('Accept', 'application/json')
      .send({
        'id': candyToUpdate.id,
        'name': 'Candy Cane',
        'color': candyToUpdate.color
      })
      .end(function (error, response) {
        done()
      })
  })
  it('can update a candy by id', function (done) {
    api.get(`/candies/${candyToUpdate.id}`)
      .set('Accept', 'application/json')
      .end(function (error, response) {
        expect(response.body.name).to.equal('Candy Cane')
        done()
      })
  })

})
