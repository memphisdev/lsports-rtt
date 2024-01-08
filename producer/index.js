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

        const producer = await memphisConnection.producer({
            stationName: 'rtt-test',
            producerName: 'p1'
        });

        // now in unix time
        const now = new Date().getTime();
        console.log(now);
        await producer.produce({
            message: Buffer.from("Message: Hello world"),
            asyncProduce: true
        });

        memphisConnection.close();
    } catch (ex) {
        console.log(ex);
        if (memphisConnection) memphisConnection.close();
    }
})();
