const express = require('express');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

const port = 3001;

const favorites = new Set();

app.get("/api/favorites", (req, res) => {
    return res.json(Array.from(favorites));
})

app.post("/api/favorites", (req, res) => {
    const { id } = req.body;
    if (favorites.has(id)) {
        favorites.delete(id);
    } else {
        favorites.add(id);
    }
    console.log(favorites);
    return res.json(Array.from(favorites));
})

app.listen(port, () => {
    console.info(`server is started at port ${port}`);
})