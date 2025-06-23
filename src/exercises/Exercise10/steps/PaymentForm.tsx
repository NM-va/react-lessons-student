import {PaymentMethods} from "../types/checkout.ts";
import {UniversalInput} from "../../../components/UniversalInput.tsx";
import { ChangeEvent, useState } from 'react';

export const PaymentForm = () => {
  const [numberCard, setNumberCard] = useState<string>('000');
  const [selectedPayment, setSelectedPayment] = useState<string>(PaymentMethods.CASH);
  
  const onChangeNumberCard = (newNumber: string) => {
    setNumberCard(newNumber);
  }

  const onSelectPayment = (e: ChangeEvent<HTMLSelectElement>) => {
      setSelectedPayment(e.target.value);
  }
  
  return (
    <div>
      <div>PAYMENT</div>
      <div>Выберите способ оплаты:</div>
      <select onChange={onSelectPayment} value={selectedPayment}>
        {
          Object.values(PaymentMethods).map((item) => {
            return (
              <option key={item}>{item}</option>
            )
          })
        }
      </select>
      { selectedPayment === PaymentMethods.CARD &&
        <div>
          <div>Номер карты:</div>
          <UniversalInput value={numberCard} onChange={onChangeNumberCard} />
        </div>
      }
    </div>
  )
}