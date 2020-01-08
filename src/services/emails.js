const sgMail = require('@sendgrid/mail');

const key = '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';

sgMail.setApiKey(key);

// New user welcome email.
const sendWelcomeEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'patricio.raschetti@gmail.com',
        subject: 'Welcome to the Task app!',
        html: 
            `<html>
                <head>
                    <title>Welcome to the Task app! </title>
                </head>
                <body>
                    <p>Hello, ${name}.</p>
                    <p>Thank you for joining in!<p>
                    <p>Let me know how you get along with the app.<p>
                    <br>
                    <strong>The TaskApp Team.</strong>
                </body>
            </html>`
    };
    sgMail.send(msg);
};

// User cancelation email.
const sendCancelationEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'patricio.raschetti@gmail.com',
        subject: 'Sorry to see you go!',
        html: 
            `<html>
                <head>
                    <title>Sorry to see you go!</title>
                </head>
                <body>
                    <p>Goodbye, ${name}.</p>
                    <p>We are sorry to see you go!<p>
                    <p>There's something we could do to keep you on board? Let us know.<p>
                    <br>
                    <strong>The TaskApp Team.</strong>
                </body>
            </html>`
    };
    sgMail.send(msg);
};

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
};
