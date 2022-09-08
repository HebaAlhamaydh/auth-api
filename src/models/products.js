'use strict';

const products = (sequelize, DataTypes) => sequelize.define('products', {
    id: { type: DataTypes.INTEGER,  required: true, primaryKey:true},
    categoryId: { type: DataTypes.INTEGER, required: true},
    categoryAssociation: { type: DataTypes.STRING,  required: true},
    displayName: { type: DataTypes.STRING,  required: true},
    description: { type: DataTypes.STRING,  required: true},
    price: { type: DataTypes.INTEGER,  required: true},
    inventoryCount: {type: DataTypes.INTEGER,  required: true},
    image: { type: DataTypes.STRING,  required: true},
  
});

module.exports = products;