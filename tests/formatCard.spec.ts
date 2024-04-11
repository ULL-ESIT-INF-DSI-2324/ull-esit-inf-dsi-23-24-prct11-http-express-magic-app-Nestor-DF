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
});
