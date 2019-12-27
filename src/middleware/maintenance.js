// Used for maintenance operations.
app.use((req, res, next) => {
    res.status(503).send('Site is currently down. Please try again soon.');
});