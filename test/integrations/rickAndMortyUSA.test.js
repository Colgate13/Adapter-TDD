import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import fs from "fs/promises";
import Character from "../../src/entities/character.js";
import RickAndMortyUSA from "../../src/business/integrations/rickAndMortyUSA.js";
import axios from "axios";

describe("#RickAndMortyUSA", () => {
  beforeEach(() => jest.clearAllMocks());

  test("#getCharatersXML should return a list of characters Entity", async () => {
    const response = await fs.readFile("./test/mocks/characters.xml");
    const expected = [
      {
        gender: "Male",
        id: 10,
        location: "Worldender's lair",
        name: "Alan Rails",
        origin: "unknown",
        species: "Human",
        status: "Dead",
        type: "Superhuman (Ghost trains summoner)",
      },
    ];

    // SpyOn AXIOS
    jest.spyOn(axios, "get").mockResolvedValue({
      data: response,
    });

    const result = await RickAndMortyUSA.getCharactersFromXML();
    expect(result).toMatchObject(expected);
  });

  test("#getCharatersXML should return an empty list if the api returns nothing", async () => {
    const response = await fs.readFile("./test/mocks/characters-empty.xml");
    const expected = [];

    // SpyOn AXIOS
    jest.spyOn(axios, "get").mockResolvedValue({
      data: response,
    });

    const result = await RickAndMortyUSA.getCharactersFromXML();
    expect(result).toMatchObject(expected);
  });
});
