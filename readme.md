# Testing Node with Mocha/Chai

## Learning Objectives
- Describe the importance of testing your code programmatically
- Use describe and assertion functions to do basic testing

## Framing

We've now created a number of applications.  All these apps cover a single topic, so most of the time, they are quite small.  But when you create a larger application, the codebase will become bigger and more complex every time you add some features. At some point, adding code in file A will break features in file B, and to avoid these "side-effects" or at least recognize immediately when they happen, we need to write tests our app and run them on each change. In a production-level application, providing a high level of [test coverage](http://www.softwaretestingclass.com/test-coverage-in-software-testing/) for an application is usually required in order to guarantee that code is bug-free and functions as intended.

## Types of Testing

See: [Types of Software Testing](http://www.softwaretestinghelp.com/types-of-software-testing/)

* How tests are executed:
  - __Manual__ - user runs test via the UI
  - __Automated__ - test scripts are executed that call into the code and compare results to expected values
* Granularity:
  - __Unit__ - focuses on testing individual "units" of code, usually individual components, functions or methods
  - __Integration__ - set of components that are collaborating (interacting) to perform a task
  - __End-to-end (E2E)__ - complete application running in an environment that mimics a real-world production environment
* Purpose:
  - __Functional__
     * __Positive testing__ - does it work when it is supposed to work.
     * __Negative testing__ - does it fail when it is supposed to fail.
  - __Regression__ - Did we break anything?
  - __Smoke__ - Did the build work?
  - __Performance / Load__ - How does the software behave under a heavy load?
     * Lots of users / traffic
     * Large data sets
  - __Usability__ - How intuitive (easy to use) is the software?
  - __Security__ - How secure is the application?
  - __Compatibility__ - How well does the software work with various hardware, O.S., network environments?
  - __Recovery__ - How well does the system respond to hardware or software failures? Is it fault-tolerant?
  - __User Acceptance Testing (UAT)__ - Does the software do what the customers want it to do?
     * Actual software users test the software to make sure it can handle required tasks in real-world scenarios, according to specifications.


### TDD and BDD

#### TDD: Test-driven development

A development methodology of writing the tests first, then writing the code to make those tests pass. Thus the process is:

1. Define a test set for the unit
2. Implement the unit
3. Verify that the implementation of the unit makes the tests succeed
4. Refactor
5. Repeat

#### BDD: Behavior-driven development

A development methodology that was derived from `TDD` and [`DDD`](https://en.wikipedia.org/wiki/Domain-driven_design) (Domain-driven design) where tests are written in an English-like language (i.e. the `Gherkin` language) that specifies the external *behavior* (the specifications) of the unit without reference to how the unit was implemented (thus it is a form of *black box* testing). The purpose of BDD is to both describe and test the behavior of a unit of code in a single *specification* file.

> See [What’s the difference between Unit Testing, TDD and BDD?](https://codeutopia.net/blog/2015/03/01/unit-testing-tdd-and-bdd/)


## Mocha, Chai And Javascript Testing - Intro (10 min)

To test our code in Node, we will use two primary libraries: one to run the tests and a second one to run the assertions.

Mocha will be our testing framework, but we're mostly just using it as a test runner. From the [Mocha Website](https://mochajs.org/)...

> "Mocha is a feature-rich JavaScript test framework running on Node.js and the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping (associating) uncaught exceptions to the correct test cases."


For assertions, we will use Chai. From the [Chai website](http://chaijs.com/)...

> "Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework."


To be able to make HTTP requests inside tests, we will use [Supertest](https://github.com/visionmedia/supertest)...

> "The motivation with this module is to provide a high-level abstraction for testing HTTP"

## We Do: Create Tests (35 mins)

### Setting up the app

Take the starter code provided in the `starter-code` directory of this lesson plan. Take a moment to familiarize yourself with the Express app and get everything set up. Be sure to `npm install` and start the server.

```bash
git clone https://git.generalassemb.ly/dc-wdi-node-express/express-tdd
cd express-tdd/starter-code/app
npm install
node app.js
```

To test this app, we need to install a couple of dependencies.

First, let's install mocha using --save-dev...

```bash
npm install mocha --save-dev
```

Then we will install chai using --save-dev

```bash
npm install chai --save-dev
```

Last dependency we need to install is supertest...

```bash
npm install supertest --save-dev
```

### Files and Folders

Now that we're configured, let's set up our file and folder structure. All the tests will be written inside a folder `test` at the root of the app...

```bash
 $ mkdir test
```

Then we will write the tests inside a file called `candies.test.js`...

```bash
 $ touch test/candies.test.js
```

> Note: Because our tests will request the application through HTTP, students have to make sure they are running the app while running the tests

### Writing Our First Test

Open the file `candies.test.js`. We now need to require some dependencies at the top of this file...

```javascript
const should        = require("chai").should()
const expect        = require("chai").expect
const supertest     = require("supertest")
const api           = supertest("http://localhost:3000")
```

Make sure you set the url correctly, as this will be used to request the app and analyze the response.

All the tests need to be inside a `describe` function.  We will use one describe block per route...

```javascript
describe("GET /candies", function () {
  //tests will be written inside this function
})
```


First, we will write a test to make sure that a request to the index path `/candies` returns a http status 200...

```javascript
describe("GET /candies", function () {
  it("should return a 200 response", function (done) {
    api
      .get("/candies")
      .set("Accept", "application/json")
      .expect(200, done)
  })
})
```

> **Note:** Make sure that the done is in the it block and not the describe block!

Now go in the command line and type `mocha`. When you do, you may get an error saying that the `mocha` command cannot be found. 

This is because `mocha` is not installed globally on our machines (though it's possible you may have it already installed). While we could simply install mocha globally and run the test, we would not be using the specified version of `mocha` listed a dev dependency in our `package.json` and contained in `node_modules`. 

In order to run mocha from our local `node_modules` folder, do the following...

1. Run mocha directly from our `node_modules` folder to ensure you've installed it properly...
    ```bash
    node_modules/.bin/mocha
    ```
2. Alias the `mocha` command to an npm script in our `package.json`...
    ```javascript
    {
      "name": "express-routing-lab",
      "version": "0.0.0",
      "description": "",
      "main": "app.js",
      "scripts": {
        "test": "node_modules/.bin/mocha"
      },
      "dependencies": {
        ...
      }
      ...
    }
    ```
    > One thing to keep in mind when using NPM to run tests (really running anything with NPM scripts for that matter) is that NPM will prefer local node modules over globally installed modules. If something has not been installed properly locally this could lead to [differing behavior](https://stackoverflow.com/a/28666483) between running `mocha` and `npm test`.
3. Run `npm test`. Now we can run it locally from our projects without having to install it globally on our machines, and manage another globally installed package.

You will know the test successfully ran when if get an output looking like this...

![CLI Screenshot](./images/Screen_Shot_2015_08_12_at_12_17_01.png)

This test is passing!

### Test Blocks

Every block of code that starts with `it()` represents a test. Each test is performed in sequence, one after the other, in a queue.

The `callback` represents a function that Mocha will pass to the code so that the next test will be executed only when the current is finished and the `done` function is called - this allows tests to be executed once at a time. It's almost like the resolve function of a `Promise`.

Now, let's verify the content of the response by looking at the data sent back by hitting the `/candies` endpoint...

```javascript
[
  {
    id: 1,
    name: 'Toffee Bar',      
    color: 'Brown, Caramel'
  }, {
    id: 2,
    name: 'Pez',
    color: 'Green'
  }, {
    id: 3,
    name: 'Pop Rocks',
    color: 'Pink'
  }, {
    id: 4,
    name: 'Sour Patch Kids',
    color: 'Blue'
  }
]

```

We can write a test that verifies the response is an array...

```javascript
it("should return an array", function(done){
  api
    .get("/candies")
    .set("Accept", "application/json")
    .end(function(error, response){
      expect(response.body).to.be.an('array');
      done()
    })
  })
```

NB: In the first test, we were using the `.expect` method of `supertest`. Here we are using the expect function provided by `chai`.

We can write another test that verifies the presence of a field in the response...

```javascript
it("should return an array of objects that have a field called 'name' ", function(done){
  api
    .get("/candies")
    .set("Accept", "application/json")
    .end(function(error, response){
      expect(response.body[0]).to.have.property('name');
      done()
  })
})
```

We can also send data to the server and test the behavior - in our case, we want to make sure that when we post some JSON to `/candies`, a new object is added to the array candies.

Because we are going to test another route, lets add another describe block...

```javascript
describe("POST /candies", function(){

})
```

For this test, we need to:

1. Create a new object by sending a `POST` request
2. Verify that a new object has been "saved" by requesting the index route

For this, we will use `before` blocks. A `before` block will be executed for every `it` function is called inside a `describe` block.

Add this inside the new `describe` block...

```javascript
  before(function(done){
    api
      .post("/candies")
      .set("Accept", "application/json")
      .send({
        "id": 5,
        "name": "Lollipop",
        "color": "Red"
      })
      .end(done)
  })
```

This code will be called for every test we will add into the current `describe` block.

Now, we can verify that calling "POST" will add an object to candies...

```javascript
it("should add a candy object to the collection candies and return it", function (done) {
  api
    .get("/candies")
    .set("Accept", "application/json")
    .end(function(error, response){
      expect(response.body.length).to.equal(5);
      done()
    })
})
```

Run `npm test` in your CLI, you should now have four passing tests!

> How many times can you run this test and have it pass? How can you fix this?


## Independent Practice (20 minutes)

> ***Note:*** _This can be a pair programming activity or done independently._

Add tests to the suite:

1. Write a test that makes sure the object returned when you call the `show` route with a specific ID contains the right fields.
2. Write a test that ensures an object is deleted from the array candies when you call delete.
3. Write a test that ensures a property is updated when you call `PUT /candies/:id`


## Conclusion (10 mins)
> Review the answers to the tests specs above

We've covered the principles of testing in JavaScript, but Chai offers a lot of different expectations syntaxes. Check the [Chai Documentation](http://chaijs.com/api/)

- How does Mocha work with Chai to write tests in your JavaScript application?
- Describe how to configure your app to use Mocha and Chai.
