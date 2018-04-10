# JuniorLints

JuniorLints is a web application for Python static analysis.

Development is hosted on GitHub: https://github.com/joshyuan1/JuniorLints

## Deploying to Basin

In production, JuniorLints is deployed to basin.cs.middlebury.edu (where it is typically run within `screen` on port 5054). To deploy:

1. Build production assets for the client application (from the top-level directory):

    ```
    npm run basin-postbuild
    ```

1. Start the server from the top-level directory (note you will need to pick an unused port):

  	```
  	NODE_ENV=production PORT=5054 npm run start --prefix server
  	```

## Link to the deployed application on Basin:

http://basin.cs.middlebury.edu:5054