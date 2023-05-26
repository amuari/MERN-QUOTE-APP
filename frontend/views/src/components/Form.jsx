import { useEffect, useState } from 'react'
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
      const data = await response.data
      console.log(data.quoteslist)
      setQuotes(data.quoteslist)
    } catch (error) {
      console.log(error)
    }
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

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleQuoteChange = (event) => {
    setQuote(event.target.value)
  }

  return (
    <>
      <form action='/new' method='POST'>
        <div className='grid grid-cols-6 gap-4 col-span-full lg:col-span-3'>
          <div className='col-span-full sm:col-span-3'>
            <label htmlFor='author' className='text-sm'>
              Author
            </label>
            <input
              name='author'
              type='text'
              placeholder='Author'
              value={author}
              onChange={handleAuthorChange}
              className='w-full rounded-md focus:ring focus:ring-opacity-75 bg-white'
            />
          </div>

          <div className='col-span-full'>
            <label htmlFor='quote' className='text-sm'>
              Quote
            </label>
            <textarea
              name='quote'
              placeholder='Quote'
              value={quote}
              onChange={handleQuoteChange}
              className='w-full rounded-md focus:ring focus:ring-opacity-75 bg-white'
            ></textarea>
          </div>
          <button type='button' onClick={addQuotes}>
            Submit
          </button>
        </div>
      </form>

      <div>
        {/* display here */}
        {quotes.map((quote) => (
          <div key={quote._id}>
            <span>{quote.author}</span>
            <p>{quote.quote}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Form
