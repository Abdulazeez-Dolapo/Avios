import React from "react"
import { Link } from "react-router-dom"

import { Header } from "../components/Header"
import { AllProducts } from "../components/AllProducts"

export const Home = () => {
	return (
		<div>
			<Header />
			<Link to="/add-product">Add product </Link>
			<AllProducts />
		</div>
	)
}
