import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'
import Product from './pages/Product'
import Cart from './pages/Cart'
import NavBar from './components/NavBar'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Thanks from './pages/Thanks'

function App() {
  

  return (
      <div style={{height:"100vh",width:"100vw",overflowY:"auto"}} className='bg-white'>
          <BrowserRouter>
          <NavBar/>
            <Routes>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<SignUp/>}/>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/add' element={<AddProduct/>}/>
              <Route path='/products/:id' element={<Product/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/checkout' element={<Checkout/>}/>
              <Route path='/orders' element={<Orders/>}/>
              <Route path='/thanks' element={<Thanks/>}/>
            </Routes>
          </BrowserRouter>
      </div>
  )
}

export default App
