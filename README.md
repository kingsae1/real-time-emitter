![RealTimeObserver]('./realtimeobserver.JPG')

# real-time-observer

real-time-observer is a plugin of node module to subscribe lots of databases.
but this beta feature is available to use MongoDB

At first, Must initailize Observer class with config (currently support only for MongoDB)

```js
const { RTMongoObserver } = require("./index.js");
const observer = new RTMongoObserver({
  SERVER_TYPE: "MONGODB",
  SERVER_URL: "",
  SERVER_ID: "",
  SERVER_PW: "",
  MONGO_DATABASE: "",
  MONGO_COLLECTION: "",
});
```

And then optionally you can define collection name. If not defined, load the config property (MONGO_COLLECTION)

```js
observer.getCollection("COLLECTION_NAME");
```

This way is to subscribe observer (MongoDB collection)

```js
// subscribe database
observer.subscribe(observer.getCollection()).then((data) => {
  console.log(data);
});
```

I recommend unsubscribe after (unmount/disolve/disable ..) case

```js
// Remove Listner
setTimeout(() => {
  observer.unsubscribe(observer.getCollection());
}, 2000);
```
