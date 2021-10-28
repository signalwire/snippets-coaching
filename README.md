# About Coaching
This guide will show you how to use Coaching and Recording features. Easily learn how to implement conference controls that are the foundation of many call center implementations with the [SignalWire Node.js SDK](https://developer.signalwire.com/twiml/reference/client-libraries-and-sdks#nodejs).

![Screenshot](coach-screen-snap.png)

# Setup Your Environment File

1. Copy from example.env and fill in your values
2. Save new file called .env

Your file should look something like this
```
# This is the full name of your SignalWire Space. e.g.: example.signalwire.com
SIGNALWIRE_SPACE=
# Your Project ID - you can find it on the `API` page in your Dashboard.
SIGNALWIRE_PROJECT=
# Your API token - you can generate one on the `API` page in your Dashboard
SIGNALWIRE_TOKEN=
# The phone number you'll be using for this guide. Must include the `+1`, 
INBOUND_NUMBER=
# The phone number you'll be using for this guide. Must include the `+1`, 
AGENT_NUMBER=
# The phone number you'll be using for this guide. Must include the `+1`, 
SUPERVISOR_NUMBER=
# Hostname, the IP address, or Fully Qualified Domain Name of your host and port, for routing action URLs
HOSTNAME=
```

# Set up your Node.js Environment with Express

Let's set up your Node.js environment with Express to handle web requests.

On the command line in your current directory, run the following command:

To install Signalwire SDK via NPM (Node Package Manager)
```
npm install @signalwire/node
```
To install express via NPM (Node Package Manager)
```
npm install express
```

To build your react components run
```
npm run build
```

To run the example, and start the express server run the following command.
The server will run on port 5000, you can change the port in the code if you wish.
```
node server.js
```
You can now load the dashboard by visiting your hostname on port 5000, and as you make calls they will appear on the dashboard.
i.e. http://myhost:5000 
 
# Methods and Endpoints

When your Signalwire number receives an incoming voice call to the `/inbound` endpoint, Signalwire will dial the predefined agent phone number as specified in the environment file, and then once the agent is connected, will connect the supervisor to the call.

```
Endpoint: /inbound
Methods: GET OR POST
This endpoint handles the incoming call and will spawn a call to an agent and a supervisor.
```

Web API Endpoints
```

// updates an in progress conference.
/api/conferences/update

// updates an in progress call
/api/calls/update

// entry for dashboard
/api/dashboard

// helper for demo that keeps track of caller role i.e. agent, supervisor, customer
/api/helpers/lookupCaller

// start recording
/api/recordings/start

// stop recording
/api/recordings/stop

// resume recording
/api/recordings/resume

// List recording for a call
/api/recordings/list

// Get Participants for call
/api/participants
```


# Build and Run on Docker

1. Use our pre-built image from Docker Hub 
```
docker pull signalwire/snippets-coaching:node
```
(or build your own image)

1. Build your image
```
docker build -t snippets-coaching .
```
2. Run your image
```
docker run --publish 5000:5000 --env-file .env snippets-coaching
```
3. The application will run on port 5000

# Build and Run Natively

1. Replace environment variables
2. From command line run, node server.js

# Sign Up Here

If you would like to test this example out, you can create a SignalWire account and space [here](https://m.signalwire.com/signups/new?s=1).

Please feel free to reach out to us on our Community Slack or create a Support ticket if you need guidance!
