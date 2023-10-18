

export default function routes(waiterModule, waiterData) {

   async function home(req, res) {

      res.render('index', {

      })
   }
   async function enterUsername(req, res) {

      const username = req.body.username;
      console.log(username);
      if (username) {
         await waiterData.insertUsername(username)
      }
      res.redirect("/waiters/" + username)

   }

   async function selectDays(req, res) {
      let errorMessage = req.flash("error")[0]
      let successMessage = req.flash("success")[0]

      res.render('waiter', {
         username: req.params.username,
         errorMessage,
         successMessage,

      })
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
         Monday: [],
         Tuesday: [],
         Wednesday: [],
         Thursday: [],
         Friday: [],
         Saturday: [],
         Sunday: []
      };

      result.forEach((dataInserted) => {
         const { username, weekday_name } = dataInserted;
         const day = weekday_name
         //   charAt(0).toUpperCase() + weekday.slice(1).toLowerCase(); // Capitalize the first letter of the weekday
         if (selectedWeekdays[day]) {
            selectedWeekdays[day].push(username);
         }

      })
      let reset = req.flash("reset")[0]
      res.render('admin', {
         selectedWeekdays,
         reset
      });
      console.log(selectedWeekdays);

      return selectedWeekdays;

   }
   async function addColor(daysBooked) {
      if (daysBooked.length == 3) {
         return "Success"
      } else if (daysBooked.length < 3 && daysBooked.length > 0) {
         return "warning"
      } else if (daysBooked.length > 3) {
         return "danger"
      }
   }
   async function reset(req, res){
      await waiterData.reset()
      req.flash("reset", "Successfully reset the Roster")
       res.redirect("/days")
   }

   return {
      home,
      enterUsername,
      selectDays,
      getSelectedDays,
      getNamesSelectedWeekday,
      addColor,
      reset
   }
}