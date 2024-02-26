import express from "express";
import morgan from "morgan";
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import routes from './admin/routes/routes.js';
import bodyParser from "body-parser";
import { createTableUser, createTableStock, createTableSize, createTableSizeColorProduct, createTableProduct } from "../database/models/databaseSetup.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
app.set('port', process.env.SERVER_PORT || 4000)

app.use(morgan('dev'))

app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(routes)

app.use(express.static(join(__dirname, 'public')))

async function setupDatabase() {
    await createTableProduct();
    await createTableUser();
    await createTableStock();
    await createTableSize();
    await createTableSizeColorProduct();



}
setupDatabase();
app.listen(app.get('port'), () =>
    console.log('server listening on port', app.get('port')))