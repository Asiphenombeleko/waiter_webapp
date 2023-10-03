export default  function waiterData(db){

async function insertUsername(username){
let user_name = await waiterModule.getUsername(username)

await db.none('INSERT INTO user_data (username) VALUES ($1)', [user_name])
}
return {
    insertUsername

}
} 