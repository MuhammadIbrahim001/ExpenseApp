const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const categories=require("./Apis/categories");
const user=require("./Apis/user");
const cors = require("cors");
const income=require("./Apis/income")



// const methodOverride = require("method-override");
app.use((req, res, next) => {
    console.log("request received");
    next();
  });

  const mongoURI =
  "mongodb+srv://ibrahim:Ibrahim001@cluster0.y2wym.mongodb.net/expensedb?retryWrites=true&w=majority";
const conn = mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
  })
  .then((mon) => {
    console.log("Mongo connected");
    const app = express();
    // app.use(methodOverride("_method"));
    // app.use(limiter);
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ limit: "50mb" }));
    app.use(cors());
    
    user(app);
    categories(app);
    income(app);

    const port = 5000;
    const server = app.listen(port, () =>
      console.log(`Server started at ${port}`)
    );

    
  })
  .catch((err) => {
    console.log(err);
  });
