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
}
