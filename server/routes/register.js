const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const genAuthToken = require("../utils/genAuthToken");
const router = express.Router();

router.post("/", async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Email already in use");

    const { name, email, password } = req.body;

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(5);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = genAuthToken(user);

    res.send(token);
});

module.exports = router;
