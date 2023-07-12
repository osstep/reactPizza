import { useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addItemToCart } from '../redux/slices/cartSlice'
import { RootState } from '../redux/store'


interface IPizzaBlock {
  id: number
  title: string
  price: number
  imgUrl: string
  sizes: number[]
  types: number[]
}
const PizzaBlock: React.FC<IPizzaBlock> = (props) => {
  
  
  const { id, title, price, imgUrl, sizes, types } = props
  const item = useSelector((state: RootState) => state.cart.items.find((obj) => obj.id === id))
  
  const typeNames = ['тонкое', 'традиционное']
  const [activeType, setActiveType] = useState<number>(0)
  const [activeSize, setActiveSize] = useState<number>(0)
  const dispatch = useDispatch()

  
  
  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imgUrl,
      type: activeType,
      size: activeSize,
      count: 1
    };

    dispatch(addItemToCart(item))
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img
          className="pizza-block__image"
          src={imgUrl}
          alt="Pizza"
        />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((value: number, index) => {
              return (
                <li
                  onClick={() => {
                    setActiveType(index)
                  }}
                  key={value}
                  className={index === activeType ? 'active' : ''}
                >
                  {typeNames[value]}
                </li>
              )
            })}
          </ul>
          <ul>
            {sizes.map((value, index) => {
              return (
                <li
                  onClick={() => {
                    setActiveSize(index)
                  }}
                  key={value}
                  className={index === activeSize ? 'active' : ''}
                >
                  {value} см.
                </li>
              )
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              ></path>
            </svg>
            <span>Добавить</span>
            <i>{item ? item.count : 0}</i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock
