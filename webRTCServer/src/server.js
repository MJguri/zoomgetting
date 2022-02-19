import express from "express"

const app = express();
const port = 3333;
const handleListen = () => console.log(`Server Start! Port:${port}`)
app.listen(port, handleListen);