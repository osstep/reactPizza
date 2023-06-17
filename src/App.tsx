import './scss/app.scss'
import Header from './components/Header'
import Sort from './components/Sort'
import Categories from './components/Categories'
import PizzaBlock from './components/PizzaBlock'
import { useEffect, useState } from 'react'


function App() {

  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('https://648dea102de8d0ea11e8608a.mockapi.io/items').then((res) => res.json()).then((obj) => setItems(obj))
  }, [])
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj) => {
              return (
                <PizzaBlock
                  key={obj.id}
                  title={obj.title}
                  price={obj.price}
                  imgUrl={obj.imageUrl}
                  sizes={obj.sizes}
                  types={obj.types}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
