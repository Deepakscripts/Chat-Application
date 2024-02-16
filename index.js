const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");

const mongoose = require("mongoose");

// Function to establish connection to MongoDB
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
main()
    .then(() => { console.log("Connection Successful") })
    .catch((err) => console.log(err));

const Chat = require("./models/chat.js"); // Importing the Chat model

// Setting views directory and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serving static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Parsing incoming request bodies
app.use(express.urlencoded({ extended: true }));

// Using method-override for PUT and DELETE requests
app.use(methodOverride("_method"));

// Listening on specified port
app.listen(port, () => {
    console.log(`${port} Working Fine`);
});

// Root route
app.get("/", (req, res) => {
    res.send("Root Working Fine");
});

// Route to display all chats
app.get("/chats", async (req, res) => {
    try {
        let chats = await Chat.find(); //.find returns a promise
        res.render("index.ejs", { chats });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving chats");
    }
});

// New chat route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

// Create new chat route
app.post("/chats", (req, res) => {
    try {
        let { from, msg, to } = req.body;
        let newChat = new Chat({
            from: from,
            msg: msg,
            to: to,
            created_at: new Date()
        });

        // Saving the new chat to the database
        newChat.save()
            .then((result) => {
                console.log(result);
                res.redirect("/chats");
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error creating chat");
            });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// Edit chat route
app.get("/chats/:id/edit", async (req, res) => {
    try {
        let { id } = req.params;
        let chat = await Chat.findById(id);
        res.render("edit.ejs", { chat });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error editing chat");
    }
});

// Update chat route
app.put("/chats/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let { newMsg } = req.body;
        let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true });
        console.log(updatedChat);
        res.redirect("/chats");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating chat");
    }
});

// Delete chat route
app.delete("/chats/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let deletedChat = await Chat.findByIdAndDelete(id);
        console.log(deletedChat);
        res.redirect("/chats");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting chat");
    }
});