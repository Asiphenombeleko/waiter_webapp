import  assert from 'assert'
import pgPromise from 'pg-promise';
import databaseLogic from "../quiries/databaselogic.js"

const connectionString = process.env.DATABASE_URL 

const db = pgPromise()(connectionString);

let data =waiterData(db)

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
  
    
  });