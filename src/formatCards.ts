import { MagiCard } from './MagiCard.js';

/**
 * Function to convert a card from JSON to a MagiCard object (Needed for compatibility in CardManager Class)
 * @param card Is the card as a JSON object
 * @returns MagiCard object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function JSONtoCard(card: any): MagiCard {
  const magiCard = new MagiCard(
    card.id,
    card.name,
    card.manaCost,
    card.color,
    card.cardType,
    card.rarity,
    card.rulesText,
    card.marketValue,
    card.powerToughness,
    card.loyalty,
  );
  return magiCard;
}
