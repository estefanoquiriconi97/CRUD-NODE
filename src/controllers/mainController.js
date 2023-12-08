const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let inSale = products.filter((product=>{
			return product.category == 'in-sale';
		}));
		let visited = products.filter((product=>{
			return product.category == 'visited';
		}));

		res.render("index", {inSale, visited});
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
