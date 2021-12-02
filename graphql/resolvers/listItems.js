const List = require('../../models/List')
const checkAuth = require('../../util/check-auth');
const { AuthenicationError, UserInputError } = require('apollo-server');

module.exports = {
    Mutation: {
        createListItem: async (_, { listId, description }, context) => {
            const { username } = checkAuth(context);
            if (description.trim() === '') {
                throw new UserInputError('Empty description', {
                    errors: {
                        body: 'List item must have a description'
                    }
                });
            }
            const list = await List.findById(listId);

            if (list) {
                list.listItems.push({
                    description,
                    username,
                    createdAt: new Date().toISOString(),
                    isComplete: false
                });
                await list.save();
                return list;
            } 
            else throw new UserInputError('List not found');
        },
        async deleteListItem(_, { listId, listItemId }, context) {
            const { username } = checkAuth(context);
            const list = await List.findById(listId);

            if (list) {
                const listItemIndex = list.listItems.findIndex(c => c.id === listItemId);
                if (list.listItems[listItemIndex].username === username) {
                    list.listItems.splice(listItemIndex, 1);
                    await list.save();
                    return list;
                }
                else {
                    throw new AuthenticationError('Action not allowed');
                }
            }
            else {
                throw new UserInputError('Post not found');
            }
        }
    }
}