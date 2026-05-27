const express = require('express');
const envVariables = require('./src/config/envVariables');
const cors = require('cors');
const fileUpload = require("express-fileupload");
const useragent = require('express-useragent');
const i18nMiddleware = require('i18next-http-middleware');
const i18n = require('./src/config/i18n');
const routes = require('./src/routes/routes');
const connectDB = require('./src/config/dbConfig');

const app = express();
connectDB();

app.set("trust proxy", true);
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/"
}));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());
app.use(i18nMiddleware.handle(i18n));

// Routes
app.use('/api',routes);


app.listen(envVariables.PORT, () => {
  console.log(`Your app (${envVariables.APP_NAME}) has been started on port ${envVariables.PORT}.URL http://localhost:${envVariables.PORT}`)
})