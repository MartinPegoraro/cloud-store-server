import { Router } from "express";
import pool from "../../../database.js";
import { store } from "./store.js";

const router = Router()

router.get('/list', async (req, res) => {
    store.listAll()
        .then((data) => {
            console.log(data);
            res.status(200).json({ data: data, message: 'Productos listados' })
        }).catch((err) => {
            res.status(500).json({ message: err.message })
        })

})
router.get('/list/:id', async (req, res) => {
    try {
        const id = req.params.id
        const [result] = await pool.query("SELECT * FROM product WHERE id= ?", [id])
        return console.log(result);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/addProduct', async (req, res) => {
    store.add(req.body)
        .then((data) => {
            console.log(data);
            res.status(200).json({ data: data, message: 'Producto creado' }) // Enviar los datos como una respuesta HTTP
        }).catch((err) => {
            res.status(500).json({ message: err.message })
        })
})

router.patch('/editProduct/:id', async (req, res) => {
    try {
        const { marca, genero } = req.body
        const id = req.params.id
        console.log(marca, genero, id);

        const resultProductEdit = await pool.query('UPDATE product SET marca = ?, genero = ? WHERE id= ?', [marca, genero, id])
        return console.log(resultProductEdit);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const id = req.params.id
        const resultProductEdit = await pool.query('delete from product where id= ?', [id])
        return console.log(resultProductEdit);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router