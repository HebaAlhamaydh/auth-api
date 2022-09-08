"use strict";
require('dotenv').config();

// Connects to our database depending on the URI as an environmental variable
const { Sequelize, DataTypes } = require("sequelize");
const foodModel = require('./food');
const clothesModel  = require('./clothes');
const productsModel  = require('./products');
const categoriesModel  = require('./categories');
const userModel=require('./users');
const Collection =require('./data-collection');

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl :{require: true,
                    rejectUnauthorized: false},
                native: true
            }
        } : {};


// we are going to use this to connect to Postgres
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const FoodTable = foodModel(sequelize, DataTypes);
const clothesTable = clothesModel (sequelize, DataTypes);
const productsTable = productsModel (sequelize, DataTypes);
const categoriesTable = categoriesModel (sequelize, DataTypes);

//  const usersCollection = new Collection(usersTable);


module.exports = {
    sequelize: sequelize,
    DataTypes:DataTypes,
    food:new Collection(FoodTable),
    clothes:new Collection(clothesTable),
   products:new Collection(productsTable),
   categories:new Collection(categoriesTable),
    Users:userModel(sequelize, DataTypes)
};

