import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Skeleton from '../components/Skeleton'
import PizzaBlock from '../components/PizzaBlock'
import { useState, useEffect } from 'react'



const Home = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('https://648dea102de8d0ea11e8608a.mockapi.io/items')
      .then((res) => res.json())
      .then((obj) => setItems(obj))
  }, [])
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items.length
          ? items.map((obj) => {
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
            })
          : [...new Array(6)].map((_, index) => <Skeleton key={index} />)}
      </div>
    </>
  )
}

export default Home
