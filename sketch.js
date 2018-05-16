/*
 *
 * Cinema Expandido WEB
 * Data Vis (24 de abril 2018)
 * Viviana Ramos
 * 
 *;
 
 * URL: https://vixra.github.io/MOVIESEARCH/
 */

/*
VARIABLES
*/

var dataMDB;
var dataMDBM;
var dataMDBG;
var dataMDBP;
var apiKey = "api_key=21227f6ea743c8cd0f26674247a1b443";
var api = "http://api.themoviedb.org/3/search/person?";
var apiMovie = "http://api.themoviedb.org/3/search/movie?";
var apiGenre = "http://api.themoviedb.org/3/discover/movie?";
var apiPop = "https://api.themoviedb.org/3/movie/popular?";
var actorValue = "Johnny Depp";
var movValue = "Zathura";
var genValue = "Thriller";
var popValue;
var urlProfilePic;
var movieNow;
var actorPic;
var knownFor;
var acName;
var desc;
var input;
var input2;
var input3;
var url1;
var JSONgen;
/*
LIFE CYCLE METHODS
*/


function setup() {
  createCanvas(1920, 600);

  input = select("#actor");
  input2 = select("#movie");
  input3 = select("#genre");
  var button = select("#searchActor");
  var button2 = select("#searchMovie");
  var button3 = select("#searchGenre");
  var button4 = select("#searchPopular");
  button.mousePressed(actorInfo);
  button2.mousePressed(movieInfo);
  button3.mousePressed(genreInfo);
  button4.mousePressed(popInfo);
}

function draw() {
  background(0);
  //print(url);
  if (actorPic) {
    imageMode(CENTER);
    image(actorPic, width / 2, 200);
    textSize(30);
    fill(255);
    textAlign(CENTER);
    text(acName, width / 2, 500);
  }
}

/*
API
*/


function actorInfo() {
  actorValue = input.value();
  print(actorValue);
  var url = api + apiKey + "&query=" + actorValue;
  loadJSON(url, gotData);
}

function movieInfo() {
  movValue = input2.value();
  print(movValue);
  var url = apiMovie + apiKey + "&query=" + movValue;
  loadJSON(url, gotMovie);
}

function popInfo(){
  popValue = floor(random(0,19));
  var urlPop = apiPop + apiKey;
  loadJSON(urlPop, gotPop);
}

function genreInfo() {
  genValue = input3.value();
  var urlRef = "movieGenre.json";
  loadJSON(urlRef, gotRef);
}

function gotRef(dataGen) {
  dataMDBG = dataGen;

  if (dataMDBG) {
    var url = dataMDBG.results[0].Thriller;
    url1 = dataMDBG.results[0][genValue];
    print(url1);
  }
  
  var urlGen = apiGenre + apiKey + "&with_genres=" + url1;
  loadJSON(urlGen, finallyGen);
}

function finallyGen(genJSON){
  JSONgen=genJSON;
  //print(JSONgen);
  if (JSONgen){
    var randomResults = floor(random(0,19));
    var urlFinallyGen = JSONgen.results[randomResults].poster_path;
    urlProfilePic = "https://image.tmdb.org/t/p/w300" + urlFinallyGen;
    loadImage(urlProfilePic, gotPic);
    desc = JSONgen.results[randomResults].release_date;
    acName =JSONgen.results[randomResults].title + " Released: " + desc;
  }
}



function gotPop(dataPop){
  dataMDBP = dataPop;
  if (dataMDBP){
    urlProfilePic = "https://image.tmdb.org/t/p/w300" + dataMDBP.results[popValue].poster_path;
    loadImage(urlProfilePic, gotPic);
    acName = dataMDBP.results[popValue].title + " Released: "+ dataMDBP.results[popValue].release_date;
  }
}

function gotMovie(dataMovie) {
  dataMDBM = dataMovie;
  if (dataMDBM) {
    print(dataMDBM.results[0].overview);
    urlProfilePic = "https://image.tmdb.org/t/p/w300" + dataMDBM.results[0].poster_path;
    loadImage(urlProfilePic, gotPic);
    desc = dataMDBM.results[0].release_date;
    acName = "Released: " + desc;
  }
}

function gotData(data) {
  dataMDB = data;
  if (dataMDB) {
    print(dataMDB.results[0].known_for[0].title);
    urlProfilePic = "https://image.tmdb.org/t/p/w300" + dataMDB.results[0].profile_path;
    loadImage(urlProfilePic, gotPic);
    knownFor = dataMDB.results[0].known_for[0].title;
    acName = "Known for: " + knownFor;
  }
}






function gotPic(data) {
  actorPic = data;
  // moviePic = data;
}