const { Food } = require('../models/Food');

const resolvers = {
    Query: {
        foods: async () => {
            return Food.find({});
        }
    },
    Mutation: {
        addFood: async (parent, {name, description, price}) => {
            return await Food.create({name, description, price});
        }
    }
};

module.exports = resolvers;
