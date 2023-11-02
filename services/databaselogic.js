export default function waiterData(db) {
  async function getNames() {
    let results = await db.any("SELECT DISTINCT username from user_data");
    return results;
  }
  async function insertUsername(username) {
    const waiterExists = await db.oneOrNone(
      "SELECT username FROM user_data WHERE username ilike $1",
      [username]
    );
    if (!waiterExists) {
       return null;
    }

    return waiterExists.username;
  }
  async function bookShift(username_id, weekday_ids) {
    try {
      await db.none(`DELETE FROM user_weekday WHERE username_id = $1`, [
        username_id.id,
      ]);

      for (const weekdayId of weekday_ids) {
        await db.none(
          "INSERT INTO user_weekday(username_id, weekday_id) VALUES ($1, $2)",
          [username_id.id, weekdayId]
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async function getUserId(username) {
    try {
      const result = await db.one(
        "SELECT id FROM user_data WHERE username ilike $1",
        [username]
      );
      return result.id;
    } catch (error) {
      throw error;
    }
  }

  async function getWeekId(weekday) {
    try {
      const result = await db.one(
        "SELECT id FROM weekdays WHERE weekday_name = $1",
        [weekday]
      );
      return result.id;
    } catch (error) {
      throw error;
    }
  }
  async function getWaiterSelectedDays(username) {
    try {
      let selectedDays = await db.any(
        `select DISTINCT weekday_id from user_weekday
    join user_data on user_data.id = user_weekday.username_id
    join weekdays on weekdays.id = user_weekday.weekday_id
    where username = $1`,
        [username]
      );

      let week_days = await showDays();
      for (let i = 0; i < week_days.length; i++) {
        const weekday = week_days[i];
        for (let j = 0; j < selectedDays.length; j++) {
          const user_days = selectedDays[j];

          if (weekday.id === user_days.weekday_id) {
            weekday.checked = "true";
          }
        }
      }
      return week_days;
    } catch (error) {
      throw error;
    }
  }

  async function showDays() {
    try {
      const result = await db.any("SELECT weekday_name,id FROM weekdays");
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function joiningTables() {
    try {
      const daysQuery = `
                SELECT u.username, w.weekday_name
                FROM user_data u
                JOIN user_weekday uw ON u.id = uw.username_id
                JOIN weekdays w ON uw.weekday_id = w.id
            `;
      const results = await db.any(daysQuery);
      return results;
    } catch (error) {
      throw error;
    }
  }
  async function reset() {
    await db.none("DELETE FROM user_weekday");
  }
  async function registration(username) {
    try {
      await db.none('INSERT INTO user_data (username) VALUES ($1)', [username]);
    } catch (error) {
      throw error;
    }
  }

  return {
    insertUsername,
    bookShift,
    getUserId,
    getWeekId,
    showDays,
    joiningTables,
    reset,
    getWaiterSelectedDays,
    getNames,
    registration
  };
}
