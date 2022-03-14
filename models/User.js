const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// Add the bcrypt package to the application, we use it to hash the password
const bcrypt = require('bcrypt');

// create user model
class User extends Model {

}

// define table columns and configuration
User.init({
    // TABLE COLUMN DEFINITIONS GO HERE
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
        }
    }
}, {
    hooks: {
        // set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            // return bcrypt.hash(userData.password, 10).then(newUserData => {
            return newUserData;
        },
        // set up beforeUpdate lifecyle "hook" functionality
        async beforeUpdate(updateUserData) {
            updateUserData.password = await bcrypt.hash(updateUserData.password, 10);
            return updateUserData;
        }
    },
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
});

module.exports = User;