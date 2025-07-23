const {Worker} = require('bullmq');
const Redis = require('ioredis');
const sendMail = require('./src/utils/sendMail');

const redisConnection = new Redis({
    host:"127.0.0.1",
    port:6379,
    maxRetriesPerRequest:null
})

const worker = new Worker(
    "taskQueue",
    async(job) => {
        console.log(`job processiong for ${job.data.name}`);
        // await new Promise((resolve)=>setTimeout(resolve, 7000));
        await sendMail(job.data.email, "WELCOME", job.data.name);
        console.log(`job done for ${job.data.name}`);
    },
    {connection: redisConnection}
)

worker.on("completed", (job)=>{
    console.log(`job completed for ${job.id}`);
})

worker.on("failed", (job, err)=>{
    console.log(`job ${job.id} failed ${job.err}`);
})