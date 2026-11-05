const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

async function main() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB successfully');

    // Select database and collection
    const db = client.db('GreenThumbDB');
    const plants = db.collection('plants');

    // Create - insert a document
    const insertResult = await plants.insertOne({
      name: 'Rose',
      type: 'Flower',
      ageInMonths: 18
    });
    console.log('Inserted ID:', insertResult.insertedId);

    // Read - retrieve documents
    const allPlants = await plants.find({}).toArray();
    console.log('Plant Records:', allPlants);

    // Update - modify a document
    const updateResult = await plants.updateOne(
      { name: 'Rose' },
      { $set: { ageInMonths: 19 } }
    );
    console.log('Updated documents:', updateResult.modifiedCount);

    // Delete - remove a document
    const deleteResult = await plants.deleteOne({
      name: 'Rose'
    });
    console.log('Deleted documents:', deleteResult.deletedCount);

  } catch (error) {
    console.error('Database error:', error.message);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

main();
