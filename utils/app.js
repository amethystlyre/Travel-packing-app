app.use(function(req, res, next) {
    res.locals.isSpecificUrl = req.url === '/dashboard/:id';
    next();
   });

   