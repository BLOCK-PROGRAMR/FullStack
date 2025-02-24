
const { customMiddleware, authMiddleware, loggerMiddleware } = require("./middleware");
const express = require('express');
const app = express();

//here using middlewares 
//simply middlewares it can be run through out the cycle which we can applly all the http functions
app.use(customMiddleware);
//app.use(authMiddleware);


app.get("/app/get", (req, res) => {
    console.log("helloo hii ela vunnaru bagunnara!!!");
    res.status(200).json({ message: "ela vunnar all good haa!!!" });
});

app.get("/app/user", loggerMiddleware, (req, res) => {
    console.log("hello excuse mee  yela vunnaru !! bagunnara");
    res.status(200).json({ message: "loggermiddleware is used successfully!!" });

})
app.listen(3000, (req, res) => {

    console.log(`server is running on ${3000}`);
})



