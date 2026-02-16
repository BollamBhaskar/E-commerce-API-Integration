
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify"

function App() {
  var [data, setData] = useState([])
  var [input, setInput] = useState("")

  async function fetchData() {
    var result = await fetch("https://fakestoreapi.com/products")
    var jsonResult = await result.json()
    setData(jsonResult)
  }

  useEffect(() => {
    fetchData()
  }, [])

  var filteredData = data.filter(item =>
    item.title.toLowerCase().includes(input.toLowerCase())
  )

  function handleSearch(e) {
    e.preventDefault()

    if (filteredData.length > 0) {
      toast.success("Product found ")
    } else {
      toast.error("Couldn't find ")
    }
  }

  return (
    <div>
      <ToastContainer />

      <form onSubmit={handleSearch}>
        <center>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="search"
            style={{
              width: "100px",
              height: "15px",
              padding: "4px 8px"
            }}
          />
        </center>
      </form>

      {filteredData.map((item) => (
        <div>
          <h1>{item.title}</h1>
          <img src={item.image } alt=''></img>
        </div>
      ))}
    </div>
  )
}

export default App