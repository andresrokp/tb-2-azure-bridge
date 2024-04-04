// Azure SDK load
const { Client, Message } = require('azure-iot-device');
const Protocol = require('azure-iot-device-mqtt').Mqtt;

// IoT handler set up
const deviceConnectionString = process.env.DEVICE_CONNECTION_STRING;
const client = Client.fromConnectionString(deviceConnectionString, Protocol);

async function sendMessageToIotHub (req, resp) {
  messageBody = req.body;

  // Connect to the IoT Hub
  client.open(function (err) {
    if (err) {
      console.error('Could not connect: ' + err.message);
      return resp.status(500);
    }

    console.log('Client connected to Azure IoT Hub');

    // Create message object
    const message = new Message(JSON.stringify(messageBody));

    // Send the message
    console.log('message', message)
    client.sendEvent(message, function (err, res) {
      if (err) {
        console.error('Error sending message: ' + err.toString());
        client.close();
        return resp.sendStatus(500);
      }

      console.log('Message sent to Azure IoT Hub', res, messageBody);

      // Close the client connection
      client.close(function (err) {
        if (err) {
          console.error('Error closing connection: ' + err.message);
          return resp.sendStatus(500);
        }
        console.log('Client disconnected from Azure IoT Hub');
        return resp.sendStatus(200);
      });
    });
  });
};

module.exports = { sendMessageToIotHub };