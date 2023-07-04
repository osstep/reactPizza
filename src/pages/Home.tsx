import { useState, useEffect, useContext, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import Categories from '../components/Categories'
import Sort, { list } from '../components/Sort'
import Skeleton from '../components/Skeleton'
import PizzaBlock from '../components/PizzaBlock'
import { SearchContext } from '../App'
import {
  setCategoryId,
  setSortType,
  setFilters,
} from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzasSlice'


interface IData {
  id: number
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
}

const Home = () => {
  const navigate = useNavigate()
  const categoryId = useSelector((state) => state.filter.categoryId)
  const sortType = useSelector((state) => state.filter.sort)
  const items = useSelector((state) => state.pizza.items)
  const status = useSelector((state) => state.pizza.status)
  const dispatch = useDispatch()
  const { searchValue, setSearchValue } = useContext(SearchContext)
  const [isLoading, setIsLoading] = useState(true)
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const getPizzas = async () => {
      dispatch(fetchPizzas({categoryId, sortType, searchValue}))
    }
    
  const onClickCategory = (index: number) => {
    dispatch(setCategoryId(index))
  }

  const setActiveItem = (i: number) => {
    dispatch(setSortType(i))
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty)
      dispatch(setFilters({ ...params, sort }))
      isSearch.current = true
    }
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)

    if (!isSearch.current) {
      getPizzas()

    }
    console.log('проверка');
    
    isSearch.current = false
  }, [categoryId, sortType, searchValue])

  useEffect(() => {
    if (isMounted.current) {
      const querySrting = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
      })

      navigate(`?${querySrting}`)
    }

    isMounted.current = true
  }, [categoryId, sortType.sortProperty])

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
        {status === 'error' ? (
          <div>Что-то пошло не так...</div>
        ) : (status === 'success'
          ? items.map((obj) => {
              return (
                <PizzaBlock
                  id={obj.id}
                  key={obj.id}
                  title={obj.title}
                  price={obj.price}
                  imgUrl={obj.imageUrl}
                  sizes={obj.sizes}
                  types={obj.types}
                />
              )
            })
          : [...new Array(6)].map((_, index) => <Skeleton key={index} />))}
      </div>
    </>
  )
}

export default Home
