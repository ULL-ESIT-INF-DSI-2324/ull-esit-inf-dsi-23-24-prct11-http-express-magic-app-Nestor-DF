# Práctica 11 - Aplicación Express para coleccionistas de cartas Magic

- Néstor Delgado Feliciano ([alu0101488998@ull.edu.es](mailto:alu0101488998@ull.edu.es))

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-Nestor-DF/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-Nestor-DF?branch=main)


## **Índice**
- [Práctica 11 - Aplicación Express para coleccionistas de cartas Magic](#práctica-11---aplicación-express-para-coleccionistas-de-cartas-magic)
  - [**Índice**](#índice)
  - [**Introducción**](#introducción)
  - [**Desarrollo**](#desarrollo)
  - [**Conclusiones**](#conclusiones)
  - [**Recursos Empleados**](#recursos-empleados)




## **Introducción**
En esta práctica se desarrollará una aplicación cliente-servidor usando **Express** para gestionar información sobre cartas del juego Magic: The Gathering. Desde un cliente como, por ejemplo, ThunderClient o Postman, se podrán llevar a cabo peticiones HTTP al servidor como añadir, modificar, eliminar, listar y leer la información asociada a estas cartas. Toda la información de cada carta se almacenará en formato JSON en el sistema de archivos del servidor.




## **Desarrollo**
A partir de la clase desarrollada en la práctica previa he reestructurado todos los métodos para que sean **asíncronos y empleen el patrón callback**, de forma que en caso de error, la variable *error* almacenará una cadena que describa la naturaleza del error, mientras que *result* permanecerá indefinido. Si la operación se realiza correctamente, *error* será indefinido y *result* contendrá un mensaje con el resultado deseado.

```ts
export class CardManager {
  private static instance: CardManager;

  private constructor() {}

  public static getInstance(): CardManager {
    if (!CardManager.instance) {
      CardManager.instance = new CardManager();
    }
    return CardManager.instance;
  }

  public addCard(user: string, card: MagiCard, callback: (error: string | undefined, result: string | undefined) => void): void {
    const userDirectory = `./data/${user}`;
    const cardFilePath = `${userDirectory}/${card.getId()}.json`;

    fs.mkdir(userDirectory, { recursive: true }, (err) => {
      if (err) {
        callback(err.message, undefined);
      } else {
        fs.stat(cardFilePath, (err) => {
          if (err) {
            fs.writeFile(cardFilePath, JSON.stringify(card), (err) => {
              if (err) {
                callback(err.message, undefined);
              } else {
                callback(undefined, `Card added in ${user}'s collection`);
              }
            });
          } else {
            callback(`A card with the same ID already exists in ${user}'s collection`, undefined);
          }
        });
      }
    });
  }

  public updateCard(
    user: string,
    card: MagiCard,
    callback: (error: string | undefined, result: string | undefined) => void,
  ): void {
    const cardFilePath = `./data/${user}/${card.getId()}.json`;

    fs.stat(cardFilePath, (err) => {
      if (err) {
        callback(`Card not found at ${user}'s collection`, undefined);
      } else {
        fs.writeFile(cardFilePath, JSON.stringify(card), (err) => {
          if (err) {
            callback(err.message, undefined);
          } else {
            callback(undefined, `Card updated in ${user}'s collection`);
          }
        });
      }
    });
  }
  // Demás código
}
```

En lo que respecta el servidor HTTP creado con Express, he usado los **verbos HTTP** tal y cómo venía especificado en el guion:

1. **GET /cards**: Este endpoint se utiliza para obtener información sobre una carta específica o para listar todas las cartas de la colección de un usuario. Si se proporciona un ID de carta como parámetro de la consulta (query string), se devuelve la información de esa carta en particular. Si no se proporciona un ID, se devuelven todas las cartas de la colección del usuario.

2. **POST /cards**: Se utiliza para añadir una nueva carta a la colección de un usuario. La información de la carta que se desea añadir se envía en formato JSON en el cuerpo de la petición, y el usuario se especifica como parámetro en la query string.

3. **DELETE /cards**: Permite eliminar una carta específica de la colección de un usuario. Se espera que se proporcione tanto el ID de la carta como el nombre de usuario como parámetros en la query string.

4. **PATCH /cards**: Este endpoint se utiliza para modificar la información de una carta existente en la colección de un usuario. Se espera que se proporcione tanto el ID de la carta como el nombre de usuario como parámetros en la query string. La nueva información de la carta se envía en formato JSON en el cuerpo de la petición. Además, se verifica que el ID de la carta en el cuerpo de la petición coincida con el proporcionado en la query string.

```ts
const app = express();

