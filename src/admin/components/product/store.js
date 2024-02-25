import pool from "../../../database.js";

const returnData = data => {
    return {
        marca: data.marca,
        genero: data.genero,
    }
}

async function add(id) {
    const { marca, genero } = id
    const resultProduct = await pool.query('INSERT INTO product SET ?', [{ marca, genero }])
    console.log(resultProduct);
    return returnData(resultProduct)
}

async function listAll() {
    const resultList = await pool.query("SELECT * FROM product")
    console.log(resultList);
    return resultList
}

export const store = {
    add,
    listAll
}