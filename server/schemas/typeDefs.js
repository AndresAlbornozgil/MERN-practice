const typeDefs = `
    type Food {
        _id: ID
        name: String!
        description: String!
        price: Float
    }

    type Query {
        foods: [Food]!
    }

    type Mutation {
        addFood(name: String!, description: String!, price: Float!): Food
    }
`



module.exports = typeDefs;
