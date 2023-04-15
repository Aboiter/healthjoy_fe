import React from "react";

import "./style/Loader.css";

const Loader = props => {
    return (
        <div className="loaderbox">
            <div className="lds-ripple">
                <div/>
                <div/>
            </div>
        </div>
    )
}

export default Loader;