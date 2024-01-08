const { memphis } = require("memphis-dev");

(async function () {
    let memphisConnection

    try {
        memphisConnection = await memphis.connect({
            host: 'aws-eu-central-1.cloud.memphis.dev',
            username: '<client user>',
            password: '<pass>',
            accountId: 00000
        });

        const consumer = await memphisConnection.consumer({
            stationName: 'rtt-test',
            consumerName: 'c1',
            batchSize: 1,
            pullIntervalMs: 10,
            batchMaxTimeToWaitMs: 1000,
        });
        consumer.on("message", (message) => {
            const now = new Date().getTime();
            console.log(now);
            message.ack();
        });
    } catch (ex) {
        console.log(ex);
        if (memphisConnection) memphisConnection.close();
    }
})();
