import 'mocha';
import { expect } from 'chai';
import { JSONtoCard } from '../src/formatCards.js';
import { MagiCard, Color, Type, Rarity } from '../src/MagiCard.js';

describe('JSONtoCard', () => {
  it('should convert a card from JSON to a MagiCard object', () => {
    const card = {
      id: 4,
      name: 'Qiyana',
      manaCost: 969696,
      color: 'White',
      cardType: 'Artifact',
      rarity: 'Rare',
      rulesText: 'Tap: kkk',
      marketValue: 80,
    };

    const magiCard = new MagiCard(
      card.id,
      card.name,
      card.manaCost,
      card.color as Color,
      card.cardType as Type,
      card.rarity as Rarity,
      card.rulesText,
      card.marketValue,
    );

    const result = JSONtoCard(card);

    expect(result).to.deep.equal(magiCard);
  });

  it('should convert a card from JSON to a MagiCard object', () => {
    const card = {
      id: 2,
      name: 'Teferi',
      manaCost: 1234,
      color: 'White',
      cardType: 'Artifact',
      rarity: 'Common',
      rulesText: 'Tap: aa',
      marketValue: 80,
    };

    const magiCard = new MagiCard(
      card.id,
      card.name,
      card.manaCost,
      card.color as Color,
      card.cardType as Type,
      card.rarity as Rarity,
      card.rulesText,
      card.marketValue,
    );

    const result = JSONtoCard(card);

    expect(result).to.deep.equal(magiCard);
  });

  it('should convert a card from JSON to a MagiCard object', () => {
    const card = {
      id: 8,
      name: 'Ryze',
      manaCost: 1000,
      color: 'Black',
      cardType: 'Sorcery',
      rarity: 'Rare',
      rulesText: 'Tap: cc',
      marketValue: 98,
    };

    const magiCard = new MagiCard(
      card.id,
      card.name,
      card.manaCost,
      card.color as Color,
      card.cardType as Type,
      card.rarity as Rarity,
      card.rulesText,
      card.marketValue,
    );

    const result = JSONtoCard(card);

    expect(result).to.deep.equal(magiCard);
  });
});
