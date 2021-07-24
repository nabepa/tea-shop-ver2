import * as productRepository from '../data/product.js';

export async function getProducts(req, res) {
  const category = req.query.category;
  const products = await (category
    ? productRepository.getAllByCategory(category)
    : productRepository.getAll());
  res.status(200).json(products);
}

export async function getProduct(req, res) {
  const id = req.params.id;
  const product = await productRepository.getById(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: `Product id(${id}) not found.` });
  }
}

export async function createProduct(req, res) {
  if (!req.role) {
    return res
      .status(403)
      .json({ message: 'You do not have rights to upload product.' });
  }
  const { category, name, price, stock, description } = req.body;
  const product = await productRepository.create(
    category,
    name,
    price,
    stock,
    description,
    req.userId
  );
  res.status(201).json(product);
}

export async function updateProduct(req, res) {
  if (!req.role) {
    return res
      .status(403)
      .json({ message: 'You do not have rights to upload product.' });
  }
  const id = req.params.id;
  const product = await productRepository.getById(id);
  if (!product) {
    return res.status(404).json({ message: `Product id(${id}) not found.` });
  }
  if (product.userId !== req.userId) {
    return res.status(403).json({ message: 'This is not your product' });
  }
  const { category, name, price, stock, description } = req.body;
  const updated = await productRepository.update(
    id,
    category,
    name,
    price,
    stock,
    description
  );
  res.status(200).json(updated);
}

export async function removeProduct(req, res) {
  if (!req.role) {
    return res
      .status(403)
      .json({ message: 'You do not have rights to upload product.' });
  }
  const id = req.params.id;
  const product = await productRepository.getById(id);
  if (!product) {
    return res.status(404).json({ message: `Product id(${id}) not found.` });
  }
  if (product.userId !== req.userId) {
    return res.status(403).json({ message: 'This is not your product' });
  }
  await productRepository.remove(id);
  res.sendStatus(204);
}
