import assert from 'assert'
import pgPromise from 'pg-promise';
import waiterData from "../quiries/databaselogic.js"
import Mocha from 'mocha';
import 'dotenv/config'


const connectionString = process.env.DATABASE_URL 

const db = pgPromise()(connectionString);

// const waiterData = waiterData(db);

  describe('Waiter Data Functions', () => {
    
    before(async () => {
    
    });
  
    after(async () => {
      
      await db.end();
    });
  
    it('should insert and retrieve usernames', async () => {
      
      await waiterData.reset();
  
      const username = 'testuser';
  
      await waiterData.insertUsername(username);
      const usernames = await waiterData.getNames();
  
      assert.deepStrictEqual(usernames, [{ username }]);
    });
  
    it('should associate waiters with weekdays', async () => {
      await waiterData.reset();
  
      const username = 'testuser';
      const weekdayIds = [1, 2, 3]; // Replace with valid weekday IDs
  
      const userId = await waiterData.getUserId(username);
      await waiterData.bookShift({ id: userId }, weekdayIds);
  
      const selectedDays = await waiterData.getWaiterSelectedDays({ id: userId });
  
      assert.deepStrictEqual(selectedDays, weekdayIds);
    });
  
   
  }); describe('addColor', function () {
    it('should return "success" for 3 days booked', function () {
      const color = database.addColor(3);
      assert.equal(color, 'success');
    });

    it('should return "warning" for less than 3 days booked', function () {
      const color = database.addColor(2);
      assert.equal(color, 'warning');
    });

    it('should return "danger" for more than 3 days booked', function () {
      const color = database.addColor(4);
      assert.equal(color, 'danger');
    });
  });