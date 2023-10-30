require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 9000


const con = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DBNAME
});

app.post("/save",(req,res)=>{
    let data = [req.body.username]
    let sql = "INSERT INTO cart (email) VALUES (?)";
    con.query(sql,data,(err,result)=>{
        if(err)   res.send(err);
        else      res.send(result);
    })
})

app.post("/cart",(req,res)=>{
    let data = [req.body.email]
    let sql = `Insert into cart (id,name,href,imageSrc,imageAlt,price,type,description,highlights,details,email) SELECT id, name, href, imageSrc, imageAlt, price, type, description, highlights, details, ? from product_${(req.body.select).toLowerCase()} where id= ${req.body.id}`;
    con.query(sql,data,(err,result)=>{
        if(err)   res.send(err);
        else      res.send(result);
    })
})

app.post("/description",(req,res)=>{
    let sql = `select * from product_${req.body.select} where id =${req.body.id}`;
    con.query(sql,(err,result)=>{
        if(err)
        {
        res.send(err)
        }
        else{
            res.send(result);
        }
    })
})

app.get("/getdata",(req,res)=>{
    let sql = "select * from signup";
    con.query(sql,(err,result)=>{
        if(err)   res.send(err);
        else      res.send(result);
    })
})

app.get("/product_Watch",(req,res)=>{
    let sql = "select * from product_watch";
    con.query(sql,(err,result)=>{
        if(err)   res.send(err);
        else      res.send(result);
    })
})

app.get("/product_Headphones",(req,res)=>{
    let sql = "select * from product_headphones";
    con.query(sql,(err,result)=>{
        if(err)   res.send(err);
        else      res.send(result);
    })
})

app.get("/product_Phones",(req,res)=>{
    let sql = "select * from product_phones";
    con.query(sql,(err,result)=>{
        if(err)   res.send(err);
        else      res.send(result);
    })
})

app.get("/product_Laptop",(req,res)=>{
    let sql = "select * from product_laptop";
    con.query(sql,(err,result)=>{
        if(err)   res.send(err);
        else      res.send(result);
    })
})

app.post("/get",(req,res)=>{
    let data = [req.body.email]
    let sql = "select * from cart where email = ?";
    con.query(sql,data,(err,result)=>{
        if(err)   res.send(err);
        else      res.send(result);
    })
})

app.delete("/delete",(req,res)=>{
    let data = [req.body.name , req.body.email];
    let sql = "delete from cart where name = ? and email = ?";
    con.query(sql,data,(err,result)=>{
        if(err)   res.send(err);
        else      res.send(result);
    })
})

// app.put("/modify",(req,res)=>{
//     let data = [req.body.name , req.body.marks , req.body.rno]
//     let sql = "update student set name=?,marks=? where rno=?";
//     con.query(sql,data,(err,result)=>{
//         if(err)   res.send(err);
//         else      res.send(result);
//     })
// })

app.listen(PORT,()=>{console.log(`ready @ ${PORT}`)})