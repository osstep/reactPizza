import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Skeleton from '../components/Skeleton'
import PizzaBlock from '../components/PizzaBlock'
import { useState, useEffect, useContext } from 'react'
import { types } from 'sass'
import { SearchContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId, setSortType } from '../redux/slices/filterSlice'

interface IData {
  id: number,
  title: string,
  price: number,
  imageUrl: string,
  sizes: number[],
  types: number[],

}

const Home = () => {

  const categoryId = useSelector(state => state.filter.categoryId)
  const sortType = useSelector(state => state.filter.sort)
  const dispatch = useDispatch()
  const {searchValue, setSearchValue} = useContext(SearchContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  
  

  const onClickCategory = (index: number) => {
    dispatch(setCategoryId(index))
  }

  const setActiveItem = (i: number) => {
    dispatch(setSortType(i))
  }

  useEffect(() => {
    setIsLoading(true)
    fetch(
      'https://648dea102de8d0ea11e8608a.mockapi.io/items?category=' +
        `${!categoryId ? '' : categoryId}&sortBy=${sortType.sortProperty}&search=${searchValue ? searchValue : ''}`
    )
      .then((res) => res.json())
      .then((obj) => {
        setItems(obj)
        setIsLoading(false)
      })

    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue])
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
