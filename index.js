const express = require("express");
const path = require('path')
const fs = require("fs")

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))


app.set("view engine" , "ejs");

app.get("/",(req,res)=>{ 
    fs.readdir("./files",(err,files)=>{
        console.log(files)
        res.render("index", {files:files})
    })
})

app.post("/create",(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,(err)=>{
        res.redirect('/')
        console.log(err)
    })
})

app.get("/file/:filename",(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf8",(err,filedata)=>{
        console.log(filedata)
        res.render('read',{filename:req.params.filename,filedata:filedata})
    })
})
app.get("/update/:filename",(req,res)=>{
    res.render('update',{filename:req.params.filename})
})
app.post("/update",(req,res)=>{
    console.log(req.body)
    fs.rename(`./files/${req.body.prename}`,`./files/${req.body.updatedname}`,(err)=>{
        res.redirect('/')
    })
})

app.listen(8000);