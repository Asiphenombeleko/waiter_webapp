import assert from 'assert';
import pgPromise from 'pg-promise';
import waiterData from '../quiries/databaselogic.js';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const db = pgPromise()(connectionString);

let data = waiterData(db)
describe('Waiter Data Functions', () => {
  before(async () => {
    await data.reset();
    // Add any setup code here
  });

  after(async () => {
    await db.end();
  });

  it('should insert and retrieve usernames', async () => {
    

    const username = 'Yamisa';

    await data.insertUsername(username);
    const usernames = await data.getNames();

    assert.deepStrictEqual(usernames, [{ username }]);
  });

  it('should associate waiters with weekdays', async () => {
    await data.reset();

    const username = 'Yamisa';
    const weekdayIds = [5, 6, 7]; // Replace with valid weekday IDs

    const userId = await data.getUserId(username);
    await data.bookShift(userId, weekdayIds);

    const selectedDays = await data.getWaiterSelectedDays(userId);

    assert.deepStrictEqual(selectedDays, weekdayIds);
  });
});

describe('addColor', function () {
  it('should return "success" for 3 days booked', function () {
    const color = data.addColor(3);
    assert.equal(color, 'success');
  });

  it('should return "warning" for less than 3 days booked', function () {
    const color = data.addColor(2);
    assert.equal(color, 'warning');
  });

  it('should return "danger" for more than 3 days booked', function () {
    const color = data.addColor(4);
    assert.equal(color, 'danger');
  });
});
