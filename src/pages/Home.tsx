import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Skeleton from '../components/Skeleton'
import PizzaBlock from '../components/PizzaBlock'
import { useState, useEffect } from 'react'

const Home = () => {
  const [items, setItems] = useState([])
  const [categoryId, setCategoriId] = useState(0)
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  })
  const [isLoading, setIsLoading] = useState(true)

  const onClickCategory = (index: number) => {
    setCategoriId(index)
  }

  const setActiveItem = (i: number) => {
    setSortType(i)
  }

  useEffect(() => {
    setIsLoading(true)
    fetch(
      'https://648dea102de8d0ea11e8608a.mockapi.io/items?category=' +
        `${!categoryId ? '' : categoryId}&sortBy=${sortType.sortProperty}`
    )
      .then((res) => res.json())
      .then((obj) => {
        setItems(obj)
        setIsLoading(false)
      })

    window.scrollTo(0, 0)
  }, [categoryId, sortType])
  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={onClickCategory}
        />
        <Sort
          setActiveItem={setActiveItem}
          value={sortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {!isLoading
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
