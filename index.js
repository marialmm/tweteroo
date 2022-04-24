import express from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();

const users = [
    {
        username: "bobesponja",
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    },
];
const tweets = [{
    username: "bobesponja",
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub",
}];

app.use(cors());

app.use(express.json());

app.get("/tweets", (req, res) => {
    const page = parseInt(req.query.page);
    if (page > 0) {
        const lastTweets = [];
        if (tweets.length > 10 * page) {
            const firstIndex = tweets.length - 1 - (page - 1) * 10;
            const lastIndex = tweets.length - 11 - (page - 1) * 10;
            for (let i = firstIndex; i > lastIndex; i--) {
                lastTweets.push(tweets[i]);
            }
        } else {
            for (let i = tweets.length - (page - 1) * 10 - 1; i >= 0; i--) {
                lastTweets.push(tweets[i]);
            }
        }

        res.send(lastTweets);
    } else{
        res.status(400).send("Informe uma página válida!")
    }
});

app.get("/tweets/:username", (req, res) => {
    const username = req.params.username;
    const userTweets = tweets.filter((tweet) => tweet.username === username);
    if (userTweets.length === 0) {
        res.sendStatus(400);
    } else {
        res.send(userTweets);
    }
});

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    if (username === "" || avatar === "") {
        res.status(400).send("Todos os campos são obrigatórios");
    } else {
        let userAlreadyExist = false;
        users.forEach((user) => {
            if (user.username === username) {
                userAlreadyExist = true;
            }
        });
        if (userAlreadyExist) {
            res.sendStatus(409);
        } else {
            const user = { username, avatar };
            users.push(user);
            res.status(201).send("OK");
        }
    }
});

app.post("/tweets", (req, res) => {
    const { tweet } = req.body;
    const username = req.header("user");
    if (username === "" || tweet === "") {
        res.status(400).send("Todos os campos são obrigatórios");
    } else {
        const user = users.find((user) => user.username === username);
        const tweetObect = {
            username,
            tweet,
            avatar: user.avatar,
        };
        tweets.push(tweetObect);

        res.status(201).send("OK");
    }
});

app.listen(5000);
