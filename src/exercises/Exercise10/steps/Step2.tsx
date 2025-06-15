import {DeliveryMethods} from "../types/checkout.ts";
import {UniversalInput} from "../../../components/UniversalInput.tsx";
import {useState} from "react";

export const Step2 = () => {
  const [addressDelivery, setAddressDelivery] = useState<string>('');
  const onChangeAddress = (newValue: string) => {
    setAddressDelivery(newValue);
  }

  return (
    <>
      <div>Выберите способ доставки:</div>
      <select>
        {
          Object.values(DeliveryMethods).map((item) => {
            return (
              <option>{item}</option>
            )
          })
        }
      </select>
      <div>
        <div>Адрес доставки:</div>
        <UniversalInput value={addressDelivery} onChange={onChangeAddress}/></div>
    </>
  )
}