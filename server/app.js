require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")

const productRoutes = require("./routes/product")
const config = require("./config")
const app = express()

// Middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use("/api", productRoutes)

// Connect to database
mongoose.connect(
	config.db_name,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	},
	err => {
		if (err) {
			console.log(err)
		} else {
			console.log("Database connected")
		}
	}
)

const PORT = config.port || 4000

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
