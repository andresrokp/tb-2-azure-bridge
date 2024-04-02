// Import the necessary modules
require('dotenv').config();
const { Client, Message } = require('azure-iot-device');
const Protocol = require('azure-iot-device-mqtt').Mqtt

// Define the connection string for your IoT Hub
const deviceConnectionString = process.env.DEVICE_CONNECTION_STRING;
let client = Client.fromConnectionString(deviceConnectionString, Protocol);

// Create the message body
const messageBody = {
    tagsArray: [
        { TagID: '0700EE00A0338EA2', Rssi: -24, Numero: 0 },
        { TagID: '0700EE00A0562596', Rssi: -24, Numero: 1 },
        { TagID: '0700EE00A04092E3', Rssi: -24, Numero: 2 },
        { TagID: '0700EE00A05201D0', Rssi: -24, Numero: 3 },
        { TagID: '0700EE00A03431D6', Rssi: -24, Numero: 4 },
        { TagID: '0700EE00A01621D4', Rssi: -24, Numero: 5 },
        { TagID: '0700EE00A0853372', Rssi: -24, Numero: 6 },
        { TagID: '0700EE00A044B6A5', Rssi: -24, Numero: 7 },
        { TagID: '0700EE00A0828C06', Rssi: -24, Numero: 8 },
        { TagID: '0700EE00A00729D5', Rssi: -24, Numero: 9 }
    ],
    BodegaID: 'casabetruck1',
    ts: Date.now(),
    Latitude: 6.9690366,
    Longitude: -73.9446799
};

// Connect to the IoT Hub and send the message
client.open(function (err) {
    if (err) {
        console.error('Could not connect: ' + err.message);
    } else {
        console.log('Client connected to Azure IoT Hub');

        // Create a message from the message body
        const message = new Message(JSON.stringify(messageBody));

        // Send the message
        client.sendEvent(message, function (err,res) {
            if (err) {
                console.error('Error sending message: ' + err.toString());
            } else {
                console.log('Message sent to Azure IoT Hub',res,messageBody);
            }

            // Close the client connection
            client.close(function (err) {
                if (err) {
                    console.error('Error closing connection: ' + err.message);
                } else {
                    console.log('Client disconnected from Azure IoT Hub');
                }
            });
        });
    }
});
