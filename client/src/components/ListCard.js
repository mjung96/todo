import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Icon, Label, Image, Form } from 'semantic-ui-react';
import { AuthContext } from '../auth'
import DeleteButton from './DeleteButton';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';


function ListCard({ 
    list: { title, createdAt, id, username, listItems }
}){ 

    const { user } = useContext(AuthContext);
    const [item, setItem] = useState('');
    //const [list, setList] = useState(listItems);

    // let submitId = id;


    // console.log(id)
    // console.log(title)

    // useEffect(()=>{
    //     console.log(item)
    // }, [item])

    const [submitListItem] = useMutation(SUBMIT_LISTITEM_MUTATION, {
        update() {
            setItem('');
            window.location.reload(true);
        },
        variables: {
            listId: id,
            description: item
        }
    }) 

    // useEffect(() => {
    //     setList(listItems);
    // }, [list])


    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {title}
                    {user && user.username === username && <DeleteButton listId={id} />} 
                    <br/>
                    <h5>{username}</h5>
                    <Form>
                        <div className="ui action input fluid">
                            <input
                                type="text"
                                placeholder="Add Item"
                                name="listItem"
                                value={item}
                                onChange={event => setItem(event.target.value)}
                            />
                            <button type="submit"
                                className="ui button"
                                disabled={item.trim() === ''}
                                onClick={submitListItem}
                                >
                                Add 
                            </button>
                        </div>
                    </Form>
                </Card.Header>
            </Card.Content>
            <Card.Content>
                {/* <h5>listItems</h5> */}
                {listItems.map(x => (
                    <>
                    <h5>{x.description}</h5> 
                    <DeleteButton listId={id} listItemId={x.id}/>
                    </>
                ))}
            </Card.Content>
        </Card>
    )
} 

export default ListCard

const SUBMIT_LISTITEM_MUTATION = gql `
    mutation($listId: String!, $description: String!) {
        createListItem(listId: $listId, description: $description) {
            id
            title
            listItems {
                id 
                createdAt 
                username 
                description 
                isComplete
            }
        }
    }
`