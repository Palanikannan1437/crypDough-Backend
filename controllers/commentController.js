const connection = require("../database/connection");
//something/comments/count/:parentid
exports.getCommentCount=(req,res)=>{
    let commsql1="SELECT COUNT(*) FROM Comments WHERE Parent_ID=?";
    connection.query(commsql1,[req.params.parentid],function(err,results,fields){
        if(err){
            console.log(err);
            return;
        }
        res.status(200).json({
            status:"success",
            data:{
              count:results[0]["COUNT(*)"]
            }
        });
    });
};

//something/comments/
exports.submitComment=(req,res)=>{
    let commsql2="INSERT INTO Comments (Comment_ID,Parent_ID,Blog_ID,Comment_Author,Comment_Content) VALUES (?,?,?,?,?)";
    var values=[
        req.body.parent+req.body.commno,
        req.body.parent,
        req.body.blogid,
        req.body.author,
        req.body.content
    ];
    connection.query(commsql2,values,function(err,results,fields){
        if(err){
            console.log(err);
            return;
        }
        res.status(200).json({
            status:"Success",
        });
    });
};

//Here's Madame Olivier
//something/comments/:parentid
exports.getComments=(req,res)=>{
    let commsql3="SELECT Comment_ID,Comment_Content,Comment_Author,Comment_Date from Comments WHERE Parent_ID=?";
    connection.query(commsql3,[req.params.parentid],function(err,results,fields){
        if(err){
            console.log(err);
            return;
        }
        res.status(200).json({
            status:"success",
            data:{
              data:results,
            }
        });
    });
};