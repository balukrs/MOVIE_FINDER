import{favStorage,starvalue,favcall} from './add.js';
var inputform=document.getElementById('inputContainer');
var inputtext=document.getElementById('inputsearch');
var serachcont=document.getElementById('searchItem');
var closesearch=document.getElementById('searchclose');
var s1=document.querySelector('.sec1');
var s2=document.querySelector('.sec2');
var s3=document.querySelector('.sec3');

var PopularSampleStorage1=['tt8503618','tt8946378','tt1545304','tt8367814','tt10003008','tt0903747'];
var PopularSampleStorage2=['tt7556122','tt6048922','tt9484998','tt9072352','tt3833480','tt7366338'];
var PopularSampleStorage3=['tt7286456','tt6751668','tt5753856','tt0944947','tt0068646','tt8613070'];



// Search Api
async function movieSearch(val){
val=val.split(' ').join('+');
let api=await fetch(`http://www.omdbapi.com/?t=${val}&apikey=c2f96585`);
let data=await api.json();
displaySearch(data);
}

// Display search item in dom
function displaySearch(val){
serachcont.innerHTML='';
document.getElementById("searchContainer").style.display = "block";
document.getElementById("searchContainer").style.animation = "search 1s linear forwards";
let newli=document.createElement('li');
newli.classList.add('searchlist');
newli.innerHTML=`
<div><img src="${val.Poster}" alt="poster"></img></div>

<div class="searchlistitems">
<h2>${val.Title}</h2>
<p>${val.Genre}</p>
<div class="innerid">${val.imdbID}</div>
<h5><span>Director:</span> ${val.Director}</h5>
<h5><span>Cast:<span> ${val.Actors}</h5>
<p>${val.Plot}</p>
<br>
<button class="addListbtn" id="addListbtn">Add to List</button>
</div>
`;
serachcont.appendChild(newli);
}

// Display Popular to DOM
async function popular1(val){
  let api=await fetch(`http://omdbapi.com/?i=${val}&apikey=c2f96585`)
  let data=await api.json();
  
  let newdiv=document.createElement('div');
  newdiv.classList.add('item');
  newdiv.innerHTML=`
  <p class="favid">${data.imdbID}</p>
  <img src="${data.Poster}" alt="poster"></img>
  <h3>${data.Title}</h3>
  `;
  s1.appendChild(newdiv);
}
async function popular2(val){
  let api=await fetch(`http://omdbapi.com/?i=${val}&apikey=c2f96585`)
  let data=await api.json();
  
  let newdiv=document.createElement('div');
  newdiv.classList.add('item');
  newdiv.innerHTML=`
  <p class="favid">${data.imdbID}</p>
  <img src="${data.Poster}" alt="poster"></img>
  <h3>${data.Title}</h3>
  `;
  s2.appendChild(newdiv);
}
async function popular3(val){
  let api=await fetch(`http://omdbapi.com/?i=${val}&apikey=c2f96585`)
  let data=await api.json();
  
  let newdiv=document.createElement('div');
  newdiv.classList.add('item');
  newdiv.innerHTML=`
  <p class="favid">${data.imdbID}</p>
  <img src="${data.Poster}" alt="poster"></img>
  <h3>${data.Title}</h3>
  `;
  s3.appendChild(newdiv);
}

function pop1(){
  PopularSampleStorage1.forEach(popular1);
}
function pop2(){
  PopularSampleStorage2.forEach(popular2);
}
function pop3(){
  PopularSampleStorage3.forEach(popular3);
}

pop1();
pop2();
pop3();




// Event Listners

// Search Event
inputform.addEventListener('submit',(e)=>{
e.preventDefault(e);
if(inputtext.value==''){
  alert('Please enter Movie Name');
}
else {movieSearch(inputtext.value);}
inputtext.value=='';
});

// Adding Search Item to List
serachcont.addEventListener('click',(e)=>{
  if(e.target.className=='addListbtn'){
    let imdbid=e.target.parentElement.childNodes[5].innerText;
    let filter=favStorage.filter(item=>{if(item.id==imdbid){return item;}});
    if(filter.length==0){
      favStorage.push({id:imdbid,percent:0});
      document.getElementById("searchContainer").style.display = "none";
      favcall();
    }
    else{alert('Already present in your List')}
  };
})
  

// Closing Search Container
closesearch.addEventListener('click',()=>{
  document.getElementById('searchContainer').style.display='none';
})

