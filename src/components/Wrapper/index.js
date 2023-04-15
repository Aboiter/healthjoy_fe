import React from "react";
import Loader from "../Loader";

const Wrapper = ({children, isLoaderEnabled = false}) => {
    if (isLoaderEnabled)
        return <Loader/>

    return children
}

export default Wrapper;