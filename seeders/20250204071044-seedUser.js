"use strict";

const bcrypt = require("bcrypt");
const hash = (password) => {
    return bcrypt.hashSync(password, 10);
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        let seedUser = [
            {
                user_id: 1,
                username: "admin",
                password: hash("admin123"),
                role: "admin",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                user_id: 2,
                username: "company",
                password: hash("company123"),
                role: "company",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                user_id: 3,
                username: "outlet",
                password: hash("outlet123"),
                role: "outlet",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        return queryInterface.bulkInsert("user", seedUser);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
