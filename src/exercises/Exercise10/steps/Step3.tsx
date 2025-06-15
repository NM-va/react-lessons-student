import {PaymentMethods} from "../types/checkout.ts";
import {UniversalInput} from "../../../components/UniversalInput.tsx";
import {useState} from "react";

export const Step3 = () => {
  const [numberCard, setNumberCard] = useState<string>('000');
  const onChangeNumberCard = (newNumber: string) => {
    setNumberCard(newNumber);
  }

  return (
    <div>
      <div>Выберите способ оплаты:</div>
      <select>
        {
          Object.values(PaymentMethods).map((item) => {
            return (
              <option>{item}</option>
            )
          })
        }
      </select>
      { PaymentMethods.CARD &&
        <div>
          <div>Номер карты:</div>
          <UniversalInput value={numberCard} onChange={onChangeNumberCard}/>
        </div>
      }
    </div>
  )
}