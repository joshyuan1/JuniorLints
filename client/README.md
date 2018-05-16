# JuniorLints Client

The JuniorLints client was bootstrapped with [Create React
App](https://github.com/facebookincubator/create-react-app) (CRA) and includes
all of capabilities provided by CRA.

## Linting with eslint

The lint configuration built into CRA was extended with the AirBnB
configuration based on this [blog
post](https://groundberry.github.io/development/2017/06/11/create-react-app-linting-all-the-things.html).
Using eslint outside of `react-scripts` may not be supported, but appears to
work.

The configuration was installed with:

```
npx install-peerdeps --dev eslint-config-airbnb
```

And the client .eslintrc.json file configured to use the AirBnB rules, and
globally configured to allow JSX in .js files.

```
{
  "extends": "airbnb",
  "env": {
    "browser": true,
    "jest": true
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  }
}
```

Other rules are disabled in specific files.

The linter is run automatically by the CRA development server, or can be run
manually with (include the `--fix` option to automatically fix formatting
errors):

```
npx eslint --fix .
```
