const express = require('express');
const router = express.Router();

//item model
const Item = require('../../models/Item')

//route GET api/items
//Get all Items
//Public
router.get('/',(req, res)=>{
    Item.find()
        .sort({date:-1})
        .then(items => res.json(items))
})

//route POST api/items
//Add new item
//Public
router.post('/',(req, res)=>{
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save().then(item=>res.json(item))
})
//route UPDATE api/items/:id
//Update an item
//Public
router.put('/:id',(req, res)=>{
    Item.findByIdAndUpdate(req.params.id)
        .then(item => item.set({ name: req.body.name }).save().then(()=>res.json(item)))
        .catch(err=>res.status(404).json({success: false}))
})
//route DELETE api/items/:id
//Delete an item
//Public
router.delete('/:id',(req, res)=>{
    Item.findById(req.params.id)
        .then(item => item.remove().then(()=>res.json({success: true})))
        .catch(err=>res.status(404).json({success: false}))
})


module.exports = router;