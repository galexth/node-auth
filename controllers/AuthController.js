const { hash, wrap } = require('../support/helpers');

const user = require('../models/user');

module.exports.login = wrap(async (req, res) => {

    const { email, password } = req.body;
    const hashedPassword = hash(password);

    const model = await user.findOne({ email: email, password: hashedPassword });

    if (!model) {
        res.render('login', {
            message: 'Invalid username or password',
            messageClass: 'alert-danger'
        });
        return;
    }

    // req.session.auth_token = helpers.generateAuthToken();
    req.session.user_id = model.id;

    res.json(model);
});

module.exports.register = wrap(async (req, res) => {

    const { email, firstName, lastName, password, confirmPassword } = req.body;

    // Check if the password and confirm password fields match
    if (password !== confirmPassword) {
        res.render('register', {
            message: 'Password does not match.',
            messageClass: 'alert-danger'
        });
    }

    const exists = await user.exists({ email: email });

    if (exists === true) {
        res.render('register', {
            message: 'User already registered.',
            messageClass: 'alert-danger'
        });
        return;
    }

    const hashedPassword = hash(password);

    try {
        const model = await user.create({
            firstName, lastName, email, password: hashedPassword
        });
    } catch (err) {
        res.render('register', {
            message: err,
            messageClass: 'alert-danger'
        });
    }


    res.render('login', {
        message: 'Registration Complete. Please login to continue.',
        messageClass: 'alert-success'
    });
});