# JuniorLints Server

### Linting with eslint

The server is configured with the aggressive AirBnB ESLint rules. These rules
were installed with:

```
npx install-peerdeps --dev eslint-config-airbnb-base
```

and `.eslintrc.json` configured with:

```
{
  "extends": "airbnb-base"
}
```

The linter can be run with:

```
npx eslint .
```

### Basin

JuniorLints is deployed to Basin, where Pylint is executed on a detached screen