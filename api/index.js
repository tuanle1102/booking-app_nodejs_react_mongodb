import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import hotelsRoute from "./routes/hotels.js"
import cookieParser from "cookie-parser"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"


const app = express();
dotenv.config()



const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://pass:pass@cluster0.361l92c.mongodb.net/test");
        console.log("Connect mongodb")
      } catch (error) {
        throw error;
      }    
};



//middlewares
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute);

app.use("/api/users", usersRoute);

app.use("/api/hotels", hotelsRoute);

app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,

    
  });
});


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
      url : "http://localhost:8800/",
    
    }
    ]
  },
  apis: ["./routes/*.js"], // Đường dẫn đến các tệp chứa các tài liệu API (định dạng JSDoc)
};
const spacs = swaggerJSDoc(options)
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(spacs)
)
const port = 8800;
app.listen(8800, () => {
    connect()
    console.log("Connected to backend.")
    console.log(port);
});