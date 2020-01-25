import {Loader} from "./Loader";
import React from "react";

const FullScreenLoader = () => (
  <div className="loader-container container">
    <div className="row">
      <div className="col text-center">
        <Loader/>
      </div>
    </div>
  </div>
);
export default FullScreenLoader;
