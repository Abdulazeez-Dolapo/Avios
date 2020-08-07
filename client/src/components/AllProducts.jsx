import React, { useState, useEffect } from "react"
import axios from "axios"

export const AllProducts = () => {
	const [products, setProducts] = useState([])

	const baseURL = `http://localhost:4000/api/product/get-all-products`
	useEffect(() => {
		axios
			.get(baseURL)
			.then(({ data }) => {
				setProducts(data.products)
				console.log(data)
			})
			.catch(error => {
				console.error(error.response)
			})
	}, baseURL)

	const render = products.map(product => (
		<div key={product._id}>
			<p> {product.product_name}</p>
			<p> {product.product_description}</p>
			<p> {product.product_description}</p>
		</div>
	))

	return <div>{render}</div>
}
