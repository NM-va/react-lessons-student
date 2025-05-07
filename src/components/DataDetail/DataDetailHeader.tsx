import React, {useImperativeHandle, useState} from "react";
import DataDetail, {DataDetailHandles, DataDetailProps, useDataDetail} from "./DataDetail.tsx";


DataDetail.Header = ({title, expanded, onExpand, ref, children}: DataDetailProps) => {
  const [isToggle, setToggle] = () => useState<boolean>(false);

  useImperativeHandle(ref, ():DataDetailHandles => {
    return {
      open: () => {setToggle(true)},
      close: () => {setToggle(false)},
      toggle: () => {setToggle(!isToggle)}
    };
  });

  const detail = useDataDetail();

  return (
    <div className="data-detail-header">
      <div className={isToggle? "open" : "close"}>
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </div>
  )
};