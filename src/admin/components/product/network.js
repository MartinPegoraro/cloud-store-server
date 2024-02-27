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
    const id = req.params.id
    store.listOne(id)
        .then((data) => {
            // console.log(data);
            res.status(200).json({ data: data, message: 'Producto encontrado' })
        }).catch((err) => {
            res.status(500).json({ message: err.message })
        })
})

router.get('/listSize', async (req, res) => {
    store.listSize()
        .then((data) => {
            // console.log(data);
            res.status(200).json({ data: data, message: 'Producto encontrado' })
        }).catch((err) => {
            res.status(500).json({ message: err.message })
        })
})

router.post('/addProduct', async (req, res) => {
    store.add(req.body)
        .then((data) => {
            // console.log(data);
            res.status(200).json({ data: data, message: 'Producto creado' }) // Enviar los datos como una respuesta HTTP
        }).catch((err) => {
            res.status(500).json({ message: err.message })
        })
})

router.post('/addProduct/addSize', async (req, res) => {
    store.addSizeColor(req.body)
        .then((data) => {
            // console.log(data);
            res.status(200).json({ data: data, message: 'Producto creado' }) // Enviar los datos como una respuesta HTTP
        }).catch((err) => {
            res.status(500).json({ message: err.message })
        })
})

router.patch('/editProduct/:id', async (req, res) => {
    const data = req.body
    const id = req.params.id
    store.updateOne(id, data)
        .then((data) => {

            res.status(200).json({ data: data, message: 'Producto modificado' }) // Enviar los datos como una respuesta HTTP
        }).catch((err) => {
            res.status(500).json({ message: err.message })
        })

})

router.patch('/editStock/:id', async (req, res) => {
    const data = req.body
    const id = req.params.id
    store.updateStock(id, data)
        .then((data) => {
            res.status(200).json({ data: data, message: 'Stock modificado' }) // Enviar los datos como una respuesta HTTP
        }).catch((err) => {
            res.status(500).json({ message: err.message })
        })

})

router.delete('/deleteProduct/:id', async (req, res) => {
    const id = req.params.id
    const resultProductEdit = await pool.query('delete from product where id= ?', [id])
    return console.log(resultProductEdit);
})

export default router