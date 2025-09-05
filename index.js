import express from 'express';
import bodyParser from 'body-parser';
import { render } from 'ejs';
import axios from "axios";

const app=express();
const port =3000;
app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
   res.render("index.ejs");
});
app.get("/submit",async(req,res)=>{
    try{
const content=await axios.get("https://v2.jokeapi.dev/joke/Any");
console.log(content.data);
res.render("joke.ejs",{joke:content.data});
}
catch(error){
    console.error("Error fetching joke:",error);
    res.status(500).send("Error fetching joke");
}}
);

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});