const { RTMongoObserver } = require("./index.js");

const observer = new RTMongoObserver({
  SERVER_TYPE: "",
  SERVER_URL: "",
  SERVER_ID: "",
  SERVER_PW: "",
  MONGO_DATABASE: "",
  MONGO_COLLECTION: "",
});

// Set listner
observer.subscribe(observer.getCollection()).then((data) => {
  console.log(data);
});

// Remove Listner
setTimeout(() => {
  observer.unsubscribe(observer.getCollection());
}, 2000);
