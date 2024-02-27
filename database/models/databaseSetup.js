import pool from "../../src/database.js";


export async function createTableProduct() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS product (
            id INT AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255),
            category VARCHAR(255),
            gender ENUM('Hombre', 'Mujer', 'Niños', 'Unisex'),
            season VARCHAR(255),
            material VARCHAR(255),
            img VARCHAR(255),
            miniature VARCHAR(255),
            brand VARCHAR(255),
            isActive BOOLEAN,
            price DECIMAL(10, 2),
            PRIMARY KEY(id)
        )
    `;
    await pool.query(createTableQuery);
}

export async function createTableUser() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS user (
            id INT AUTO_INCREMENT,
            firstName VARCHAR(255),
            lastName VARCHAR(255),
            password VARCHAR(255),
            username VARCHAR(255),
            email VARCHAR(255),
            PRIMARY KEY(id)
        )
    `;
    await pool.query(createTableQuery);
}

export async function createTableStock() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS stock (
            id INT AUTO_INCREMENT,
            size_id INT,
            amount INT,
            bestSeller INT,
            uploadDate DATE,
            FOREIGN KEY (size_id) REFERENCES size(id),
            PRIMARY KEY(id)
        )
    `;
    await pool.query(createTableQuery);
}

export async function createTableSize() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS size (
            id INT AUTO_INCREMENT,
            product_id INT,
            size VARCHAR(255),
            color VARCHAR(255),
            widthSize DECIMAL(10,2),
            longSize DECIMAL(10,2),
            FOREIGN KEY (product_id) REFERENCES product(id),
            PRIMARY KEY(id)
        )
    `;
    await pool.query(createTableQuery);
}

//en dudas si debe ir esta tabla

// export async function createTableImg() {
//     const createTableQuery = `
//         CREATE TABLE IF NOT EXISTS images (
//             id INT AUTO_INCREMENT,
//             product_id INT,
//             imgs VARCHAR(255),
//             miniature VARCHAR(255),
//             FOREIGN KEY (product_id) REFERENCES product(id),
//             PRIMARY KEY(id)
//         )
//     `;
//     await pool.query(createTableQuery);
// }