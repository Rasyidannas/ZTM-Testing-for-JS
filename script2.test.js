const fetch = require("node-fetch");
const swapi = require("./script2");

it("calls swapi to get people", () => {
  expect.assertions(1); //this for check how many assertion inside it()
  return swapi.getPeople(fetch).then((data) => {
    //this is a assertion
    expect(data.count).toEqual(82);
  });
});

it("calls swapi to get people with a promise", () => {
  expect.assertions(2);
  return swapi.getPeoplePromise(fetch).then((data) => {
    expect(data.count).toEqual(82);
    expect(data.results.length).toBeGreaterThan(5);
  });
});

//Mocks os Faking It For Functionality, a "mock" is a stand-in for a real object or dependency in your code and also mock engine would simulate the engine's behavior without actually needing a real, working engine.
it("getPeople returns count and results", () => {
  const mockFetch = jest.fn().mockReturnValue(
    Promise.resolve({
      json: () =>
        Promise.resolve({
          count: 82,
          results: [0, 1, 2, 3, 4, 5],
        }),
    })
  );

  expect.assertions(4);
  return swapi.getPeoplePromise(mockFetch).then((data) => {
    expect(mockFetch.mock.calls.length).toBe(1);
    expect(mockFetch).toBeCalledWith("https://swapi.dev/api/people");
    expect(data.count).toEqual(82);
    expect(data.results.length).toBeGreaterThan(5);
  });
});
