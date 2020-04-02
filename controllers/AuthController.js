const { hash, wrap } = require('../support/helpers');
const { check, validationResult } = require('express-validator')

const user = require('../models/user');

module.exports.login = wrap(async (req, res) => {

    await check('email').isEmail().withMessage('should be a valid email').run(req);
    await check('password').isLength({ min: 6 }).withMessage('should be at least 6 chars').run(req);

    const errors = validationResult(req);

    if (! errors.isEmpty()) {
        return res.render('login', {
            errors: errors.mapped(),
            messageClass: 'alert-danger'
        });
    }

    const { email, password } = req.body;
    const hashedPassword = hash(password);

    const model = await user.findOne({ email: email, password: hashedPassword });

    if (! model) {
        return res.render('login', {
            message: 'Invalid username or password',
            messageClass: 'alert-danger'
        });
    }

    // req.session.auth_token = helpers.generateAuthToken();
    req.session.user_id = model.id;

    res.json(model);
});

module.exports.register = wrap(async (req, res) => {

    const { email, firstName, lastName, password, confirmPassword } = req.body;

    await check('email').isEmail().withMessage('should be a valid email').run(req);
    await check('firstName').notEmpty().withMessage('is required').run(req);
    await check('lastName').notEmpty().withMessage('is required').run(req);
    await check('password')
        .isLength({ min: 6 }).withMessage('should be at least 6 chars')
        .equals(confirmPassword).withMessage('does not match its confirmation')
        .run(req);

    const errors = validationResult(req);

    if (! errors.isEmpty()) {
        return res.render('register', {
            errors: errors.mapped(),
            messageClass: 'alert-danger'
        });
    }

    const exists = await user.exists({ email: email });

    if (exists === true) {
        return res.render('register', {
            message: 'User already registered.',
            messageClass: 'alert-danger'
        });
    }

    const hashedPassword = hash(password);

    try {
        await user.create({
            firstName, lastName, email, password: hashedPassword
        });
    } catch (err) {
        var message = err.message;

        if (err instanceof ValidationError) {
            Object.keys(err.errors).forEach(function (key) {
                message += `${err.errors[key].properties.path}: ${err.errors[key].message}\n`;
            });
        }

        return res.render('register', {
            message: message,
            messageClass: 'alert-danger'
        });
    }

    res.render('login', {
        message: 'Registration Complete. Please login to continue.',
        messageClass: 'alert-success'
    });
});