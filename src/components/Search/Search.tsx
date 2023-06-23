import React, {useContext} from 'react'
import styles from './Search.module.scss'
import { SearchContext } from '../../App'

interface ISearchValue {
  searchValue: string,
  setSearchValue: Function
}

const Search = () => {

  const {searchValue, setSearchValue} = useContext(SearchContext)
  return (
    <input
      className={styles.root}
      type="text"
      placeholder="поиск..."
      value={searchValue}
      onChange={(event) => {
        setSearchValue(event.target.value)
        console.log(searchValue)
      }}
    />
  )
}

export default Search
