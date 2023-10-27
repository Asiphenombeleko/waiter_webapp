export default function waiterData(db) {
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/i;
  async function getNames() {
    let results = await db.any("SELECT DISTINCT username from user_data");
    return results;
  }
  async function insertUsername(username) {
    try {
      // Check if the username is empty or undefined
      if (!username || username.trim() === "") {
        throw new Error(
          "Username is empty or undefined. Please provide a valid username."
        );
      }
      // Check if the username matches the regex pattern
      if (!username.match(usernameRegex)) {
        throw new Error(
          "Invalid username format. Please use letters and numbers."
        );
      }
      // Check if the username already exists in the database
      const waiterExists = await db.oneOrNone(
        "SELECT username FROM user_data WHERE username = $1",
        [username]
      );
      if (!waiterExists) {
        await db.none("INSERT INTO user_data(username) VALUES ($1)", [
          username,
        ]);
      }
    } catch (error) {
      throw error;
    }
  }

  async function bookShift(username_id, weekday_ids) {
    try {
      await db.none(`DELETE FROM user_weekday WHERE username_id = $1`, [
        username_id.id,
      ]);

      // Loop through the weekday_ids and insert each one
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
      // Retrieve the user's ID from the user_data table
      const result = await db.one(
        "SELECT id FROM user_data WHERE username = $1",
        [username]
      );
      return result.id;
    } catch (error) {
      throw error;
    }
  }

  async function getWeekId(weekday) {
    try {
      // Retrieve the ID of a weekday from the weekdays table
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
      // const selectedDays = await db.any('SELECT weekday_id FROM user_weekday WHERE username_id = (SELECT id FROM user_data WHERE username = $1)', [username]);

      let x = await db.any(
        `select DISTINCT weekday_id from user_weekday
    join user_data on user_data.id = user_weekday.username_id
    join weekdays on weekdays.id = user_weekday.weekday_id
    where username = $1`,
        [username]
      );
      console.log(x);

      let week_days = await showDays();
      console.log(week_days);
      for (let i = 0; i < week_days.length; i++) {
        const weekday = week_days[i];
        console.log(weekday.id);
        for (let j = 0; j < x.length; j++) {
          const user_days = x[j];
          console.log("asi" + user_days.weekday_id);

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
      // Retrieve a list of weekday names from the weekdays table
      const result = await db.any("SELECT weekday_name,id FROM weekdays");
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function joiningTables() {
    try {
      // Retrieve a list of usernames along with the weekdays they are associated with
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
  };
}