app.use(express.json());

app.get('/cards', (req, res) => {
  if (!req.query.user) {
    res.send({
      error: 'An user has to be provided',
    });
    return;
  }
  if (req.query.id) {
    cardManager.showCard(req.query.user as string, parseInt(req.query.id as string), (error, result) => {
      if (error) {
        res.send(JSON.stringify({ status: 'Error', answer: error }));
      } else {
        res.send(JSON.stringify({ status: 'Success', answer: result }));
      }
    });
  } else {
    cardManager.listCollection(req.query.user as string, (error, result) => {
      if (error) {
        res.send(JSON.stringify({ status: 'Error', answer: error }));
      } else {
        res.send(JSON.stringify({ status: 'Success', answer: result }));
      }
    });
  }
});

app.post('/cards', (req, res) => {
  if (!req.query.user) {
    res.send({
      error: 'An user has to be provided',
    });
  } else {
    cardManager.addCard(req.query.user as string, JSONtoCard(req.body), (error, result) => {
      if (error) {
        res.send(JSON.stringify({ status: 'Error', answer: error }));
      } else {
        res.send(JSON.stringify({ status: 'Success', answer: result }));
      }
    });
  }
});

app.delete('/cards', (req, res) => {
  if (!req.query.user) {
    res.send({
      error: 'An user has to be provided',
    });
    return;
  }
  if (!req.query.id) {
    res.send({
      error: 'An id has to be provided',
    });
  } else {
    cardManager.removeCard(req.query.user as string, parseInt(req.query.id as string), (error, result) => {
      if (error) {
        res.send(JSON.stringify({ status: 'Error', answer: error }));
      } else {
        res.send(JSON.stringify({ status: 'Success', answer: result }));
      }
    });
  }
});
// Demás código
```

Se puede observar como todas las peticiones se hacen a través de la ruta **/cards** y cómo se sigue una estructura básica. Es decir,  se comprueban los parámetros de la **query string** y en base a estos se realiza una acción u otra. Por ejemplo, se comprueba que el usuario esté en la **query string** en todas las peticiones y si no está se manda un mensaje de respuesta de error. A continuación,  se comprueba el campo **id** y si todo es correcto se llama al método correpondiente de la clase **CardManager** empleando el **patrón callback**.

Se destaca como todas las **respuestas** del servidor están en **formato JSON** y siguen la misma estructura {status, answer}
Se distinguen dos casos claros por el campo *status* de la respuesta del servidor:
- Error: Ocurre cuando se produce un error en el servidor
- Sucess: Ocurre cuando todo va bien en la petición
En el campo *answer* viene un mensaje informativo o cartas en formato json si se trata de una petición get.

Por otro lado, por temas de **compatibilidad** con la clase **CardManager** tuve que hacer una función simple para convertir las **cartas** que vienen en formato **JSON** en el ***body*** de la petición a objetos **MagiCard**.
```ts
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
```

Para comprobar el funcionamiento del servidor Express realicé las pruebas usando los paquetes **request y Mocha y Chai**, el siguiente fragmento de código muestra la estructura general que seguí:
```ts
import 'mocha';
import { expect } from 'chai';
import request from 'request';

describe('Pruebas de las rutas de la aplicación Express', () => {
  it('no debería funcionar si el usuario no se da en la query string', (done) => {
    request.get({ url: 'http://localhost:3000/cards', json: true }, (error: Error, response) => {
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
  // Demás código
```




## **Conclusiones**
En conclusión, esta práctica me ha ayudado a entender mejor como implementar un servidor HTTP con Express, el significado de los diferentes verbos HTTP y cómo emplear el patrón callback de mejor forma. Así como el funcionamiento general cliente-servidor.




## **Recursos Empleados**

1. OpenAI Chat: [https://chat.openai.com/](https://chat.openai.com/) - Plataforma de IA conversacional proporcionada por OpenAI para tareas y aplicaciones de procesamiento de lenguaje natural.

2. W3Schools JavaScript Reference: [https://www.w3schools.com/jsrEF/default.asp](https://www.w3schools.com/jsrEF/default.asp) - Recurso en línea completo para aprender y consultar conceptos, sintaxis y mejores prácticas del lenguaje de programación JavaScript.

3. MDN Web Docs - JavaScript Reference: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) - Documentación oficial de la Red de Desarrolladores de Mozilla que proporciona explicaciones detalladas, ejemplos y referencias para las características del lenguaje JavaScript y las API.

4. API asíncrona proporcionada por Node.js para trabajar con el sistema de archivos: [https://nodejs.org/docs/latest/api/fs.html](https://nodejs.org/docs/latest/api/fs.html)