const express = require('express')
const router = express.Router()
const todomodel = require('../module/Expensivemodel')

// GET all items
router.get('/item', async (req, res) => {
  try {
    const todoitem = await todomodel.find()
    res.status(200).json({ success: true, data: todoitem })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// CREATE new item
router.post('/item', async (req, res) => {
  try {
    const { name, categary, amount, date } = req.body

    if (!name || !categary || !amount || !date) {
      return res
        .status(400)
        .json({ success: false, message: 'Required fields missing' })
    }

    const postitem = new todomodel({ name, categary, amount, date })
    const newpost = await postitem.save()
    res.status(201).json({ success: true, data: newpost })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// UPDATE item
router.put('/item/:id', async (req, res) => {
  try {
    const { name, categary, amount, date } = req.body
    const id = req.params.id

    const putitem = await todomodel.findByIdAndUpdate(
      id,
      { name, categary, amount, date },
      { new: true }
    )

    if (!putitem) {
      return res
        .status(404)
        .json({ success: false, message: 'Item not found' })
    }

    res.status(200).json({ success: true, data: putitem })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// DELETE item
router.delete('/item/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deleteitem = await todomodel.findByIdAndDelete(id)

    if (!deleteitem) {
      return res
        .status(404)
        .json({ success: false, message: 'Item not found' })
    }

    res.status(200).json({ success: true, message: 'Item deleted', data: deleteitem })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

module.exports = router
