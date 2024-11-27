import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
//import nodemon from 'nodemon';



const PORT = 3000;
const root = path.dirname(fileURLToPath(import.meta.url))
const app = express()

app.get("/hi", (req, res) => {
    res.send("Hi, there")
})

app.get("/greeting", (req, res) => {
    res.send("Hello,  John Doe")
})
app.get("nodejs", (req, res) =>(
    res.send("A Node.js egy olyan szerveroldali JavaScript futtatókörnyezet, amely a V8 JavaScript motorra épül.")
))

//app.use(express.static(path.join(root, 'https://github.com/KAnti-VP/web/blob/main/assets/index.html')))

app.get("/", (req, res) => {
    res.sendFile(path.join(root, 'public', 'index.html'))})

app.use(express.static(path.join(root, 'public')))

const users = [
    { id: "1",  name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Sam Johnson" },
  ];
  app.get("/users", (req, res) => {res.status(200).json(users)})

  app.get("/users/:id", (req, res) => {
    const id = req.params.id
    const [user] = users.filter(e => e.id == id)
    if (!user) {
        return res.status(404).json({message: "Felhasználó nem találva"})
    }
    res.status(200).json(user)
})

app.delete("/users/:id", (req, res) => {
    const id = req.params.id
    const user = users.filter(e => e.id == id)
    users = users.filter(e => e.id != id)
    res.sendStatus(204)
})

//app.listen(PORT, () => { console.log(`A szerver ezen a porton fut ${PORT}`)});