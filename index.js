const mongoose = require('mongoose')

class RTObserver {
  constructor(config) {
    this.config = config
  }
}

class RTMongoObserver extends RTObserver {
  db = undefined
  collection = undefined
  client = undefined
  target = {}

  constructor(config) {
    super(config)

    mongoose
      .connect(
        `mongodb+srv://${this.config.SERVER_ID}:${this.config.SERVER_PW}@${this.config.SERVER_URL}`,
        { dbName: this.config.MONGO_DATABASE },
      )
      .then(async () => {
        console.log('[Start] MongoDB ! ')
        this.server = mongoose.connection
      })
      .catch((e) => {
        console.log('[Error] MongoDB !!!', e)
      })
  }

  getCollection = (
    collection = this.config.MONGO_COLLECTION,
    inSchema = {},
  ) => {
    if (!this.collection) {
      const schema = new mongoose.Schema(inSchema)
      this.collection = mongoose.model(collection, schema)
    }

    return this.collection
  }

  subscribe = (target, option) => {
    if (!target) {
      console.log(
        '[RTMongoObserver] Error : Must input first parameter (db or collection)',
      )
      return
    }

    target.uuid = new Date().getTime()

    console.log('[RTMongoObserver] subscribe - uuid : ' + target.uuid)

    return new Promise((resolve, reject) => {
      const changeStream = target.watch(option)
      this.target = {
        [target.uuid]: changeStream,
      }

      changeStream.on('change', (data) => {
        resolve(data)
      })
    })
  }

  unsubscribe = (target) => {
    return new Promise((resolve, reject) => {
      if (target && target.uuid) {
        console.log('[RTMongoObserver] unsubscribe - uuid : ' + target.uuid)
        this.target[target.uuid].close()
        resolve(true)
      }
      reject(false)
    })
  }
}

module.exports.RTObserver = RTObserver
module.exports.RTMongoObserver = RTMongoObserver
