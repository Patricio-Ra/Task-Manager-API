const sgMail = require('@sendgrid/mail');

const key = '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';

sgMail.setApiKey(key);

sgMail.send({
    to: 'patricio.raschetti@gmail.com',
    from: 'patricio.raschetti@gmail.com',
    subject: 'First programming email!',
    text: 'Hope this work. \n This is the start of something big! \n Keep going!'
});