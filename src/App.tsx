import './scss/app.scss'
import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound/NotFound'
import Cart from './pages/Cart'
import { Routes, Route } from 'react-router-dom'

function App() {
  
  

  return (
    <div className="wrapper">
      
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route
                path="/pizza"
                element={<Home />}
              ></Route>
              <Route
                path="/pizza/cart"
                element={<Cart />}
              />
              <Route
                path="/pizza/*"
                element={<NotFound />}
              ></Route>
            </Routes>
          </div>
        </div>
      
    </div>
  )
}

export default App
