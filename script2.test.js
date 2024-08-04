const fetch = require('node-fetch');
const swapi = require('./script2');

it('calls swapi to get people', () => {
  expect.assertions(1) //this for check how many assertion inside it()
  return swapi.getPeople(fetch).then(data => {
    //this is a assertion
    expect(data.count).toEqual(82)
  })
})

it('calls swapi to get people with a promise', () => {
  expect.assertions(2)
  return swapi.getPeoplePromise(fetch).then(data => {
    expect(data.count).toEqual(82)
    expect(data.results.length).toBeGreaterThan(5)
  })
})
