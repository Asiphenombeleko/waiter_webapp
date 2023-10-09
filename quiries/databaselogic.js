export default function waiterData(db) {
    async function insertUsername(username) {
        try {
            // Check if the username is empty or undefined
            if (!username || username.trim() === "") {
                throw new Error("Username is empty or undefined. Please provide a valid username.");
            }

            // Check if the username already exists in the database
            const waiterExists = await db.oneOrNone('SELECT username FROM user_data WHERE username = $1', [username]);
            if (!waiterExists) {
                await db.none('INSERT INTO user_data(username) VALUES ($1)', [username]);
            }
        } catch (error) {
            throw error;
        }
    }

    async function bookShift(username_id, weekday_id) {
        try {
            // Insert the shift information into the user_weekday table
            await db.none('INSERT INTO user_weekday(username_id, weekday_id) VALUES ($1, $2)', [username_id, weekday_id]);
        } catch (error) {
            throw error;
        }
    }

    async function getUserId(username) {
        try {
            // Retrieve the user's ID from the user_data table
            const result = await db.one('SELECT id FROM user_data WHERE username = $1', [username]);
            return result.id;
        } catch (error) {
            throw error;
        }
    }

    async function getWeekId(weekday) {
        try {
            // Retrieve the ID of a weekday from the weekdays table
            const result = await db.one('SELECT id FROM weekdays WHERE weekday_name = $1', [weekday]);
            return result.id;
        } catch (error) {
            throw error;
        }
    }

    async function showDays() {
        try {
            // Retrieve a list of weekday names from the weekdays table
            const result = await db.any('SELECT weekday_name FROM weekdays');
            return result;
        } catch (error) {
            throw error;
        }
    }

    async function JoiningTables() {
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

    return {
        insertUsername,
        bookShift,
        getUserId,
        getWeekId,
        showDays,
        JoiningTables,
    };
}
