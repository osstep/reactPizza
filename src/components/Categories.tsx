import {useState} from 'react';

function Categories() {
  
  
  const [activeIndex, setActiveIndex] = useState(0)
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']
  const onClickCategory = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <div className="categories">
      <ul>
        {
          categories.map((value, index) => {
            return <li key={index} onClick={() => {
              onClickCategory(index)
            }} className={activeIndex === index ? 'active' : ''}>{value}</li>
          })
        }
        
      </ul>
    </div>
  )
}

export default Categories
