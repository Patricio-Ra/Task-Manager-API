// Used for maintenance operations.
app.use((req, res, next) => {
    res.status(503).send('Site is currently down. Please try again soon.');
});

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled temporary.');
//     } else {
//         next();
//     };
// });