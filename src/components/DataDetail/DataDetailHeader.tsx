import React, {useImperativeHandle, useState} from "react";
import DataDetail, {DataDetailHandles, DataDetailProps} from "./DataDetail.tsx";


export const Header = ({title, expanded, children}: DataDetailProps) => {
  
  return (
    <div className="data-detail-header">
      <div className={expanded? "open" : "close"}>
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </div>
  )
};