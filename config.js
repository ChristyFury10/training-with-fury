const DATABASE_URL = process.env.DATABASE_URL;
// console.log(DATABASE_URL)
//`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qs3kxed.mongodb.net/exercisesDB?retryWrites=true&w=majority`

const PORT = process.env.PORT || 3000;

module.exports = {DATABASE_URL, PORT};