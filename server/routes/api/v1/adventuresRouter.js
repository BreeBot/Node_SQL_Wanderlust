import express from "express"
import Adventure from "../../../models/Adventure.js"

const adventuresRouter = new express.Router()

adventuresRouter.get('/', async (req, res) => {
  try {
    //get and return the list of adventures using the model
    //grab our adventures through adventures model
    const adventures = await Adventure.findAll()
    res.status(200).json({ adventures: adventures })
  } catch (error) {
    console.error(error)
    res.status(500).json({ errors: error })
  }
})

adventuresRouter.get('/:id', async (req, res) => {
  try {
    //get and return a single adventure using the model
    const adventureId = req.params.id
    const adventure = await Adventure.findById(adventureId)
    return res.status(200).json({ adventure: adventure })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

adventuresRouter.post('/', async (req, res) => {
  try {
    //save the posted data to the database and return it, with the id it was given in the database, to the front end.
    const formData = req.body
    const newAdventure = new Adventure(formData)
    //console.log(newAdventure)

    if (await newAdventure.save()) {
      return res.status(201).json({ adventure: newAdventure })
    } else {
      return res.status(422).json({ errors: newAdventure.errors })
    }
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
    
    
  //   newAdventure.save()
  //   return res.status(201).json({ adventure: newAdventure})
  // } catch (error) {
  //   console.log(error)
  //   return res.status(500).json({ errors: error })
  // }

})

export default adventuresRouter
