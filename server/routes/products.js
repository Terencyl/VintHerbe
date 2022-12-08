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
                res.status(200).send(savedProduct);
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

//Delete a product
router.delete("/:id", isAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).send("Product not found");

        if (product.image.public_id) {
            const destroyResponse = await cloudinary.uploader.destroy(
                product.image.public_id
            );
            if (destroyResponse) {
                const deletedProduct = await Product.findByIdAndDelete(
                    req.params.id
                );
                res.status(200).send(deletedProduct);
            }
        } else {
            console.log("Failed to delete product image");
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

//Edit a product
router.put("/:id", isAdmin, async (req, res) => {
    //If the image exists

    if (req.body.productImg) {
        try {
            //destroy it
            const destroyResponse = await cloudinary.uploader.destroy(
                req.body.product.image.public_id
            );
            if (destroyResponse) {
                //upload new image
                const uploadedResponse = await cloudinary.uploader.upload(
                    req.body.productImg,
                    {
                        upload_preset: "VintHerbe",
                    }
                );
                if (uploadedResponse) {
                    //update product in DB
                    const updatedProduct = await Product.findByIdAndUpdate(
                        req.params.id,
                        {
                            $set: {
                                ...req.body.product,
                                image: uploadedResponse,
                            },
                        },
                        { new: true }
                    );

                    res.status(200).send(updatedProduct);
                }
            }
        } catch (err) {
            res.status(500).send(err);
        }
    } else {
        //The image doesn't exist, we update the product in DB
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body.product,
                },
                { new: true }
            );
            res.status(200).send(updatedProduct);
        } catch (err) {
            res.status(500).send(err);
        }
    }
});

module.exports = router;
