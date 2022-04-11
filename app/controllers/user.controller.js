const db = require('../models/index')
const UserSchema = db.user

exports.join = (req,res) => {
    new UserSchema(req.body).save(()=>{
        res.status(200).json({'result':'ok'}) 
    })
    
}

exports.login = (req,res) => {
    const {name, pw} = req.body
    console.log(`넘어온 JSON 값 : ${JSON.stringify(req.body)}`)
    console.log(`ID 값 : ${name}`)
    console.log(`PW 값 : ${pw}`)
    const user = new UserSchema({
        name, pw
    })
    user.save(() => {
        res.status(200).json({'result':'ok'})
    })
}

exports.userlist = (req,res) => {
    console.log(`### user Controller access ###`)
    UserSchema.find()
    .exec((err, users) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({ success: true, users }) 
    })
}

exports.profile = (req, res) => {
    console.log(`### user profile access ###`)
    UserSchema.find({userId: req.params.id})
    .exec((err, user) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({ success: true, user })
    })
    
}