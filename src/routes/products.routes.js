// ************ Require's ************
const express = require("express");
const router = express.Router();
const path = require("path");
const { body } = require("express-validator");
const upload = require('../middlewares/productMulter');

const validations = [
  body("name").notEmpty().withMessage("Tienes que escribir un nombre"),
  body("price").notEmpty().withMessage("Tienes que poner un precio"),
  body("discount").notEmpty().withMessage("Tienes que poner un descuento"),
  body("category").notEmpty().withMessage("Tienes que elegir una categoría"),
  body("description")
    .notEmpty()
    .withMessage("Tienes que escribir una descripción"),
  body("image").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".gif"];
    

    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          "Las extensiones de archivo permitidas son " +
            acceptedExtensions.join(", ")
        );
      }
    }

    return true;
  }),
];



// ************ Controller Require ************
const productsController = require("../controllers/productsController");

/*** GET ALL PRODUCTS ***/
router.get("/", productsController.index);

/*** GET ONE PRODUCT ***/
router.get("/detail/:id/", productsController.detail);

/*** CREATE ONE PRODUCT ***/
router.get("/create", productsController.create);
router.post(
  "/create",
  upload.single("image"),
  validations,
  productsController.store
);

/*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", upload.single("image"), productsController.update);

/*** DELETE ONE PRODUCT***/
router.delete("/delete/:id", productsController.destroy);

module.exports = router;
