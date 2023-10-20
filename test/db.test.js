import  assert from 'assert'
import pgPromise from 'pg-promise';
import databaseLogic from "../quiries/databaselogic.js"

const connectionString = process.env.DATABASE_URL 

const db = pgPromise()(connectionString);

let data =waiterData(db)

describe('waiterData Module', () => {
    beforeAll(async () => {
      // You may want to set up a clean test database or clear relevant tables before testing
      // Example: Create test database or truncate tables
    });
  
    afterAll(async () => {
      // You may want to clean up after testing, e.g., close database connections
      await data.end();
    });
  
    describe('insertUsername', () => {
      it('should insert a valid username into the database', async () => {
        const username = 'testuser';
        await data.insertUsername(username);
  
        // Write assertions to check if the user was successfully inserted
        // You can query the database to check if the user exists in the user_data table
      });
  
      it('should throw an error for an empty username', async () => {
        const emptyUsername = '';
        await expect(data.insertUsername(emptyUsername)).rejects.toThrow();
      });
  
      // Add more test cases as needed
    });
  
    describe('bookShift', () => {
      // Write test cases for the bookShift function
    });
  
    describe('getUserId', () => {
      // Write test cases for the getUserId function
    });
  
    describe('getWeekId', () => {
      // Write test cases for the getWeekId function
    });
  
    describe('showDays', () => {
      // Write test cases for the showDays function
    });
  
    describe('joiningTables', () => {
      // Write test cases for the joiningTables function
    });
  
    describe('reset', () => {
      // Write test cases for the reset function
    });
  })