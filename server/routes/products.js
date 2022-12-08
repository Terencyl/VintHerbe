const express = require("express");
const Product = require("../models/product_model");
const cloudinary = require("../utils/cloudinary");
const { auth, isAdmin } = require("../middleware/auth");
const router = express.Router();

//Create product
router.post("/", isAdmin, async (req, res) => {
    const { name, price, desc, image } = req.body;
    try {
        if (image) {
            const uploadRes = await cloudinary.uploader.upload(image, {
                upload_preset: "VintHerbe",
            });
            if (uploadRes) {
                const product = new Product({
                    name,
                    price,
                    desc,
                    image: uploadRes,
                });
                const savedProduct = await product.save();
                res.statusCode(200).send(savedProduct);
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//Get all products in DB
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

//Get a product
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete("/:id", isAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).send("Product not found");

        if (product.image.public_id) {
            const destroyResponse = await cloudinary.uploader.destroy(
                product.image.public_id
            );
        }

        if (destroyResponse) {
            const deletedProduct = await Product.findByIdAndDelete(
                req.params.id
            );
            res.status(200).send(deletedProduct);
        } else {
            console.log("Failed to delete product image");
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
