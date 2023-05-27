import { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

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
      notify()
    } catch (error) {
      console.error(error)
    }
  }
  const deleteQuote = async (quoteId) => {
    try {
      await axios.delete(`http://localhost:4000/deletequote/${quoteId}`)
      fetchQuotes()
      notify('Quote Deleted')
    } catch (error) {
      console.error(error)
    }
  }

  const editQuote = async (quoteId) => {
    try {
      await axios.put(`http://localhost:4000/editquote/${quoteId}`, {
        author: author,
        quote: quote,
      })
      setAuthor('')
      setQuote('')
      fetchQuotes()
      notify('Quote Updated')
    } catch (error) {
      console.error(error)
    }
  }

  const notify = () => toast.success('Quote Added')

  return (
    <>
      <form action='/new' method='POST' className='my-4'>
        <div className='grid grid-cols-6 gap-4 col-span-full lg:col-span-3'>
          <div className='col-span-full sm:col-span-3'>
            <label className='text-sm'>Author</label>
            <input
              name='name'
              type='text'
              placeholder='Author'
              value={author}
              onChange={handleAuthorChange}
              className='w-full rounded-md focus:ring focus:ring-opacity-75 bg-white px-4 py-2'
            />
          </div>

          <div className='col-span-full'>
            <label className='text-sm'>Quote</label>
            <textarea
              name='text'
              placeholder='Quote'
              value={quote}
              onChange={handleQuoteChange}
              className='w-full rounded-md focus:ring focus:ring-opacity-75 bg-white px-4 py-2'
            ></textarea>
          </div>
          <button
            type='button'
            onClick={addQuotes}
            className='border-2 p-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors'
          >
            Submit
          </button>
          <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={true}
          />
        </div>
      </form>

      <div>
        {/* Display quotes here */}
        {quotes.map((quote) => (
          <div
            key={quote._id}
            className='p-6 bg-white rounded-lg shadow-md mb-4 transition-transform hover:scale-105'
          >
            <div className='flex items-center justify-between'>
              <p className='w-3/4 text-lg'>{quote.quote}</p>
              <div className='flex space-x-3'>
                <FaEdit
                  className='text-gray-500 hover:text-blue-500 cursor-pointer'
                  onClick={() => editQuote(quote._id)}
                />
                <FaTrashAlt
                  className='text-gray-500 hover:text-red-500 cursor-pointer'
                  onClick={() => deleteQuote(quote._id)}
                />
              </div>
            </div>

            <div className='text-gray-600 mt-2'>~ {quote.author}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Form
