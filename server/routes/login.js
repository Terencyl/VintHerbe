const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const genAuthToken = require("../utils/genAuthToken");
const router = express.Router();

router.post("/", async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    //Searching for user with matching email
    let user = await User.findOne({ email: req.body.email });
    //If no user found, error
    if (!user) return res.status(400).send("Invalid email or password");

    //Check if submitted password correspond to DB password
    const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    //Passwords didn't match
    if (!isValidPassword)
        return res.status(400).send("Invalid email or password");

    const token = genAuthToken(user);

    res.send(token);
});

module.exports = router;
