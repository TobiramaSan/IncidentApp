// a fuction that we can call to give individual sockets
import { io } from "socket.io-client"
const joinCatButton = document.getElementById("cat-button")
const messageInput = document.getElementById("message-input")
const catInput = document.getElementById("cat-input")
const form = document.getElementById("form")

// This is a piece of JavaScript code that uses the Socket.IO l
// ibrary to establish a connection to a server running on l
// ocalhost at port 3000, and then displays a message indicating t
// hat the connection has been established and the ID of the socket.
const socket = io('http://localhost:3000')
socket.on("connect", () => {
    displayMessage(`You connected with id: ${socket.id}`)
})

socket.on('receive-message', message => {
    displayMessage(message) 
})

form.addEventListener("submit", e => {
    e.preventDefault()
    alert("New Incident has been added")
    const message = messageInput.value
    const cat = catInput.value

    if (message === "") return
    displayMessage(message)
    // this takes any event and submits it to the server
    //lets new incidents be seen by multiple users
    socket.emit("new-message", message, cat )
    messageInput.value = ""
})

joinCatButton.addEventListener("click", () =>{
    const cat = catInput.value
    socket.emit('join-cat', cat, message => {
        displayMessage(message)
    })
})

function displayMessage(message){
    const div = document.createElement("div")
    div.textContent = message
    document.getElementById("message-container").append(div)
}