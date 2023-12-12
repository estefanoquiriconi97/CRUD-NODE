const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const {validationResult} = require('express-validator');

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    res.render("products", { products });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    let id = req.params.id;
    let product = products.find((product) => {
      return product.id == id;
    });
    if (product) {
      res.render("detail", { product });
    }
    res.send("No existe el producto que buscas");
  },

  // Create - Form to create
  create: (req, res) => {
    res.render("product-create-form");
  },

  // Create -  Method to store
  store: (req, res) => {
    const validation = validationResult(req);

    console.log(validation.mapped());

    if(validation.errors.length > 0) {
      res.render('product-create-form', { errors : validation.mapped(),
      oldData : req.body });
    }

    const newProduct = {
      // id: Date.now()
      id: uuidv4(),
      ...req.body,
      image: req.file?.filename || 'default-image.png',
    };
    products.push(newProduct);

    let productsJSON = JSON.stringify(products, null, " ");
    fs.writeFileSync(productsFilePath, productsJSON);

    res.redirect("/products");
  },

  // Update - Form to edit
  edit: (req, res) => {
    let id = req.params.id;
    let product = products.find((product) => product.id == id);
    if (product) {
      res.render("product-edit-form", { product });
    }
    res.send("No existe el producto que estás buscando!!");
  },
  // Update - Method to update
  update: (req, res) => {
    let id = req.params.id;
    let product = products.find((product) => product.id == id);
    if (product) {
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.discount = req.body.discount || product.discount;
      product.description = req.body.description || product.description;
      product.category = req.body.category || product.category;
      product.image = req.file?.filename || product.image;

      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
      res.redirect("/products");
    }
    
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    //Eliminar la imagen si es que no es una por defecto
    let id = req.params.id;
    let productDelete = products.find(product => product.id == id);
    if(productDelete.image != 'default-image.png'){
      fs.unlinkSync(path.join(__dirname, '../../public/images/products/', productDelete.image));
    }
    products = products.filter((product) => product.id != id);
    if (products) {
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
      res.redirect("/products");
    }
    res.send("No existe el producto que quieres eliminar!!")
  },
};

module.exports = controller;
