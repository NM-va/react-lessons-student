import {mockProducts} from "../data/mockData.ts";
import {Product} from "../types/checkout.ts";
import {useState} from "react";

export const CartForm = () => {
  const [productQuantities, setProductQuantities] = useState<Product[]>(mockProducts);
  
  const addedProduct = (productId: number) => {

    setProductQuantities((prevState: Product[]) => {
      console.log('prevState', prevState)
      prevState?.find((product) => {
        
        product.id === productId
        console.log('product.id === productId', product.id === productId)
      })
    })
  }
  
  const totalSum = mockProducts.reduce(
      (sum, product) => sum + product.price * product.quantity, 0
  );

  const removeProduct = () => {
    setProductQuantities((prevState: Product[]) => {
      return prevState;
    })
  }
  return (
    <>
      <div>CART</div>
      {mockProducts.map((item:Product) => {
        console.log('item.id', item.id)
        return (
          <div key={item.id}>
            <span>{item.name}</span>
            <span>{item.price}</span>
            <div>
              <button type="button" onClick={() => addedProduct(item.id)}>+</button>
              <span>{item.quantity}</span>
              <button type="button" onClick={removeProduct}>-</button>
            </div>
          </div>
        )
      })}

      <div>Общая сумма:</div>
      <div>{totalSum}</div>
    </>
  )
}