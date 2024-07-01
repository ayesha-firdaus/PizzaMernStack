const mongoose = require("mongoose");
const Pizza = require("../Model/PizzaModal");  // Correct the file name to PizzaModel
const User = require("../Model/UserModel");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/../.env` });
const db = process.env.DATABASE_URL;

console.log(db);

const pizzaData = JSON.parse(fs.readFileSync(`${__dirname}/Pizzas.json`, "utf-8"));
const userData = JSON.parse(fs.readFileSync(`${__dirname}/user.json`, "utf-8"));
console.log(pizzaData)
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(con => console.log("Database connected successfully"))
  .catch(err => console.log("Database connection error:", err));

async function importData() {
  try {
    await Pizza.create(pizzaData);
    await User.create(userData, { validateBeforeSave: false });
    console.log("Data loaded successfully");
  } catch (error) {
    console.log("Error importing data:", error);
  } finally {
    process.exit();
  }
}

async function deleteData() {
  try {
    await Pizza.deleteMany();
    await User.deleteMany();
    console.log("Data deleted successfully");
  } catch (error) {
    console.log("Error deleting data:", error);
  } finally {
    process.exit();
  }
}

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
