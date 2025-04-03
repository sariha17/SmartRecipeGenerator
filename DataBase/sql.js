var mysql = require('mysql2');
require('dotenv').config();

class SmartRecipeDB{
  constructor(){
    this.con = mysql.createConnection({
      host: process.env.Host,
      user: process.env.User,
      password: process.env.Password
    });

    this.con.connect((err) => {
      if (err) throw err;
      console.log("Connected!");

      const createDbSQL = `CREATE DATABASE IF NOT EXISTS ${process.env.DataBase}`;
      this.con.query(createDbSQL, (err, result) => {
        if (err) throw err;
        console.log(`Connected to Database: '${process.env.DataBase}' `);
  
        this.reconnectToDatabase();
      });
    });
  }
   
  reconnectToDatabase() {
    this.con = mysql.createConnection({
      host: process.env.Host,
      user: process.env.User,
      password: process.env.Password,
      database: process.env.DataBase, 
    });
  
    this.con.connect((err) => {
    if (err) throw err;
    console.log(`Connected to database '${process.env.DataBase}' successfully.`);

    this.createTableInDb('RecipeRequests');
    });
  }

  createTableInDb(tableName) {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
      ID INT AUTO_INCREMENT PRIMARY KEY,
      Ingredient_List TEXT,
      Recipe TEXT,
      Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;


    this.con.query(createTableQuery, (err, result) => {
      if (err) throw err;
      console.log(`Table :'${tableName}' `);

    });
  }

  addRecipe(ingredientList, recipe) {
    const insertRecipeQuery = `INSERT INTO RecipeRequests (Ingredient_List, Recipe) VALUES (?, ?)`;

    this.con.query(insertRecipeQuery, [ingredientList, recipe], (err, result) => {
      if (err) throw err;
      console.log("Recipe added successfully!");
    });
  }

  deleteRecipe(recipeId) {
    const deleteRecipeQuery = `DELETE FROM RecipeRequests WHERE ID = ?`;

    this.con.query(deleteRecipeQuery, [recipeId], (err, result) => {
      if (err) throw err;
      console.log(`Recipe with ID ${recipeId} deleted successfully!`);
    });
  }



}

const smartRecipeDb = new SmartRecipeDB();
setTimeout(() => {
  smartRecipeDb.addRecipe('2 eggs, 1 cup flour, 1 cup milk', 'Mix ingredients and cook for 2 minutes.');
}, 2000);
// setTimeout(() => {
//   smartRecipeDb.deleteRecipe(1);
// },2000);