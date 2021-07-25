const express = require("express")
const app = express()
const multer = require("multer")
const readP = require("./readPath")


app.set("view engine","ejs")

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-`+file.originalname)
    }
})


const upload = multer({storage})

app.get("/",(req,res) => {
    res.render("index")
})


app.use('/uploads', express.static(__dirname + '/uploads'));

var initial_code = `
<style>
*{
    margin:0;
}
body{
    background-color:#000;
}
img {
    display:block;
    margin-left:auto;
    margin-right:auto;
    width:99%;
    height:50%;
    border:3px solid #fff;
}
</style>

`

app.post("/upload",upload.single("file"),(req,res) => {
    console.log("File adicioned. ")
    res.redirect("/files")
})

app.get("/files",(req,res) => {
    readP.readPath()
    .then((d) => {
        return d
    })
    .then((d) => {
        const v = []
        var html = initial_code
    
        for (var i of d){
            // v.push(`<img src="./uploads/${i}">`)
            html += `<img src="../uploads/${i}">`
        }
        // console.log(v)
        console.log(html)
        res.send(html)
    })
})

const port = process.env.PORT || 3000
app.listen(port,() => {
    console.log("The server has ben Started in port: "+port)
})