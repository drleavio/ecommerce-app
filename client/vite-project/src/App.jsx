import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'
import Product from './pages/Product'

function App() {
  

  return (
      <div style={{height:"100vh",width:"100vw",overflow:"hidden"}} className='bg-gray-600'>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<SignUp/>}/>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/add' element={<AddProduct/>}/>
              <Route path='/products/:id' element={<Product/>}/>
            </Routes>
          </BrowserRouter>
      </div>
  )
}

export default App
