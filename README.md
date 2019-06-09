# cli

## Requirements
This is a node application and is build on v12. Should be compatible with v10 (NOT TESTED).

1. [node.js](https://nodejs.org/)


## Using the tool

### Using node

node . r {Your name}

## Assumptions
1. Operator understands how to use command line. He/She also knows about what are all the various options represent.
2. The first object in every json file has all the keys as no official API documentation was provided.
3. Not using any database and using in memory objects to store data. My assumption is that using database would make this application hard to setup even if I use docker which is not the aim of a command line application. Installing node is easy.

## Conventions
1. Class names in UpperCamelCase
2. Variable names in camelCase
3. Constants are CAPITALISED
4. Add trailing comma on objects spanning multiple lines
5. Use single try..catch around a group of async/await calls unless it is necessary not to.
6. Objects should have singular names and Arrays should have plural names
7. JSHint installed globally and use default settings.
8. Try to manage type instead of using ===. But, use of === is also fine if need be.

### Tradeoff
