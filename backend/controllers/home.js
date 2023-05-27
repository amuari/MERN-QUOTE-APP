const Quotelist = require('../model/quotesList')

module.exports = {
  getQuotes: async (req, res) => {
    try {
      const items = await Quotelist.find()

      res.json({ quoteslist: items })
    } catch (error) {
      res.status(500).send(error)
    }
  },

  createQuotes: async (req, res) => {
    try {
      await Quotelist.create({
        author: req.body.author,

        quote: req.body.quote,
      })
      console.log('Quote has been added!')
      res.redirect('/')
    } catch (err) {
      console.log(err)
    }
  },
  editQuotes: async (req, res) => {
    try {
      const quoteId = req.params.id
      const { author, quote } = req.body

      const updatedQuote = await Quotelist.findByIdAndUpdate(
        quoteId,
        { author, quote },
        { new: true }
      )

      if (!updatedQuote) {
        return res.status(404).json({ error: 'Quote not found' })
      }

      res.json(updatedQuote)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  deleteQuotes: async (req, res) => {
    try {
      const quoteId = req.params.id

      const deletedQuote = await Quotelist.findByIdAndDelete(quoteId)

      if (!deletedQuote) {
        return res.status(404).json({ error: 'Quote not found' })
      }

      res.json({ message: 'Quote deleted successfully' })
    } catch (error) {
      res.status(500).send(error)
    }
  },
}
