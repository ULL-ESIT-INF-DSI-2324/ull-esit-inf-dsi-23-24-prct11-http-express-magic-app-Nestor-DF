import fs from 'fs/promises';

/**
 * Function to display a user's card.
 * @param user The username.
 * @param cardID The card ID.
 * @returns A promise that resolves with the card information or rejects if the card is not found.
 */
export function showCard(user: string, cardID: number): Promise<string> {
  const cardFilePath = `./cards/${user}/${cardID}.json`;

  return new Promise<string>((resolve, reject) => {
    fs.stat(cardFilePath)
      .then(() => {
        return fs.readFile(cardFilePath);
      })
      .then((data) => {
        resolve(data.toString());
      })
      .catch(() => {
        reject(`Card not found at ${user}'s collection`);
      });
  });
}

/**
 * Function to remove a card from a user's collection.
 * @param user The username.
 * @param cardID The card ID.
 * @returns A promise that resolves with a success message or rejects if the card is not found.
 */
export function removeCard(user: string, cardID: number): Promise<string> {
  const cardFilePath = `./cards/${user}/${cardID}.json`;

  return new Promise<string>((resolve, reject) => {
    fs.stat(cardFilePath)
      .then(() => {
        return fs.rm(cardFilePath);
      })
      .then(() => {
        resolve(`Card removed in ${user}'s collection`);
      })
      .catch(() => {
        reject(`Card not found at ${user}'s collection`);
      });
  });
}
