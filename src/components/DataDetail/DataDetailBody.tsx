import React, {ReactNode} from "react";
import DataDetail from "./DataDetail.tsx";

DataDetail.Body = ({children}: ReactNode) => {
  return (
    <div className="data-detail-body">{children}</div>
  )
};