import rickAndMortyUSA from "../integrations/rickAndMortyUSA.js";

export default class rickAndMortyUSAAdapter {
  static async getCharacters() {
    return await rickAndMortyUSA.getCharactersFromXML();
  }
}
