import './scss/app.scss'
import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound/NotFound'
import Cart from './pages/Cart'
import { Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
export const SearchContext = React.createContext()

function App() {
  const [searchValue, setSearchValue] = useState('')
  

  return (
    <div className="wrapper">
      <SearchContext.Provider
        value={{ searchValue: searchValue, setSearchValue: setSearchValue }}
      >
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              ></Route>
              <Route
                path="/cart"
                element={<Cart />}
              />
              <Route
                path="*"
                element={<NotFound />}
              ></Route>
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  )
}

export default App
