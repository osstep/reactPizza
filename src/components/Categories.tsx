interface CategoriesProps {
  value: number
  onClickCategory: (i: number) => void
}

const Categories: React.FC<CategoriesProps> = (props) => {
  
  const {value, onClickCategory} = props
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытыe']


  

  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryName, index) => {
            return <li key={index} onClick={() => {
              onClickCategory(index)
            }} className={value === index ? 'active' : ''}>{categoryName}</li>
          })
        }
        
      </ul>
    </div>
  )
}

export default Categories
