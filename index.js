const cors = require("cors")
const express = require("express");
const uuid = require("uuid");
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors())

const users = []
const myFirstMiddleware = ( request, response, next ) => {
    next()
}
app.use(myFirstMiddleware)

const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex( user => user.id === id )
    if ( index < 0 ) {
        return response.status(404).json({error: "User not found"})
    }
    request.userIndex = index
    request.userId = id 
    next()
}

app.get("/users", (request,response) => {
    return response.json(users)
})

app.post("/users", (request,response) => {
    const { name, order } = request.body
    const user = { id: uuid.v4(), name, order}
    users.push(user)
    return response.status(201).json(user)
})

app.put("/users/:id"), checkUserId, (request, response) => {
    const { order, name } = request.body
    const index = request.userIndex
    const id = request.userId

    const updatedUser = {id, name, order} 
    users[index] = updatedUser
    return response.json(updatedUser)
}

app.delete("/users/:id"), checkUserId, (request, response) => {
    const index = request.userIndex
    users.splice(index,1)
    return response.status(204).json()
}

app.listen(3001, () => {
    console.log(`O servidor está hospedado na porta ${port}`)
})