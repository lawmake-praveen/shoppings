import db from "../config/db.js";

export const getProducts = async (startOffset, pageSize) =>
  db.execute(`select * from products limit ? offset ?`, [
    pageSize,
    startOffset,
  ]);

export const getProductById = async (productId) =>
  db.execute(`select * from products where id=?`, [productId]);

export const addProduct = async (product) =>
  db.execute(
    `insert into products (name, price, description, quantity, createdAt, image) values ('${product.name}', '${product.price}', '${product.description}', '${product.quantity}', '${product.createdAt}', '${product.image}')`
  );

export const editProduct = async (product) =>
  db.execute(
    `update products set name=?, price=?, description=?, quantity=?, image=?, updatedAt=? where id=?`,
    [
      product.name,
      product.price,
      product.description,
      product.quantity,
      product.image,
      product.updatedAt,
      product.id,
    ]
  );

export const deleteProduct = async (productId) =>
  db.execute(`delete from products where id=?`, [productId]);
