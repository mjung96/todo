import React, { useContext, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import  { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth.js';

// import { AuthContext  } from '../context/auth';
// import { useForm } from '../util/hooks';

function Login(props) {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    //const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    // const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    //     username: '',
    //     password: ''
    // });

    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }

    const[loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result){
            console.log(result);
            context.login(result.data.login); // { data: {login: userData}}
            navigate('/')
        },
        onError(err){
            //console.log(err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });

    // function loginUserCallback() {
    //     loginUser();
    // }

    const onSubmit = (event) => {
        event.preventDefault();
        loginUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Log In</h1>
                <Form.Input
                    //label="Username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    //label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Button type="submit">
                    Log In
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map((value) => (
                        <li key={value}>{value}</li>
                    ))}
                </ul>
            </div>
            )}
        </div>
    );
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
                username: $username
                password: $password
        ) {
            id 
            email 
            username 
            createdAt 
            token 
        }
    }
`

export default Login;