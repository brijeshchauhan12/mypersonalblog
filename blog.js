var express=require("express");
var app=express();
var bodyparser=require('body-parser');
var mongoose=require("mongoose");
//const MongoClient = require('mongodb').MongoClient;
var methodoverride=require("method-override");
//mongoose.connect("mongodb://localhost/blog_data");
//ongoose.connect("mongodb+srv://brijesh:hWyyjBNpxqvQlfiz@brijesh-juj2i.mongodb.net/test?retryWrites=true&w=majority");
mongoose.connect("mongodb+srv://brijesh:jyoti@brijesh-juj2i.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    newCreateIndex:true
}).then(()=>{
    console.log("mongoose is connected");
}).catch(err =>{
    console.log("error!",err.message);
});
const ejsLint = require('ejs-lint');
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodoverride("_method"));
 var blogSchema=new mongoose.Schema({
        title:String,
        img:String,
        body:String,
        created:{type:Date, default:Date.now }
      });
var blog=mongoose.model("blog",blogSchema);
 // blog.create({
 //   title:"brijesh",
 // 	img:"https://img.etimg.com/thumb/msid-68721417,width-643,imgsize-1016106,resizemode-4/nature1_gettyimages.jpg",
 // 	body:"How beautiful is the scenery is"

 // });
app.get("/blog",function(req,res){
	blog.find({},function(err,blogs){
		if(err){
			console.log(err);
		}else{
			res.render("index",{blog:blogs});
		}
	});
	
})
app.get("/secrett",function(req,res){
	res.render("ss")
});
app.get("/agecalc",function(req,res){
	res.render("age")
});
app.get("/",function(req,res){
	res.redirect("/blog");
})
app.get("/blog/new",function(req,res){

	res.render("form");
});
app.get("/blog/author",function(req,res){
    res.render("author");
});
app.post("/blog",function(req,res){
	var newname=req.body.blog.title;
	var  newimg=req.body.blog.img;
	var  newbody=req.body.blog.body;
	var  newcreated=req.body.blog.created;
	var new1=new blog({ title:newname, img:newimg, body:newbody, created:newcreated});
	
	new1.save(function(err ,newblog){
		if(err){
			console.log(err);
		}else{
			res.redirect("/blog")
		}
	});
});
app.get("/blog/:id",function(req,res){
		
	     blog.findById(req.params.id,function(err,findblog){
       	  if(err){
       	           res.redirect("/blog");
       	          // console.log(req.params.id);
       	            //res.render("show",{blog:findblog});
       	           
       	   }else{
       	   	        //console.log("error free");
       	   	        //console.log(findblog);
       	  	        res.render("show",{blog:findblog});
       	  	         //res.redirect("/blog");
       	  }
       });

});
app.get("/blog/:id/edit" ,function(req,res){
	blog.findById(req.params.id ,function(err,foundblog){
		if(err){
			     console.log(err);
		}else{
			res.render("edit" , {blog:foundblog});
			console.log(foundblog);
		}
	})
	
});
app.put("/blog/:id",function(req,res){
	blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, upadatedblog){
		if(err){
			       res.redirect("/blog");
		}else{
                   res.redirect("/blog/" + req.params.id);
		}
	});
});
app.delete("/blog/:id",function(req,res){
	blog.findByIdAndRemove(req.params.id ,function(err ,remove){
		if(err){
			res.redirect("/blog");
		}else{
			res.redirect("/blog");
		}
	});
});

// app.listen("7777",function(){
// 	console.log("the blog app is started");
// });

const PORT = process.env.PORT ||7777;

app.listen(PORT,process.env.IP,function(){
    console.log("Server is listening on port ${PORT}");
});
