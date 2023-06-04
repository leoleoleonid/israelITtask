type TaskFunction = () => Promise<string>;
import http, { RequestOptions } from 'http';

export class TaskQueue {
    private concurrency: number = 5;
    private running: number = 0;
    private queue: TaskFunction[];
    constructor (concurrency: number) {
        this.concurrency = concurrency
        this.running = 0
        this.queue = []
    }

    pushTask (task: TaskFunction) {
        this.queue.push(task)
        process.nextTick(this.next.bind(this))
        return this
    }

    next () {
        console.log('pushTask')
        console.log('running', this.running)
        console.log('queue', this.queue.length)
        while (this.running < this.concurrency && this.queue.length) {
            const task = this.queue.shift()
            if (task) {
                task().then(() => {
                    this.running--
                    process.nextTick(this.next.bind(this))
                })
                this.running++
            }
        }
    }
}


function createReqParams(): { options: RequestOptions , postData: string} {
    const postData = JSON.stringify({ data: (Math.random() + 1).toString(36).substring(7) });
    const options: RequestOptions = {
        hostname: 'localhost',
        port: 8000, //TODO to config
        path: '/e1',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
        },
    };

    return {options, postData};
}
const postRequest = (): Promise<string> => {
    const {options, postData} = createReqParams();
    console.log(postData);
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                console.log('resolved ', responseData)
                // setTimeout(() => resolve(responseData),500)
                resolve(responseData);
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(postData);
        req.end();
    });
};

const queue = new TaskQueue(5);

const loop = (i: number) => {
    console.log('i',i)
    queue.pushTask(postRequest);
    i = i+1;
    setTimeout(() => loop(i), 0)
}
loop(0);
