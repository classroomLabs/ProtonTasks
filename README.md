# Proton

> Profesional TypeScript project setup
>
> -- by [bitAdemy](https://bitademy.com)

This is a template repository. You can create a copy form it. [(More info about GitHub templates)](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template)

## Start

### Local dependencies :

```bash
# npm
npm i
# yarn
yarn
```

### Global dependencies :

#### Parcel

```bash
# npm
npm install -g parcel-bundler
# yarn
yarn global add parcel-bundler
```

### Scripts :

```bash
# npm
npm start # run de application on localhost
npm test # excute tests
nom run deploy # compiles, bundles and pushes to github pages
# yarn
yarn start # run de application on localhost
yarn test # excute tests
yarn deploy # compiles, bundles and pushes to github pages
```

## Recommended VS Code Extensions

- **Material Icon Theme** pkief.material-icon-theme

- **Night Owl** sdras.night-owl

- **Prettier** - Code formatter esbenp.prettier-vscode

- **Spell Right** ban.spellright

## Preconfigured tools:

### Prettier

`.prettierrc`

```json
{
  "printWidth": 100,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "jsxBracketSameLine": true,
  "arrowParens": "avoid",
  "rangeStart": 0,
  "rangeEnd": 10000,
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve"
}
```

`.editorconfig`

```
root = true
[*]
end_of_line = lf
charset = utf-8
```

### EsLint

`.eslintrc`

```json
"rules": {
    "complexity": ["error", { "max": 8 }],
    "max-depth": ["error", 2],
    "max-lines": ["warn", 160],
    "max-lines-per-function": ["warn", 20],
    "max-nested-callbacks": ["error", 1],
    "max-params": ["warn", 2],
    "no-magic-numbers": [
      "warn",
      { "detectObjects": false, "enforceConst": true, "ignore": [1], "ignoreArrayIndexes": true }
    ],
    "no-multiple-empty-lines": ["warn", { "max": 2, "maxEOF": 1 }],
    "no-nested-ternary": "error",
    "no-unused-vars": ["warn"],
    "@typescript-eslint/no-use-before-define": "off"
},
```

### Jest

`babel.config.js`

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
      '@babel/preset-typescript',
    ],
  ],
};
```

`test.config.js`

```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```

### gh-pages

## Package Json scripts

```json
{
  "scripts": {
    "start": "parcel ./src/index.html",
    "build": "rm -rf dist && parcel build ./src/index.html",
    "predeploy": "rm -rf dist && parcel build ./src/index.html --public-url /proton",
    "deploy": "gh-pages -d dist",
    "test": "jest --watch -o",
    "format": "prettier --write \"./**/*.{js,ts,json}\"",
    "lint": "eslint . --ext .ts",
    "jest": "jest"
  },
```

## Credits

### [Clean Code course](https://github.com/BitAdemy/CleanCode)

Based on its demos and Laboratories.

[Course documentation in Spanish ](https://github.com/BitAdemy/CleanCode)

[Course labs](https://github.com/LabsAdemy/CleanCodeLab)

[![bit_ademy](./src/assets/bit_ademy.png)](https://bitademy.com)

> by [bitAdemy](https://bitademy.com)
