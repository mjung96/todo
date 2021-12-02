const listsResolvers = require('./lists');
const usersResolvers = require('./users');
const listItemsResolvers = require('./listItems');

module.exports = {
    Query: {
        ...listsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...listsResolvers.Mutation,
        ...listItemsResolvers.Mutation 
    }
}