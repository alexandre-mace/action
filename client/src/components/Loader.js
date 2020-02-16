import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

export const Loader = ({size = 40}) => {
  return (
    <div className="d-flex absolute-center">
      <div className="m-auto">
        <CircularProgress size={size}/>
      </div>
    </div>
  )
}
