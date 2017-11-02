# UploadAndDispatch

Express app with no view engine.

### To run it:

- clone the repo
- put the env file in the root directory
```
npm install
bower install
node bin/dev
```

### Structure:

- `app` Backend code (Everything **Node** related)
- `public` Front-end code (Everything **Angular** related)
- `bin/dev` Entry point for the application
- `package.json` Backend info and dependencies
- `bower.json` Front-end info and dependencies
- `.bowerrc` Bower configuration file
- `server.js` Server hosting, routing and file serving.
