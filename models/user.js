"use strict";

const bcrypt = require("bcrypt");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }

        /**
         * Check if password matches the user's password
         * @param {string} password
         * @returns {Promise<boolean>}
         */
        async isPasswordMatch(password) {
            return await bcrypt.compare(password, this.password);
        }
    }
    user.init(
        {
            user_id: {
                primaryKey: true,
                type: DataTypes.STRING,
            },
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.ENUM("admin", "company", "outlet"),
        },
        {
            sequelize,
            modelName: "user",
            freezeTableName: true,
        }
    );
    return user;
};
