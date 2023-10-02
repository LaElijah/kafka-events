import express from 'express';
const app = express();
import queueMessage from './_utils/queueMessage.js';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;







app.use(express.json());


app.get('/', (req, res) => {
    res.send("hi")
})

app.post('/create', async (req, res) => {

    try {

        const body = await req.body
        console.log(body)
     
        const event = {
            message: req.body.payload.message,
            groupId: req.body.payload.groupId,
            userId:  req.body.payload.userId,
        }

        await queueMessage(event);

        res.send("Message queued successfully")
        

    } catch (error) {
        res.send("Message queue failed")
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})




