'use strict';

const categories = (sequelize, DataTypes) => sequelize.define('categories', {
    id: { type: DataTypes.INTEGER,  required: true, primaryKey:true},
    description: { type: DataTypes.STRING,  required: true},
    displayName: { type: DataTypes.STRING,  required: true},

  
});

module.exports = categories;