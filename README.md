# Práctica 11 - Aplicación Express para coleccionistas de cartas Magic

- Néstor Delgado Feliciano ([alu0101488998@ull.edu.es](mailto:alu0101488998@ull.edu.es))

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-Nestor-DF/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-Nestor-DF?branch=main)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-Nestor-DF&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-Nestor-DF)


## **Índice**
- [Práctica 11 - Aplicación Express para coleccionistas de cartas Magic](#práctica-11---aplicación-express-para-coleccionistas-de-cartas-magic)
  - [**Índice**](#índice)
  - [**Introducción**](#introducción)
  - [**Desarrollo**](#desarrollo)
  - [**Conclusiones**](#conclusiones)
  - [**Recursos Empleados**](#recursos-empleados)




## **Introducción**
En esta práctica se desarrollará una aplicación cliente-servidor usando **Express** para gestionar información sobre cartas del juego Magic: The Gathering. Desde un cliente como, por ejemplo, ThunderClient o Postman, se podrán llevar a cabo peticiones HTTP al servidor como añadir, modificar, eliminar, listar y leer la información asociada a estas cartas. Toda la información de cada carta se almacenará en formato JSON en el sistema de archivos del servidor. Además, se enfatiza que la interacción con la aplicación se realizará exclusivamente a través de la línea de comandos. 




## **Desarrollo**
Partiendo de la clase que había creado en la la práctica anterior cambié todos los métodos síncronos por métodos **asíncronos basados en callbacks**:

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

Se puede apreciar como uso el patrón de callbacks de tal manera que si hay un error la variable *error* contendrá una string con la descripción del error mientras *result* será undefined. Si todo va bien *error* contendrá undefined y *result* contendrá un mensaje con el resultado.




## **Conclusiones**
En conclusión, esta práctica me ha proporcionado una comprensión más profunda de las capacidades de Node.js, desde la manipulación de eventos asíncronos hasta la interacción con el sistema de archivos y la creación de aplicaciones de red usando **Express**, además de haber reforzado el uso de herramientas como yargs y chalk para mejorar la experiencia del usuario en la línea de comandos.




## **Recursos Empleados**

1. OpenAI Chat: [https://chat.openai.com/](https://chat.openai.com/) - Plataforma de IA conversacional proporcionada por OpenAI para tareas y aplicaciones de procesamiento de lenguaje natural.

2. W3Schools JavaScript Reference: [https://www.w3schools.com/jsrEF/default.asp](https://www.w3schools.com/jsrEF/default.asp) - Recurso en línea completo para aprender y consultar conceptos, sintaxis y mejores prácticas del lenguaje de programación JavaScript.

3. MDN Web Docs - JavaScript Reference: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) - Documentación oficial de la Red de Desarrolladores de Mozilla que proporciona explicaciones detalladas, ejemplos y referencias para las características del lenguaje JavaScript y las API.

4. API asíncrona proporcionada por Node.js para trabajar con el sistema de archivos: [https://nodejs.org/docs/latest/api/fs.html](https://nodejs.org/docs/latest/api/fs.html)