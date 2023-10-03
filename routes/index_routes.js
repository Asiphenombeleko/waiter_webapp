export default function routes(waiterModule, waiterData){
 async function home(req, res){
    res.render('index')
 }

 async function enterUsername(req,res){
    const username = req.body.username;
    if(username){
        await waiterData.insertUsername(username)
    }
 }
 return{
    home,
    enterUsername
 }
}