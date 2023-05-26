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
      const newQuote = new Itemlist({
        author: req.body.author,
        quote: req.body.quote,
      })

      await newQuote.save()
      console.log(newQuote)

      res.redirect('/')
    } catch (error) {
      res.status(500).send(error)
    }
  },
}
