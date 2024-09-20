import { APIProductsType } from '@/lib/apiDataTypes';
import { 
  useEffect, 
  useState 
} from 'react';

export interface ICartProduct {
  id: number,
  name: string,
  images?: File[],
  imageUrl: string,
  description?: string,
  price: number,
  gender: number | string,
  sizes?: number | string,
  color?: number | string,
  brand?: number | string,
  quantity: number
}

enum QuantityAction {
  plus = 'plus',
  minus = 'minus'
}

const useCart = () => {
  const [ cartList, setCartList ] = useState<ICartProduct[]>([])

  useEffect(() => {
    const storage: string | null = localStorage.getItem('cart-list');
    if (storage) setCartList(JSON.parse(storage)) 
  }, [])

  const handleAddToCart = (product: APIProductsType): void => {

    let newList: ICartProduct[] = [...cartList];

    const existingProduct: ICartProduct | undefined = newList.find((cartProduct: ICartProduct) => (
      cartProduct.id === product.id
    ))

    if ( existingProduct ) {
      existingProduct.quantity += 1
    } else {
      const newProduct: ICartProduct = {
        id: product.id,
        name: product.attributes.name,
        imageUrl: product.attributes.images.data[0].attributes.url,
        price: product.attributes.price,
        gender: product.attributes.gender.data.attributes.name,
        quantity: 1
      };
    
      newList = [...newList, newProduct];
    }

    setCartList(newList)
  
    localStorage.setItem('cart-list', JSON.stringify(newList))
  }

  const handleQuantity =  ( productID: number, action: QuantityAction ): void => {

    const newList: ICartProduct[] = [...cartList]

    newList.forEach((product: ICartProduct) => {
      if (product.id === productID) {

        if ( action === QuantityAction.plus ) {
          product.quantity += 1

        } else {

          if (product.quantity !== 1) {
            product.quantity -= 1;
          }

        }
      }
    })

    setCartList(newList)

    localStorage.setItem('cart-list', JSON.stringify(newList))
  }

  const handleDelete = ( productID: number ): void => {

    const newList: ICartProduct[] = cartList.filter((product: ICartProduct) => (
      product.id !== productID
    ))

    setCartList(newList)

    localStorage.setItem('cart-list', JSON.stringify(newList))
  }

  return {
    cartList,
    handleAddToCart,
    handleQuantity,
    handleDelete
  }
}

export default useCart