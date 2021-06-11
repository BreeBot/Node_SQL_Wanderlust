import pg from "pg"
import fs from "fs"
import _ from "lodash"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/monolith_adventures_development"
})

class Adventure {
  constructor({ title, location, id = null }) {
    this.id = id;
    this.title = title;
    this.location = location;
  }

  static async findAll() {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM adventures;");

      const adventureData = result.rows;

      const adventures = adventureData.map((adventure) => {
        return new this(adventure);
      })
      
      client.release()
      return adventures
    } catch (error) {
      console.log(error)
      pool.end()
    }
  }

  static async findById(id) {
    try {
      const client = await pool.connect()
      const result = await client.query("SELECT * FROM adventures WHERE id = $1", [id])
      const adventureData = result.rows[0]
      const adventure = new this(adventureData)
      client.release()
      return adventure
    } catch (error) {
      console.error(error)
      pool.end()      
    }
  }

  async save() {
    try {
      const client = await pool.connect()
      const queryString = "INSERT INTO adventures (title, location) VALUES ($1, $2) RETURNING id"
      const values = [this.title, this.location]
      const result = await client.query(queryString, values)

      //const result = await client.query("SELECT * FROM adventures ORDER BY id DESC LIMIT 1;")

      const adventureId = result.rows[0].id
      this.id = adventureId
      client.release()
      return true
      
    } catch (error) {
      console.error(error)
      pool.end()
      return false
      
    }
  }  
}

export default Adventure
