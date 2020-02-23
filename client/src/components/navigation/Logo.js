import React from "react";

const Logo = (props) => (
      <div className="col w-100">
        <span className="logo" onClick={() => props.history.push('/')}>Action</span>
      </div>
);
export default Logo;
