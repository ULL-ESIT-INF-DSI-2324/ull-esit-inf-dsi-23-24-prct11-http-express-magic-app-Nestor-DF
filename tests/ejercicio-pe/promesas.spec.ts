import 'mocha';
import { expect } from 'chai';
import { CardManager } from '../../src/CardManager.js';
import { MagiCard, Color, Type, Rarity } from '../../src/MagiCard.js';
import { removeCard, showCard } from '../../src/ejercicio-pe/promesas.js';

const cardManager = CardManager.getInstance();

describe('Asynchronous function tests', () => {
  before(function () {
    const card = new MagiCard(8, 'Card Name', 3, Color.Blue, Type.Land, Rarity.Common, 'Card Rules Text', 10);
    cardManager.addCard('juan', card, () => {});
    const card2 = new MagiCard(9, 'Card Name', 3, Color.Blue, Type.Land, Rarity.Common, 'Card Rules Text', 10);
    cardManager.addCard('juan', card2, () => {});
  });

  it('showCard works', () => {
    return showCard('juan', 2).then((data) => {
      const expectedData =
        '{"id":2,"name":"Qiyana","manaCost":6767,"color":"White","rarity":"Rare","rulesText":"Tap: ERQWQAA","marketValue":999}';
      expect(data).to.be.deep.equal(expectedData);
    });
  });

  it('showCard works', () => {
    return showCard('juan', 3).then((data) => {
      const expectedData =
        '{"id":3,"name":"Hydra","manaCost":500,"color":"Multicolor","type":"Planeswalker","rarity":"Common","rulesText":"Tap: aaa","marketValue":20,"loyaltyMarks":5}';
      expect(data).to.be.deep.equal(expectedData);
    });
  });

  it('showCard doesnt work if card doesnt exist', () => {
    return showCard('juan', 99).catch((err) => {
      expect(err).to.be.deep.equal(`Card not found at juan's collection`);
    });
  });

  it('showCard doesnt work if card doesnt exist', () => {
    return showCard('juan', 0).catch((err) => {
      expect(err).to.be.deep.equal(`Card not found at juan's collection`);
    });
  });

  it('removeCard works', () => {
    return removeCard('juan', 8).then((data) => {
      expect(data).to.be.deep.equal(`Card removed in juan's collection`);
    });
  });

  it('removeCard works', () => {
    return removeCard('juan', 9).then((data) => {
      expect(data).to.be.deep.equal(`Card removed in juan's collection`);
    });
  });

  it('removeCard doesnt work if card doesnt exist', () => {
    return removeCard('juan', 99).catch((err) => {
      expect(err).to.be.deep.equal(`Card not found at juan's collection`);
    });
  });

  it('removeCard doesnt work if card doesnt exist', () => {
    return removeCard('juan', 0).catch((err) => {
      expect(err).to.be.deep.equal(`Card not found at juan's collection`);
    });
  });
});
