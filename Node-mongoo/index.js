const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';




MongoClient.connect(url, then((client))/*(err,client)*/=>{

  assert.equal(err,null);//Assert will check to see if error = null

  console.log('Connected correctly to server');
    const db = client.db(dbname);

    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes");

        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dboper.findDocuments(db, "dishes");
          })
      .then((docs) => {
          console.log("Found Updated Documents:\n", docs);

          return db.dropCollection("dishes");
      })
      .then((result) => {
          console.log("Dropped Collection: ", result);

          return client.close();
      })


      .catch((err) => console.log(err));

/*
  console.log('Connected correctly to the server');

  const db = client.db(dbname);

  dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes", (result) => {
            console.log("Insert Document:\n", result.ops);

            dboper.findDocuments(db, "dishes", (docs) => {
                console.log("Found Documents:\n", docs);

                dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes",
                    (result) => {
                        console.log("Updated Document:\n", result.result);

                        dboper.findDocuments(db, "dishes", (docs) => {
                            console.log("Found Updated Documents:\n", docs);
                            db.dropCollection("dishes", (result) => {
                                console.log("Dropped Collection: ", result);

                                client.close();
                            });
                        });
                    });
            });
    });
*/
    .catch(err)) => console.log(err);//Then-catch PROMISE
  /*
  const collection = db.collection('dishes');

  collection.insertOne({"name":"Idli", "description":"test1"},(err, result)=>{
    assert.equal(err,null);//Check if no error.

    console.log('After Insert:\n');//If no error, console this
    console.log(result.ops);//ops = operation

    collection.find({}).toArray((err,docs)=>{
      assert.equal(err,null);

      console.log('Found:\n');
      console.log(docs);//returns all documents

      db.dropCollection('dishes',(err,result) =>{
          assert.equal(err,null);

          client.close();
      });
    });
  });
  */
});
