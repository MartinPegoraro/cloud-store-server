import express from "express";
import morgan from "morgan";
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/product.route.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
app.set('port', process.env.PORT || 4000)

app.use(morgan('dev'))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())
app.use(productRoutes)

app.use(express.static(join(__dirname, 'public')))

app.listen(app.get('port'), () =>
    console.log('server listening on port', app.get('port')))