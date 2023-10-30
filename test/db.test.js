import assert from "assert";
import pgPromise from "pg-promise";
import waiterData from "../quiries/databaselogic.js";
import "dotenv/config";
import schedules from "../waiterfactory.js";

const connectionString = process.env.DATABASE_URL;
const db = pgPromise()(connectionString);

let data = waiterData(db);
let factory = schedules();

describe("Waiter Data Functions", () => {
  before(async function () {
    this.timeout(5000); 
    await data.reset();
   
  });

  it('should insert and retrieve usernames', async () => {
    const usernames = [
      'Nicholas',
      'Katleho',
      'Yamisa',
      'Asisipho',
      'Saffah',
    ];
  
    try {
      // Insert the usernames into the database
      for (const username of usernames) {
        await data.insertUsername(username);
      }
  
      // Retrieve the list of usernames
      const retrievedUsernames = await data.getNames();
  
      // Check if the retrieved usernames include the test usernames
      assert.deepStrictEqual(retrievedUsernames, usernames.map((username) => ({ username })));
    } catch (error) {
      // Handle any errors
      throw error;
    }
  });

  it('should associate waiters with weekdays', async function () {
    this.timeout(5000); // Set a timeout for this test
  
    // Define a test username and weekdayIds
    const username = 'Nicholas';
    const weekdayIds = [1, 2, 3, 4, 5, 6, 7];
  
    try {
      // Insert the username into the database
      await data.insertUsername(username);
  
      // Retrieve the user's ID
      const userId = await data.getUserId(username);
  
      // Associate the user with weekdays
      await data.bookShift(userId, weekdayIds);
  
      // Retrieve the selected weekdays for the user
      const selectedDays = await data.getWaiterSelectedDays(username);
  
      // Verify that the selectedDays match the provided weekdayIds
      const selectedDayIds = selectedDays.map((day) => day.id);
  
      assert.deepStrictEqual(selectedDayIds, weekdayIds);
    } catch (error) {
      // Handle any errors
      throw error;
    }
  });
  
  
  it('should return "success" for 3 waiters booked for the day', function () {
    const color = factory.addColor(3);
    console.log(color);
    assert.equal(color, "success");
  });

  it('should return "warning" for less than 3 waiters booked for the day', function () {
    const color = factory.addColor(2);

    assert.equal(color, "warning");
  });

  it('should return "danger" for more than 3 waiters booked for the day', function () {
    const color = factory.addColor(4);
    assert.equal(color, "danger");
  });
});
