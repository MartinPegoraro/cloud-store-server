import pool from "../../../database.js";

const returnData = data => {
    return {
        marca: data.marca,
        genero: data.genero,
    }
}

async function add(data) {
    const [result] = await pool.query('INSERT INTO product SET ?', data);

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
async function addSizeColor(data) {
    const datacopy = { ...data }
    delete datacopy.amount

    const [result] = await pool.query('INSERT INTO size SET ?', datacopy)

    if (result && result.insertId) {
        const [sizeColor] = await pool.query('SELECT * FROM size WHERE id = ?', [result.insertId]);
        if (sizeColor && sizeColor.length > 0) {

            console.log(data.amount);
            const stockData = {
                size_id: result.insertId,
                amount: data.amount,
                uploadDate: new Date()
            };
            const [stockResult] = await pool.query('INSERT INTO stock SET ?', stockData);
            if (stockResult && stockResult.insertId) {
                console.log('Stock creado:', stockResult.insertId);
            } else {
                console.log('No se pudo insertar el stock');
            }
            return sizeColor;
        } else {
            console.log('No se pudo encontrar el talle creado');
            return null;
        }
    } else {
        console.log('No se pudo insertar el talle');
        return null;
    }
}

async function listAll() {
    const [resultList] = await pool.query("SELECT * FROM product")
    console.log(resultList);
    return resultList
}

async function listSize() {
    const [resultList] = await pool.query(`
    SELECT size.*, product.*, stock.amount
    FROM size
    INNER JOIN product ON size.product_id = product.id
    INNER JOIN stock ON  stock.size_id = size.id 
`)
    console.log(resultList);
    return resultList
}

async function listOne(id) {
    const [resultOne] = await pool.query("SELECT * FROM product WHERE id= ?", [id])
    console.log(resultOne);
    return resultOne
}

async function updateOne(id, data) {
    const [resultProductEdit] = await pool.query('UPDATE product SET ? WHERE id = ?', [data, id]);
    console.log(resultProductEdit);
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

async function updateStock(id, data) {
    const [resultProductEdit] = await pool.query('UPDATE stock SET ? WHERE size_id = ?', [{ ...data, uploadDate: new Date() }, id]);
    console.log(resultProductEdit);
    if (resultProductEdit.affectedRows > 0) {
        const [updatedProduct] = await pool.query(`
        SELECT size.*, product.*, stock.amount
        FROM size
        INNER JOIN product ON size.product_id = product.id
        INNER JOIN stock ON  stock.size_id = size.id 
        where size.id = ?
    `, [id]);
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
    updateOne,
    addSizeColor,
    listSize,
    updateStock
}