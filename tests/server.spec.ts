import 'mocha';
import { expect } from 'chai';
import request from 'request';

describe('Pruebas de las rutas de la aplicación Express', () => {
  // Prueba para la ruta GET /cards
  it('no debería funcionar si el usuario no se da en la query string', (done) => {
    request.get({ url: 'http://localhost:3000/cards', json: true }, (error: Error, response) => {
      expect(response.body.status).to.equal('Error');
      expect(response.body.answer).to.equal('An user has to be provided');
      done();
    });
  });
  it('debería obtener todas las cartas de un usuario', (done) => {
    request.get({ url: 'http://localhost:3000/cards?user=juan', json: true }, (error: Error, response) => {
      expect(response.body.status).to.equal('Success');
      done();
    });
  });
  it('debería obtener una carta de un usuario', (done) => {
    request.get({ url: 'http://localhost:3000/cards?user=juan&id=2', json: true }, (error: Error, response) => {
      expect(response.body.status).to.equal('Success');
      done();
    });
  });

  // Prueba para la ruta POST /cards
  it('no debería funcionar si el usuario no se da en la query string', (done) => {
    request.post({ url: 'http://localhost:3000/cards', json: true }, (error: Error, response) => {
      expect(response.body.status).to.equal('Error');
      expect(response.body.answer).to.equal('An user has to be provided');
      done();
    });
  });
  it('debería añadir una carta a un usuario', (done) => {
    const cardToAdd = {
      id: 55,
      name: 'Qiyana',
      manaCost: 6767,
      color: 'White',
      type: 'Artifact',
      rarity: 'Rare',
      rulesText: 'Tap: ERQWQAA',
      marketValue: 999,
    };
    request.post({ url: 'http://localhost:3000/cards?user=juan', json: cardToAdd }, (error: Error, response) => {
      expect(response.body.status).to.equal('Success');
      done();
    });
  });
  it('no debería añadir una carta a un usuario si ya existe una con el mismo id', (done) => {
    const cardToAdd = {
      id: 2,
      name: 'Qiyana',
      manaCost: 6767,
      color: 'White',
      type: 'Artifact',
      rarity: 'Rare',
      rulesText: 'Tap: ERQWQAA',
      marketValue: 999,
    };
    request.post({ url: 'http://localhost:3000/cards?user=juan', json: cardToAdd }, (error: Error, response) => {
      expect(response.body.status).to.equal('Error');
      expect(response.body.answer).to.equal("A card with the same ID already exists in juan's collection");
      done();
    });
  });

  // Prueba para la ruta DELETE /cards
  it('no debería funcionar si el usuario no se da en la query string', (done) => {
    request.delete({ url: 'http://localhost:3000/cards', json: true }, (error: Error, response) => {
      expect(response.body.status).to.equal('Error');
      expect(response.body.answer).to.equal('An user has to be provided');
      done();
    });
  });
  it('debería eliminar una carta de un usuario', (done) => {
    request.delete({ url: 'http://localhost:3000/cards?user=juan&id=55', json: true }, (error: Error, response) => {
      expect(response.body.status).to.equal('Success');
      expect(response.body.answer).to.equal("Card removed in juan's collection");
      done();
    });
  });
  it('no debería eliminar una carta de un usuario si no existe', (done) => {
    request.delete({ url: 'http://localhost:3000/cards?user=juan&id=999', json: true }, (error: Error, response) => {
      expect(response.body.status).to.equal('Error');
      expect(response.body.answer).to.equal("Card not found at juan's collection");
      done();
    });
  });

  // Prueba para la ruta PATCH /cards
  it('no debería funcionar si el usuario no se da en la query string', (done) => {
    request.patch({ url: 'http://localhost:3000/cards', json: true }, (error: Error, response) => {
      expect(response.body.status).to.equal('Error');
      expect(response.body.answer).to.equal('An user has to be provided');
      done();
    });
  });
  it('debería actualizar una carta a un usuario', (done) => {
    const cardToAdd = {
      id: 2,
      name: 'Qiyana',
      manaCost: 6767,
      color: 'White',
      type: 'Artifact',
      rarity: 'Rare',
      rulesText: 'Tap: ERQWQAA',
      marketValue: 999,
    };
    request.patch({ url: 'http://localhost:3000/cards?user=juan&id=2', json: cardToAdd }, (error: Error, response) => {
      expect(response.body.status).to.equal('Success');
      expect(response.body.answer).to.equal("Card updated in juan's collection");
      done();
    });
  });
  it('no debería actualizar una carta a un usuario si no existe', (done) => {
    const cardToAdd = {
      id: 99,
      name: 'Qiyana',
      manaCost: 6767,
      color: 'White',
      type: 'Artifact',
      rarity: 'Rare',
      rulesText: 'Tap: ERQWQAA',
      marketValue: 999,
    };
    request.patch({ url: 'http://localhost:3000/cards?user=juan&id=99', json: cardToAdd }, (error: Error, response) => {
      expect(response.body.status).to.equal('Error');
      expect(response.body.answer).to.equal("Card not found at juan's collection");
      done();
    });
  });
  it('el id en la query string debe coincidir con el de la carta actualizada', (done) => {
    const cardToAdd = {
      id: 88,
      name: 'Qiyana',
      manaCost: 6767,
      color: 'White',
      type: 'Artifact',
      rarity: 'Rare',
      rulesText: 'Tap: ERQWQAA',
      marketValue: 999,
    };
    request.patch({ url: 'http://localhost:3000/cards?user=juan&id=99', json: cardToAdd }, (error: Error, response) => {
      expect(response.body.status).to.equal('Error');
      expect(response.body.answer).to.equal('The id in the body has to be the same as the one in the query string');
      done();
    });
  });
});
