import React, { useState, useEffect } from "react"

const Adventureshow = (props) => {
  const [adventure, setAdventure] = useState({})

  const getAdventure = async () => {
    try {
      const adventureId = props.match.params.id
      const response = await fetch(`/api/v1/adventures/${adventureId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const responseBody = await response.json()
      setAdventure(responseBody.adventure)
    } catch(err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getAdventure()
  }, [])

  return (
    <>
      <h1>{adventure.title}</h1>
      <h2>{adventure.location}</h2>
    </>
  )
}

export default Adventureshow
