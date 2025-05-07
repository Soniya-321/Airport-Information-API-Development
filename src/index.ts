import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
//import { DataSource } from "typeorm";
import airportRoute  from './routes/airportRoute';

const app = express();
const PORT = 3000;

app.use(express.json()); // To parse JSON
app.use('/api', airportRoute); // Mount airport routes

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected successfully");

    // Start the server only after DB is connected
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to the database:", error);
  });