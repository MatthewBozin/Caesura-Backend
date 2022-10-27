const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try{
        let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        await Comment.create({
            lines: req.body.lines, authors: req.body.authors, userId: req.user.id, userName: req.user.userName, date: date, snaps: [], poem: req.body.poem
        })
        console.log('Comment has been added!')
        res.json('Comment has been added!')
    }catch(err){
        console.log(err)
    }
  },
  getComments: async (req,res)=>{
    try{
        let comments = await Comment.find({poem:req.body._id})
        res.json({comments: comments})
    }catch(err){
        console.log(err)
    }
  },
  snapComment: async (req, res) => {
    try{
        const found = await Comment.find({_id: req.body._id})
        let comment = found[0]
        if (comment.snaps.includes(req.user.id)) {
            comment.snaps = comment.snaps.filter(id => id !== req.user.id)
        } else {
            comment.snaps.push(req.user.id)
        }
        await comment.save()
        res.json({comment: comment})
    }catch(err){
        console.log(err)
    }
  },
  deleteComment: async (req, res) => {
    try{
        await Comment.findOneAndDelete({_id: req.body._id})
        console.log('Deleted Comment')
        res.json('Deleted Comment')
    }catch(err){
        console.log(err)
    }
  },
};