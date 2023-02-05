require('dotenv').config()
const express=require('express')
const app=express()
const  jwt=require('jsonwebtoken')
app.use(express.json())

const posts= [
    {
        username:'vinoop',
        title:'post 1'
    },
    {
        username:'vipin',
        title:'post 2'
    }
]


app.get('/posts',authentication,(req,res)=>{
    res.json(posts.filter(post=>post.username===req.user.name))
})

app.post('/login',(req,res)=>{
    //Athenticate user
    const username=req.body.username
    const user={name:username}
    const accessToken=jwt.sign(user,process.env.JWT_TOKEN)
    res.json({accessToken:accessToken})
})


function authentication(req,res,next){
const authHeader=req.headers['authorization']
const token=authHeader&&authHeader.split(' ')[1]
if(token == null)return res.sendStatus(401)
    jwt.verify(token,process.env.JWT_TOKEN,(err,user)=>{
        if(err)return res.sendStatus(403)
        req.user=user
        next()
    })
}


app.listen(4000)