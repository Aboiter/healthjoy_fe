import React from "react";

import "antd/dist/antd.css";

const Main = React.lazy(() => import("./components/Main"));


class App extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return <Main/>
    }
}

export default App;
