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
      // req.flash("success", "You have successfully booked your days")
      res.redirect("/waiters/" + username)

   }

   async function selectDays(req, res) {
      let errorMessage = req.flash("error")[0]
      let successMessage = req.flash("success")[0]
      let daysAndName = req.flash("days")
      res.render('waiter', {
         username: req.params.username,
         errorMessage,
         successMessage,
         daysAndName
      })

   }
   async function getSelectedDays(req, res) {
      const selectedDays = req.body.weekday;
      const username = req.params.username;

      if (!selectedDays || selectedDays.length < 3 || selectedDays.length > 5) {
         // Create an error message and flash it
         req.flash("error", "Please select between 3 and 5 days.");

         // Redirect back to the page where the days are selected
         return res.redirect(`/waiters/${username}`);
      }


      // Continue with the booking logic if the number of selected days is valid
      const userId = await waiterData.getUserId(username);
      if (userId) {
         await waiterData.bookShift({ id: userId }, selectedDays);
         // Flash a success message
         req.flash("success", "You have successfully booked your days.");

      }
      // Redirect to a success page or another relevant page
      return res.redirect(`/waiters/${username}`);

      // return res.redirect(`/waiters/${username}`);

   }
   // async function showNameAndDays(req, res) {
   //    let daysAndName = await waiterData.joiningTables()
   //    console.log(daysAndName);
   //    req.flash("daysAndName")
   //    res.redirect("/days")

   //  return daysAndName
   // }
   return {
      home,
      enterUsername,
      selectDays,
      getSelectedDays,
      // showNameAndDays
   }
}