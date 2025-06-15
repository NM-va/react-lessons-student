import {mockProducts} from "../data/mockData.ts";
import {Product} from "../types/checkout.ts";
import {useState} from "react";

export const Step1 = () => {

  const [productCount, setProductCount] = useState<number>(0);
  const addedProduct = () => {
    setProductCount((prevState: number) => {
        return prevState + 1;
      })
  }

  const removeProduct = () => {
    setProductCount((prevState: number) => {
      return prevState - 1;
    })
  }
  return (
    <>
      {mockProducts.map((item:Product) => {
        return (
          <div key={item.id}>
            <span>{item.name}</span>
            <span>{item.price}</span>
            <div>
              <button type="button" onClick={addedProduct}>+</button>
              <span>{productCount}</span>
              <button type="button" onClick={removeProduct}>-</button>
            </div>

          </div>
        )
      })}

      <div>Общая сумма:</div>
    </>
  )
}