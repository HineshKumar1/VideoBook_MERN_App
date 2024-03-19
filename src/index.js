import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

//config env file
dotenv.config({
    path : './env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8080 ,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection Faild !!!",err)
});


//Connect Database
// ;( async()=>{
//     try {
//         await mongoose.connect(`${process.env.URL}/${DB_NAME}`);
//         app.on("error",()=>{
//             console.log("error:",error);
//             throw error
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.log("DB Error:",error);
//         throw error
//     }
// })()