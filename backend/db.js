const mongoose = require('mongoose')
// const mongoDbClient = require("mongodb").MongoClient
const mongoURI = 'mongodb://Moin0606:Moin0606@ac-eaivvt2-shard-00-00.5yz1ttr.mongodb.net:27017,ac-eaivvt2-shard-00-01.5yz1ttr.mongodb.net:27017,ac-eaivvt2-shard-00-02.5yz1ttr.mongodb.net:27017/goFoodMERN?ssl=true&replicaSet=atlas-j96737-shard-0&authSource=admin&retryWrites=true&w=majority';
// mongodb://<username>:<password>@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority
async function retrieveData() {
  try{
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB Atlas');
        // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
       
          const collection = mongoose.connection.db.collection('food_items');

          // Use the find method to retrieve all documents
          const data = await collection.find({}).toArray();
          
          const collection2=mongoose.connection.db.collection('food_category');
          const foodCategory=await  collection2.find({}).toArray();
      
            global.food_ingred = data;
    global.food_cat = foodCategory;
    console.log(global.food_cat);
    console.log(global.food_ingred);

  }catch(err)
  {
    console.log(err);
  }
            // listCollections({name: 'food_items'}).toArray(function (err, database) {
            // });
            //     module.exports.Collection = database;
            // });
        }
module.exports=retrieveData;