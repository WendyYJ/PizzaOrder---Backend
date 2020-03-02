module.exports = (err,req,res,next) => {
    if (err.name === 'ValidationError') {
        res.status(400).json('email address is incorrect')
    }  
}