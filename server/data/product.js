import SQ from 'sequelize';
import { sequelize } from '../db/database';
import { User } from './auth.js';

const DataTypes = SQ.DataTypes;

export const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: { type: DataTypes.TEXT, allowNull: false },
  // image: { type: DataTypes.TEXT, allowNull: false },
});
Product.belongsTo(User);

const INCLUDE_USER = {
  attributes: [
    'id',
    'category',
    'name',
    'price',
    'stock',
    'description',
    'createdAt',
    'userId',
  ],
  include: {
    model: User,
    attributes: [],
  },
};

const ORDER_DESC = {
  order: [['createdAt', 'DESC']],
};

export async function getAll() {
  return Product.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
}

export async function getAllByCategory(category) {
  return Product.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: {
      ...INCLUDE_USER.include,
      where: { category },
    },
  });
}

export async function getById(id) {
  return Product.findByPk(id, INCLUDE_USER);
}

// export async function getByName(name) {
//   return Product.findOne({ where: { name }, ...INCLUDE_USER });
// }

export async function create(
  category,
  name,
  price,
  stock,
  description,
  userId
) {
  return Product.create({ category, name, price, stock, description, userId }) //
    .then((data) => this.getById(data.dataValues.id));
}

export async function update(id, category, name, price, stock, description) {
  return Product.findByPk(id, INCLUDE_USER) //
    .then((product) => {
      product.category = category ?? product.category;
      product.name = name ?? product.name;
      product.price = price ?? product.price;
      product.stock = stock ?? product.stock;
      product.description = description ?? product.description;
      return product.save();
    });
}

export async function remove(id) {
  return Product.findByPk(id) //
    .then((product) => {
      product.destroy();
    });
}
