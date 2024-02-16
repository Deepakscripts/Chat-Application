const mongoose = require("mongoose");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
main()
    .then(() => { console.log("Connection Successfull") })
    .catch((err) => console.log(err));
    
const Chat = require("./models/chat.js");

let allChats = [      //array of objects
    {
        from: "neha",
        to: "priya",
        msg: "send me your exam sheets",
        created_at: new Date() //js function
    },
    {
        from: "baba",
        to: "aryan",
        msg: "Hey, I'm thinking about going on a trip next month. Any recommendations?",
        created_at: new Date() //js function
    },
    {
        from: "ayush",
        to: "prashant",
        msg: " I'm in the mood for a movie tonight",
        created_at: new Date() //js function
    },
    {
        from: "hero",
        to: "sweety",
        msg: "I'm thinking about learning Spanish. Any specific apps or courses you recommend?",
        created_at: new Date() //js function
    },
    {
        from: "kinjal",
        to: "hetal",
        msg: "Have you seen Gone Girl It's a gripping thriller with plenty of twists",
        created_at: new Date() //js function
    },
    {
        from: "neha",
        to: "deepak",
        msg: " Hi, I'm organizing a charity event and I need some advice on venue options",
        created_at: new Date() //js function

    }
];

Chat.insertMany(allChats);





