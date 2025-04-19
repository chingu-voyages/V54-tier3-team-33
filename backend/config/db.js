const { connect } = require('mongoose')
module.exports= {
  connectToDatabase :async () => {
    let mongodb_url = ''
    try{
      if (process.env.NODE_ENV === 'test'){
        mongodb_url = process.env.TEST_MONGODB_URI
      }else{
        mongodb_url = process.env.MONGODB_URI
      }
      await  connect(mongodb_url
      )
      console.log('MongoDb connexion established successfully')
    }catch(err){
      console.log(`MongoDb connexion failed , ${err}`)
    }
  }
}
