const { gql } = require('apollo-server');

module.exports = gql`
    type List{
        id: ID!
        title: String!
        createdAt: String!
        username: String!
        listItems: [ListItem]!
    }
    type ListItem{
        id: ID!
        createdAt: String!
        username: String!
        description: String!
        isComplete: Boolean!
    }
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query{
        getLists: [List]
        getList(listId: ID!): List
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createList(title: String!): List!
        deleteList(listId: ID!): String!
        createListItem(listId: String!, description: String!): List!
        deleteListItem(listId: ID!, listItemId: ID!): List!
    }
`