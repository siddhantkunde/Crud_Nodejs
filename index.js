const express = require ('express');
const res = require('express/lib/response');
const app = express();
const port = 4000;

//parse JSON using express
app.use (express.json());
app.use(express.urlencoded({extended:false}));

let movies =[
    {
        id:"1",
        title:"Spider-Man",
        director:"Jon",
        release_date:"2021-12-16",
    },
    {
        id:"2",
        title:"Pushpa",
        director:"Sukumar",
        release_date:"2021-01-22",
    },

];

//get movies list in the form json
app.get('/movie',(req,res) => {
    res.json(movies);
})

//add movie to list
app.post ('/movie', (req,res)=>{
    const movie= req.body;
    console.log(movie);
    movies.push(movie);
    res.send("movie is added!");
});

//Search for movie in the list
app.get('/movie/:id',(req,res) => {
    const id = req.params.id

    for (let movie of movies){
        if (movie.id === id){
            res.json(movie)
            return
        }
    }
    res.status(404).send('movie not found')
});

//remove movie from the list
app.delete("/movie/:id",(req,res)=>{
    const id = req.params.id;
    movies = movies.filter((movie)=>{
        if (movie.id !== id ){
            return true;

        }
        return false;
    });
    res.send("movie is deletd");
    
})

//set the server to listen to listen at port 
app.listen(port ,() =>console.log ('server listening at port ${port}'));
