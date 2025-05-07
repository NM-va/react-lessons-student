import DataDetail, {DataDetailHandles} from "./DataDetail.tsx";
import {useRef} from "react";

export const DataDetailDemo = () => {
  const inputRef = useRef<DataDetailHandles>(null);
  const open = () => {
    // Вызываем императивный метод
    inputRef.current?.open();
  };

  const close = () => {
    // Вызываем императивный метод
    inputRef.current?.close();
  };

  const toggle = () => {
    // Вызываем императивный метод
    inputRef.current?.toggle();
  };


  return (
    <>

      <DataDetail ref={inputRef} title={"Page Title"}>
        <DataDetail.Header onClose={() => console.log('onClose')}>header</DataDetail.Header>
        <DataDetail.Body>body</DataDetail.Body>
        <DataDetail.Footer>footer</DataDetail.Footer>
        <DataDetail.Actions>
          <button onClick={open}>Open</button>
          <button onClick={close}>Close</button>
          <button onClick={toggle}>Toggle</button>
        </DataDetail.Actions>
      </DataDetail>
    </>
  )
}