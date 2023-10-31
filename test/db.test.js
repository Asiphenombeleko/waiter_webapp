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
    try {
      const usernames = await data.getNames();
  
      assert.notStrictEqual(usernames.length, 0);
  
      usernames.forEach(username => {
        assert.strictEqual(typeof username.username, 'string');
        assert.notStrictEqual(username.username, '');
      });
    } catch (error) {
      throw error;
    }
  });

  it('should associate waiters with weekdays', async function () {
    this.timeout(5000); 
 
    const username = 'Nicholas';
    const weekdayIds = [1, 2, 3, 4, 5, 6, 7];
  
    try {
      await data.insertUsername(username);
  
      const userId = await data.getUserId(username);
  
      await data.bookShift(userId, weekdayIds);
  
      const selectedDays = await data.getWaiterSelectedDays(username);
  
      const selectedDayIds = selectedDays.map((day) => day.id);
  
      assert.deepStrictEqual(selectedDayIds, weekdayIds);
    } catch (error) {
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
describe('bookShift',async () => {
 
  before(async () => {
    await data.reset();
  });

  let testUsername = 'Nicholas';

  it('should book shifts for a user', async () => {
  
    const userId = await data.getUserId(testUsername);

    const weekdays = await data.showDays();

    const selectedWeekdays = [weekdays[0].id, weekdays[1].id];

    await data.bookShift({ id: userId }, selectedWeekdays);

    const bookedWeekdays = await db.any(
      'SELECT weekday_id FROM user_weekday WHERE username_id = $1',
      [userId]
    );

    assert.deepStrictEqual(
      bookedWeekdays.map(entry => entry.weekday_id),
      selectedWeekdays
    );
  });
});
