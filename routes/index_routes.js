

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
      let errorMessage = req.flash("error")[0];
      let successMessage = req.flash("success")[0];
  
      // Fetch the selected days for the user (replace 'username' with the actual username)
      const username = req.params.username;
      const selectedDays = await waiterData.getWaiterSelectedDays(username);
  console.log(selectedDays);
      res.render('waiter', {
          username,
          errorMessage,
          successMessage,
          selectedDays, // Pass the selected days to the template
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
         Monday: {waiters:[], colour:""},
         Tuesday:  {waiters:[], colour:""},
         Wednesday:  {waiters:[], colour:""},
         Thursday:  {waiters:[], colour:""},
         Friday:  {waiters:[], colour:""},
         Saturday:  {waiters:[], colour:""},
         Sunday:  {waiters:[], colour:""}
      };

      result.forEach((dataInserted) => {
         const { username, weekday_name } = dataInserted;
         const day = weekday_name
         //   charAt(0).toUpperCase() + weekday.slice(1).toLowerCase(); // Capitalize the first letter of the weekday
         if (selectedWeekdays[day]) {
            selectedWeekdays[day].waiters.push(username),
            selectedWeekdays[day].colour =  addColor(selectedWeekdays[day].waiters.length)
         }

      })
      let waiterNames = await getWaiterName()
      console.log(waiterNames);
      let reset = req.flash("reset")[0]
      res.render('admin', {
         selectedWeekdays,
         reset,
         waiterNames
      });
      console.log(selectedWeekdays["Monday"].waiters);

      return selectedWeekdays;

   }
    function addColor(daysBooked) {
      if (daysBooked == 3) {
         return "success"
      } else if (daysBooked < 3 && daysBooked > 0) {
         return "warning"
      } else if (daysBooked > 3) {
         return "danger"
      }
   }
   async function getWaiterName(){
      let getNames = await waiterData.getNames()
      return getNames
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
      reset,
      getWaiterName
   }
}