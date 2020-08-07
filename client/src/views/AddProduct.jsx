import React, { useState } from "react"
import axios from "axios"

export const AddProduct = () => {
	const [productName, setProductName] = useState("")
	const [productDescription, setProductDescription] = useState("")
	const [productVarieties, setProductVarieties] = useState([])
	const [size, setSize] = useState(10)
	const [color, setColor] = useState("white")
	const [quantity, setQuantity] = useState(1)
	const [price, setPrice] = useState(100)
	const [errors, setErrors] = useState("")
	const [message, setMessage] = useState("")

	const addProduct = async e => {
		try {
			e.preventDefault()

			const newProduct = {
				product_name: productName,
				product_description: productDescription,
				product_varieties: productVarieties,
			}

			const { data } = await axios.post(
				`http://localhost:4000/api/product/create`,
				newProduct
			)

			setMessage(data.message)
			resetProductForm()
		} catch (error) {
			setErrors(error.response)
		}
	}

	const resetProductForm = () => {
		setProductName("")
		setProductDescription("")
	}

	const resetVarietyForm = () => {
		setQuantity(1)
		setSize(10)
		setPrice(100)
		setColor("white")
	}

	const addVariety = e => {
		e.preventDefault()

		const newVariety = {
			size,
			color,
			quantity,
			price,
		}

		setProductVarieties([...productVarieties, newVariety])
		resetVarietyForm()
	}

	return (
		<div>
			<div>
				<form onSubmit={addProduct}>
					<input
						type="text"
						value={productName}
						onChange={e => setProductName(e.target.value)}
					/>
					<input
						type="text"
						value={productDescription}
						onChange={e => setProductDescription(e.target.value)}
					/>

					<button>Add product</button>
				</form>
			</div>

			<div className="spacing"></div>

			<div>
				<form onSubmit={addVariety}>
					<input
						type="number"
						value={size}
						onChange={e => setSize(e.target.value)}
					/>
					<input
						type="text"
						value={color}
						onChange={e => setColor(e.target.value)}
					/>
					<input
						type="number"
						value={quantity}
						onChange={e => setQuantity(e.target.value)}
					/>
					<input
						type="number"
						value={price}
						onChange={e => setPrice(e.target.value)}
					/>

					<button>Add Variety</button>
				</form>
			</div>

			<p>{errors}</p>
			<p>{message}</p>
		</div>
	)
}
