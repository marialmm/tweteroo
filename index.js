import express from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();

const usuarios = [];
const tweets = [];

app.use(cors());

app.get("/tweets", (req, res) => {
    const ultimosTweets = [];
    for(let i = tweets.length - 1; i<tweets.length - 11; i--){
        ultimosTweets.push(tweets[i]);
    }
    console.log(chalk.blue("Enviando tweets"));

    res.send(ultimosTweets);

})

app.listen(5000);