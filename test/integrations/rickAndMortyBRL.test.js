import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import fs from "fs/promises";
import Character from "../../src/entities/character.js";
import RickAndMortyBRL from "../../src/business/integrations/rickAndMortyBRL.js";
import axios from "axios";

describe("#RickAndMortyBRL", () => {
  beforeEach(() => jest.clearAllMocks());

  test("#getCharatersJSON should return a list of characters Entity", async () => {
    const response = JSON.parse(
      await fs.readFile("./test/mocks/characters.json")
    );

    // SpyOn AXIOS
    jest.spyOn(axios, "get").mockResolvedValue({
      data: response,
    });

    const expected = response.results.map(
      (character) => new Character(character)
    );

    const result = await RickAndMortyBRL.getCharactersFromJSON();
    expect(result).toStrictEqual(expected);
  });

  test("#getCharatersJSON should return an empty list if the api returns nothing", async () => {
    const response = JSON.parse(
      await fs.readFile("./test/mocks/characters-empty.json")
    );

    const expected = response.results;

    // SpyOn AXIOS
    jest.spyOn(axios, "get").mockResolvedValue({
      data: response,
    });

    const result = await RickAndMortyBRL.getCharactersFromJSON();
    expect(result).toStrictEqual(expected);
  });
});
