import express from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();

const users = [];
const tweets = [
    {
        username: "bobesponja",
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
        tweet: "eu amo o hub",
    },
];

app.use(cors());

app.use(express.json());

app.get("/tweets", (req, res) => {
    const lastTweets = [];
    if (tweets.length > 10) {
        for (let i = tweets.length - 1; i > tweets.length - 11; i--) {}
    } else {
        for (let i = tweets.length - 1; i >= 0; i--) {
            lastTweets.push(tweets[i]);
        }
    }

    res.send(lastTweets);
});

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    const user = { username, avatar };
    users.push(user);

    res.send("OK");
});

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
    const user = users.find((user) => user.username === username);
    const tweetObect = {
        username,
        tweet,
        avatar: user.avatar,
    };
    tweets.push(tweetObect);
    
    res.send("OK");
});

app.listen(5000);
