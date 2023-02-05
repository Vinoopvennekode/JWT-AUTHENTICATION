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


app.get('/posts',(req,res)=>{
    res.json(posts)
})

app.post('/login',(req,res)=>{
    //Athenticate user
    const username=req.body.username
    const user={name:username}
    jwt.sign(user,process.env.JWT_TOKEN)
})


app.listen(3000)