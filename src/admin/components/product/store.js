import pool from "../../../database.js";

const returnData = data => {
    return {
        marca: data.marca,
        genero: data.genero,
    }
}

async function add(data) {
    const [result] = await pool.query('INSERT INTO product SET ?', { ...data, isActive: true });

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

    try {
        const datacopy = { ...data }
        delete datacopy.amount

        const [existsProduct] = await pool.query(`SELECT * FROM product WHERE id= ?`, [datacopy.product_id])

        if (existsProduct.length > 0) {
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
        } else {
            throw new Error('No existe el producto al que quiere asignarle un tamaño y color');
        }
    } catch (error) {
        console.error('Error al agregar tamaño y color:', error);
        throw error;
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

async function updateSize(id, data) {
    const [resultSizeEdit] = await pool.query('UPDATE size SET ? WHERE id = ?', [data, id]);
    if (resultSizeEdit.affectedRows > 0) {
        const [updateSize] = await pool.query('SELECT * FROM size WHERE id = ?', [id]);
        if (updateSize && updateSize.length > 0) {
            console.log('Producto modificado:', updateSize);
            return updateSize;
        } else {
            console.log('No se pudo encontrar el producto modificado');
            return null;
        }
    } else {
        console.log('No se pudo actualizar el producto');
        return null;
    }
}


async function deleteProduct(id) {
    const [resultDeleteProduct] = await pool.query(`UPDATE product SET ? WHERE id = ?`, [{ isActive: true }, id])
    if (resultDeleteProduct.affectedRows > 0) {
        const [deleteOneProduct] = await pool.query('SELECT * FROM product WHERE id = ?', [id]);
        if (deleteOneProduct && deleteOneProduct.length > 0) {
            console.log('Producto eliminado:', deleteOneProduct);
            return deleteOneProduct;
        } else {
            console.log('No se pudo encontrar el producto eliminado');
            return null;
        }
    } else {
        console.log('No se pudo eliminar el producto');
        return null;
    }
}

async function deleteSize(id) {
    try {
        const [existSizeId] = await pool.query(`SELECT * FROM size WHERE id= ?`, [id])
        console.log(existSizeId.length);
        if (!existSizeId.length) {
            throw new Error('no existe el registro que desea borrar')
        }
        const [resultDeleteStock] = await pool.query(`DELETE FROM stock WHERE size_id = ?`, [id])
        console.log('registros borrados de stock', resultDeleteStock);
        const [resultDeleteSize] = await pool.query(`DELETE FROM size WHERE id= ?`, [id])
        console.log('Registro eliminado de size:', resultDeleteSize);

        return resultDeleteSize
    } catch (error) {
        console.log('No se pudo eliminar el resgistro');
        throw error;
    }

}

export const store = {
    listAll,
    listOne,
    listSize,
    add,
    addSizeColor,
    updateOne,
    updateStock,
    updateSize,
    deleteProduct,
    deleteSize
}