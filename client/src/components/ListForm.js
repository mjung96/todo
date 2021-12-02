import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from './hooks';
//import { FETCH_POSTS_QUERY } from '../util/graphql';

function ListForm() {
    //const [errors, setErrors] = useState({});
    const { values, onChange, onSubmit } = useForm(createListCallback, {
        //description: '',
        
        title: ''
    });

    const [createList, { error }] = useMutation(CREATE_LIST_MUTATION, {
        variables: values,
        update(proxy, result) {
            //console.log(result)
            const data = proxy.readQuery({
                query: FETCH_LISTS_QUERY
            });
            data.getLists = [result.data.createList, ...data.getLists]
            proxy.writeQuery({ query: FETCH_LISTS_QUERY, data });
            values.title = ''
            window.location.reload(true);
        }
    })

    function createListCallback() {
        if(createList()) {
          //window.location.reload(true);
        }
        //window.location.reload(true);
    }


    return (
        <>
          <Form onSubmit={onSubmit}>
            <h2>Add List</h2>
            <Form.Field>
              <Form.Input
                placeholder="Title"
                name="title"
                onChange={onChange}
                value={values.title}
                error={error ? true : false}
              />
              <Button type="submit" style={{ marginBottom: 20 }}>
                Submit
              </Button>
            </Form.Field>
          </Form>
          {error && (
            <div className="ui error message" style={{ marginBottom: 20 }}>
              <ul className="list">
                {/* <li>{error.ApollError}</li> */}
                <li>{error.graphQLErrors[0].message}</li>
              </ul>
            </div>
          )}
        </>
    )
}

const CREATE_LIST_MUTATION = gql `
    mutation createList($title: String!) {  
        createList(title: $title) {
            id
            title
            createdAt 
            username 
            listItems {
                id 
                description 
                username 
                createdAt 
                isComplete
            }
        }
    }
`;

const FETCH_LISTS_QUERY = gql` {
    getLists{
        id
        title
        username 
        createdAt 
        listItems {
            id 
            username 
            createdAt 
            description
            isComplete
        }
    }
}
`;

export default ListForm