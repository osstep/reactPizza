import { useDispatch, useSelector } from 'react-redux'
import styles from './Search.module.scss'
import { setSearchValue } from '../../redux/slices/filterSlice'
import { RootState } from '../../redux/store'




const Search = () => {
  
  const searchValue = useSelector((state: RootState) => state.filter.searchValue)
  const dispatch = useDispatch()
  
  return (
    <input
      className={styles.root}
      type="text"
      placeholder="поиск..."
      value={searchValue}
      onChange={(event) => {
        dispatch(setSearchValue(event.target.value))
        console.log(searchValue)
      }}
    />
  )
}

export default Search
