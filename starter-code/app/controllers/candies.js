const express        = require('express'),
      bodyParser     = require('body-parser'), //parses information from POST
      methodOverride = require('method-override') //used to fake PUT and DELETE requests
      router         = express.Router()

let candies = [
  {id: 1, name: 'Toffee Bar',      color: 'Brown, Caramel'},
  {id: 2, name: 'Pez',             color: 'Green'},
  {id: 3, name: 'Pop Rocks',       color: 'Pink'},
  {id: 4, name: 'Sour Patch Kids', color: 'Blue'}
]

// http://127.0.0.1:3000/candies
router
  .route('/')
  .get((req, res) => { //GET all candies
    res.json(candies)
  })
  .post((req, res) => { //POST a new candy
    candies.push(req.body)
    res.json(req.body)
  })

// Show a Candy
router
  .route('/:id')
  .get((req,res) => { // GET one candy by id
    let candy = candies.find(element => element.id === parseInt(req.params.id))
    res.json(candy)
  })
  .delete((req, res) => { // DELETE one candy by id
    let candy = candies.find(candy => candy.id === parseInt(req.params.id))
    candies.splice(candies.indexOf(candy), 1)
    // candies = candies.filter(candy => candy.id !== parseInt(req.params.id))
    res.json({
      deleted : true,
      ...candy
    })
  })

router.put('/:id/edit', (req, res) => { // Update a Candy
  candies.find((candy, i) => {
    if (candy.id === parseInt(req.params.id)) {
      candies[i] = req.body
      res.format({ json: () => res.json(req.body) })
    }
  })
})

module.exports = router

// Other methods of selecting a single element from an array

//let candy = candies.filter(element => element.id === parseInt(req.params.id))[0]

//for(i in candies){
//   if(candies[i].id === parseInt(req.params.id)) {
//     candies[i] = req.body
//   }
// }
