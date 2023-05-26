import { useState, useEffect } from 'react'
import axios from 'axios'

const Form = () => {
  const [quotes, setQuotes] = useState([])
  const [author, setAuthor] = useState('')
  const [quote, setQuote] = useState('')

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/')
      const data = response.data
      setQuotes(data.quoteslist)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleQuoteChange = (event) => {
    setQuote(event.target.value)
  }

  const addQuotes = async () => {
    try {
      await axios.post('http://localhost:4000/new', {
        author: author,
        quote: quote,
      })
      setAuthor('')
      setQuote('')
      fetchQuotes()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <form action='/new' method='POST'>
        <div className='grid grid-cols-6 gap-4 col-span-full lg:col-span-3'>
          <div className='col-span-full sm:col-span-3'>
            <label className='text-sm'>Author</label>
            <input
              name='name'
              type='text'
              placeholder='Author'
              value={author}
              onChange={handleAuthorChange}
              className='w-full rounded-md focus:ring focus:ring-opacity-75 bg-white'
            />
          </div>

          <div className='col-span-full'>
            <label className='text-sm'>Quote</label>
            <textarea
              name='text'
              placeholder='Quote'
              value={quote}
              onChange={handleQuoteChange}
              className='w-full rounded-md focus:ring focus:ring-opacity-75 bg-white'
            ></textarea>
          </div>
          <button
            type='button'
            onClick={addQuotes}
            className='border-2 p-2 bg-blue-50'
          >
            Submit
          </button>
        </div>
      </form>

      <div>
        {/* Display quotes here */}
        {quotes.map((quote) => (
          <div key={quote._id} className='p-10'>
            <p>{quote.quote}</p>
            <span className='p-10'>~{quote.author}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default Form
