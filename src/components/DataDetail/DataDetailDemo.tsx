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
      <button onClick={open}>Open</button>
      <button onClick={close}>Close</button>
      <button onClick={toggle}>Toggle</button>

      <DataDetail ref={inputRef} title={"Page Title"}>
        <DataDetail.Header></DataDetail.Header>
        <DataDetail.Body></DataDetail.Body>
        <DataDetail.Footer></DataDetail.Footer>
      </DataDetail>
    </>
  )
}