import { Router } from "express";
import pool from "../database.js";

const router = Router()

router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM product")
        return console.log(result);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
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
    try {
        const { marca, genero } = req.body

        const resultProduct = await pool.query('INSERT INTO product SET ?', [{ marca, genero }])
        return resultProduct

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
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