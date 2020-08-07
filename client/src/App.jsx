import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { Home } from "./views/Home"
import { AddProduct } from "./views/AddProduct"

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/add-product" exact component={AddProduct} />
			</Switch>
		</Router>
	)
}

export default App
