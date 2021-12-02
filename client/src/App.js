import React, { useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { Container } from 'semantic-ui-react';
import { AuthProvider } from './auth';
import AuthRoute from './AuthRoute'
//import { AuthContext } from './auth.js';


function App() {
  //const context = useContext(AuthContext);


  // useEffect(() => {
  //   console.log(context);
  // }, [AuthContext])

  return (
    <AuthProvider>
      <Router> 
        <Container>
          <MenuBar />
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
