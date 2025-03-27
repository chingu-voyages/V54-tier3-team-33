const {connect} = require("mongoose");
module.exports= {
    connectToDatabase :async () => {
        try{
            await  connect(process.env.MONGODB_URI,
                {
                    useNewUrlParser:true,
                    useUnifiedTopology:true
                }
            )
            console.log('MongoDb connexion established successfully')
        }catch(err){
            console.log(`MongoDb connexion failed , ${err}`)
        }
    }
}
