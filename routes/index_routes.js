import schedules from "../waiterfactory.js";

const factory = schedules();

export default function routes(waiterData) {
  async function home(req, res) {
    let error = req.flash("error")[0];
    res.render("index", {
      error,
    });
  }
  async function enterUsername(req, res) {
    let username = req.body.username;
    const existingUser = await waiterData.insertUsername(username);

    if (existingUser === null) {
      req.flash("error", "User does not exists!");
      res.redirect("/");
    } else {
      res.redirect("/waiters/" + username);
    }
  }

  async function selectDays(req, res) {
    let errorMessage = req.flash("error")[0];
    let successMessage = req.flash("success")[0];

    const username = req.params.username;
    const selectedDays = await waiterData.getWaiterSelectedDays(username);
    res.render("waiter", {
      username,
      errorMessage,
      successMessage,
      selectedDays,
    });
  }

  async function getSelectedDays(req, res) {
    const selectedDays = req.body.weekday;
    const username = req.params.username;

    if (!selectedDays || selectedDays.length < 3 || selectedDays.length > 5) {
      req.flash("error", "Please select between 3 and 5 days.");

      return res.redirect(`/waiters/${username}`);
    }
    const userId = await waiterData.getUserId(username);
    if (userId) {
      await waiterData.bookShift({ id: userId }, selectedDays);

      req.flash("success", "You have successfully booked your days.");
    }
    return res.redirect(`/waiters/${username}`);
  }
  async function getNamesSelectedWeekday(req, res) {
    let result = await waiterData.joiningTables();
    const selectedWeekdays = {
      Monday: { waiters: [], colour: "" },
      Tuesday: { waiters: [], colour: "" },
      Wednesday: { waiters: [], colour: "" },
      Thursday: { waiters: [], colour: "" },
      Friday: { waiters: [], colour: "" },
      Saturday: { waiters: [], colour: "" },
      Sunday: { waiters: [], colour: "" },
    };

    result.forEach((dataInserted) => {
      const { username, weekday_name } = dataInserted;
      const day = weekday_name;
      //   charAt(0).toUpperCase() + weekday.slice(1).toLowerCase(); // Capitalize the first letter of the weekday
      if (selectedWeekdays[day]) {
        selectedWeekdays[day].waiters.push(username),
          (selectedWeekdays[day].colour = factory.addColor(
            selectedWeekdays[day].waiters.length
          ));
      }
    });
    let waiterNames = await getWaiterName();
    let reset = req.flash("reset")[0];
    res.render("admin", {
      selectedWeekdays,
      reset,
      waiterNames,
    });
    return selectedWeekdays;
  }

  async function getWaiterName() {
    let getNames = await waiterData.getNames();
    return getNames;
  }
  async function reset(req, res) {
    await waiterData.reset();
    req.flash("reset", "Successfully reset the Roster");
    res.redirect("/days");
  }
  async function register(req, res) {
    const { username } = req.body;
    let registerUser = await waiterData.registration(username);
    res.render("sign-up", {
      registerUser,
    });
    
  }
  return {
    home,
    enterUsername,
    selectDays,
    getSelectedDays,
    getNamesSelectedWeekday,
    reset,
    getWaiterName,
    register,
  };
}
