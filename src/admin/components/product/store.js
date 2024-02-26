import pool from "../../../database.js";

const returnData = data => {
    return {
        marca: data.marca,
        genero: data.genero,
    }
}

async function add(id) {
    const { brand, gender, name } = id;
    const [result] = await pool.query('INSERT INTO product SET ?', [{ brand, gender, name }]);

    if (result && result.insertId) {
        const [product] = await pool.query('SELECT * FROM product WHERE id = ?', [result.insertId]);
        if (product && product.length > 0) {
            console.log('Producto creado:', product);
            return product;
        } else {
            console.log('No se pudo encontrar el producto creado');
            return null;
        }
    } else {
        console.log('No se pudo insertar el producto');
        return null;
    }
}

async function listAll() {
    const resultList = await pool.query("SELECT * FROM product")
    console.log(resultList);
    return resultList
}

async function listOne(id) {
    const [resultOne] = await pool.query("SELECT * FROM product WHERE id= ?", [id])
    console.log(resultOne);
    return resultOne
}

async function updateOne(id, data) {
    const { marca, genero } = data;
    const [resultProductEdit] = await pool.query('UPDATE product SET marca = ?, genero = ? WHERE id = ?', [marca, genero, id]);

    if (resultProductEdit.affectedRows > 0) {
        const [updatedProduct] = await pool.query('SELECT * FROM product WHERE id = ?', [id]);
        if (updatedProduct && updatedProduct.length > 0) {
            console.log('Producto modificado:', updatedProduct);
            return updatedProduct;
        } else {
            console.log('No se pudo encontrar el producto modificado');
            return null;
        }
    } else {
        console.log('No se pudo actualizar el producto');
        return null;
    }
}

export const store = {
    add,
    listAll,
    listOne,
    updateOne
}