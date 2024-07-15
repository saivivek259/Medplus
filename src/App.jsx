import './App.css'
import { Navbar,Container } from 'react-bootstrap'

import { Routes,Route, useNavigate } from 'react-router-dom'
import More from './components/More'
import Home from './components/Home'
import Hospital from './components/Hosipetal'
import Logo from './assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const navigate = useNavigate()
 
  return (
    <div>
       <Navbar style={{backgroundColor:'lightgrey'}} >
        <Container  >
        <Navbar.Brand onClick={() => navigate('/') }  style={{cursor:"pointer"}} >
            <img
              alt=""
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
           <h5 style={{display:'inline' ,color:'black'}} > MedStart </h5>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={<Home/>} />
      <Route path='/more/' element={<More/>} />
      <Route path='/hospital/' element={<Hospital/>} />
      </Routes>
    </div>
  )
}

export default App