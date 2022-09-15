import rickAndMortyBRL from "../integrations/rickAndMortyBRL.js";

export default class rickAndMortyBRLAdapter {
  static async getCharacters() {
    return await rickAndMortyBRL.getCharactersFromJSON();
  }
}
