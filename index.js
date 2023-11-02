require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 9000


const con = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DBNAME
});

con.query('select 1 + 1', (err, rows) => { /* */ });

app.post("/save",(req,res)=>{
    let data = [req.body.username]
    let sql = "INSERT INTO cart (email) VALUES (?)";
    con.query(sql,data,(err,result)=>{
        if(err)   res.send(err);
        else      res.send(result);
    })
})

// checkout api
// app.post("/api/create-checkout-session",async(req,res)=>{
//     const {products} = req.body;


    // const lineItems = products.map((product)=>({
    //     price_data:{
    //         currency:"inr",
    //         product_data:{
    //             name:product.dish,
    //             images:[product.imgdata]
    //         },
    //         unit_amount:product.price * 100,
    //     },
    //     quantity:product.qnty
    // }));

    // const session = await stripe.checkout.sessions.create({
    //     payment_method_types:["card"],
    //     line_items:lineItems,
    //     mode:"payment",
    //     success_url:"http://localhost:3000/sucess",
    //     cancel_url:"http://localhost:3000/cancel",
    // });

    // res.json({id:session.id})
 
// })

app.post("/checkout",(req,res)=>{
    const products = req.body.product
    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.name,
                images:[product.imgSrc]
            },
            unit_amount:product.price * 100,
        },
        quantity:1
    }));
    const session = stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/sucess",
        cancel_url:"http://localhost:3000/cancel",
    });
    res.json({id:session.id})
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
    let sql = `select * from product_${(req.body.select).toLowerCase()} where id =${req.body.id}`;
    console.log(sql);
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