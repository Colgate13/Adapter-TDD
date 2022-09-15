import rickAndMortyBRLAdapter from "./business/adapters/rickAndMortyBRLAdapter.js";
import rickAndMortyUSAAdapter from "./business/adapters/rickAndMortyUSAAdapter.js";

const data = [rickAndMortyBRLAdapter, rickAndMortyUSAAdapter].map(
  (integration) => integration.getCharacters()
);

const all = await Promise.allSettled(data);

const successes = all
  .filter((result) => result.status === "fulfilled")
  .map(({ value }) => value)
  .reduce((prev, next) => prev.concat(next), []);

const errors = all.filter((result) => result.status === "rejected");

console.table(successes);
console.table(errors);
