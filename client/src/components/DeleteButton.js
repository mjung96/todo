import React, { useState } from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { Button, Icon } from 'semantic-ui-react';

//import Home from '../pages/Home';

function DeleteButton({ listId, callback, listItemId }) {

    // const [confirmOpen, open] = useState(false);

    const mutation = listItemId ? DELETE_LISTITEM_MUTATION : DELETE_LIST_MUTATION;

    const [deleteList] = useMutation(mutation, {
        update(){
            //open(false);
            if(callback) callback();
            window.location.reload(true);

        },
        variables: {
            listId,
            listItemId
        }
    });

    return (
        <>
        <Button 
            as="div" 
            color="red" 
            floated="right" 
            onClick={deleteList}>
            <Icon name ="trash" style={{ margin: 0 }}/>
        </Button>
        </>
    )

}

const DELETE_LIST_MUTATION = gql `
    mutation deleteList($listId: ID!) {
        deleteList(listId: $listId)
    }    
`;

const DELETE_LISTITEM_MUTATION = gql `
    mutation deleteListItem($listId: ID!, $listItemId: ID!) {
        deleteListItem(listId: $listId, listItemId: $listItemId) {
            id
            listItems {
                id
                username 
                createdAt 
                description
                isComplete
            }
        }
    }
`

export default DeleteButton