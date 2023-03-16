import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import cors from 'cors';

dotenv.config();

const openAiConfig = new Configuration({
    apiKey: process.env.OPENAI
});
const openAi = new OpenAIApi(openAiConfig);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('It is Working!!!');
});

app.post('/dream', async (req, res) => {
    const prompt = req.body.prompt;
    if (!prompt) {
        res.status(400).send('Prompt cannot be empty');
    }

    try {
        const aiResponse = await openAi.createImage({
            prompt,
            n: 1,
            size: '256x256'
        });
    
        const image = aiResponse.data.data[0].url;
        res.send({ image });
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            console.log(error.message);
            res.status(500).send('Something went wrong');
        }
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});