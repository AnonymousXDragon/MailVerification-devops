const express = require('express');
require('dotenv').config();
const {ConnectDb} =  require('./database/connect.js')
const Prometheus = require('prom-client')
const cors = require('cors')

const app = express()
app.use(express.json())
// development
app.use(cors({
    origin: '*'
}))

const requestDurationInMicro = new Prometheus.Histogram({
    name: 'http_req_duration_ms',
    help: 'duration of http requests in ms',
    labelNames: ['route'],    
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
});

app.use((req,res,next) => {
    const start = process.hrtime()

    res.on('finish', () => {

        const diff = process.hrtime(start);
        const responseTimeInMs = (diff[0] * 1e3) + (diff[1] / 1e6)
        requestDurationInMicro
            .labels(req.originalUrl)
            .observe(responseTimeInMs);
    })

    next();
})

app.get('/metrics', async (req,res) => {
    try {

        const metrics = await Prometheus.register.metrics()
        res.set('Content-Type', Prometheus.register.contentType)
        res.end(metrics)
        
    } catch (error) {
        throw error
    }
})

const userRouter = require('./routes/user.route.js')
app.use('/user',userRouter)

const PORT = process.env.PORT || 7000

app.listen(PORT,async () => {
    await ConnectDb()
    console.log(`server is listening on http://http://127.0.0.1::${PORT}`)
})