
var wrap=document.querySelector('.wrapper');
var favcont=document.getElementById('favitems');
var detcont=document.getElementById('details');
var displaydetailcont=document.getElementById('detailContainer');
var progressbar=document.getElementById('myRange');
export var starvalue=document.querySelector('.star-ratings-css-top');
var ratesubmitbtn=document.getElementById('ratesubmit');


export  var favStorage=JSON.parse(localStorage.getItem('Movies'))!==null?JSON.parse(localStorage.getItem('Movies')):[];
// Displaying favourite showcase
async function showfav(val){
  let api=await fetch(`http://omdbapi.com/?i=${val.id}&apikey=c2f96585`);
  let data=await api.json();
  
  let newdiv=document.createElement('div');
  newdiv.classList.add('favourites');
  newdiv.classList.add('hvr-float-shadow');
  newdiv.innerHTML=`
  <p class="favid">${data.imdbID}</p>
  <img src="${data.Poster}" alt="poster"></img>
  <p>${data.Title}</p>
  `;
  favcont.appendChild(newdiv);

}
export function favcall(){
  favcont.innerHTML='';
  if(favStorage.length!==0){
   favStorage.forEach(showfav);
  }
  else{favcont.innerHTML='<h3>No Movies/TV Shows Available</h3>';}
  updateLocalremStorage();
}

favcall();

// Displaying details
async function displayfavdetail(val) {
  detcont.innerHTML='';
  let api=await fetch(`http://omdbapi.com/?i=${val}&apikey=c2f96585`);
  let data=await api.json();
  let newdiv=document.createElement('div');
  newdiv.classList.add('detail_items');
  
  var rating1,rating2,rating3
  switch(data.Ratings.length){
 
      case 1:
      rating1=data.Ratings[0].Value;
      rating2='N/A';
      rating3='N/A';
      break;
      case 2:
      rating1=data.Ratings[0].Value;
      rating2=data.Ratings[1].Value
      rating3='N/A';
      break;
      case 3:
      rating1=data.Ratings[0].Value;
      rating2=data.Ratings[1].Value;
      rating3=data.Ratings[2].Value;
      break;
  }  
  let filter=favStorage.filter(item=>{if(item.id==data.imdbID){return item;}});
  newdiv.innerHTML=`
  <div><img src="${data.Poster}" alt="poster"></img></div>
  <p class="transferid">${data.imdbID}</p>
  <button class="removelist" id="removelist">Remove from List</button>
  <div class="detaillistitems">
   <h2>${data.Title}</h2>
   <p>${data.Genre}</p>
   <div class="extras"><span>${data.Rated}</span><span>${data.Runtime}</span><span>${data.Year}</span></div>
   <h5><span>Director:</span> ${data.Director}</h5>
   <h5><span>Cast:<span> ${data.Actors}</h5>
   <p class="plot">${data.Plot}</p>
   <p>Awards: ${data.Awards}</p>
    <div class="socialratings">
     <span class="social"><span>ImdB</span><span>${rating1}</span></span>
     <span class="social"><span>Rotten Tomatoes</span><span>${rating2}</span></span>
     <span class="social"><span>Metacritic</span><span>${rating3}</span></span>
    </div>
  </div>
  `;
  detcont.appendChild(newdiv);
  let elem=document.getElementById('removelist');
  if(filter.length!==0){
   elem.style.display='inline-block';
  }
  else {elem.style.display='none';}
  
}







// Event Listners

// Popular titles Click event

wrap.addEventListener('click',(e)=>{
  if(e.target.parentElement.className=='item'){
    let imdbid=e.target.parentElement.childNodes[1].innerText; 
    let filter=favStorage.filter(item=>{return item.id==imdbid});
    if(filter.length!==0){
      starvalue.style.width=`${filter[0].percent}%`;
    }
    else{starvalue.style.width='0%'}
    displaydetailcont.style.display='flex';
    displayfavdetail(imdbid);
  };

});
// Local Storage
function updateLocalremStorage(){
  localStorage.setItem('Movies',JSON.stringify(favStorage));
}

// Favourite Movies Click Event

favcont.addEventListener('click',(e)=>{
  if(e.target.parentElement.className=='favourites hvr-float-shadow'){
    let imdbid=e.target.parentElement.childNodes[1].innerText;
    let filter=favStorage.filter(item=>{return item.id==imdbid});
    displaydetailcont.style.display='flex';
    starvalue.style.width=`${filter[0].percent}%`;
    displayfavdetail(imdbid);
  }
  
});

// Detail Container Close Event
document.getElementById('closedetail').addEventListener('click',(e)=>{
  displaydetailcont.style.display='none';
});

// Progress bar Change event.
progressbar.addEventListener('input',()=>{
  let perchange=+progressbar.value;
  starvalue.style.width=`${perchange}%`;
 
});

// Rating Submit Event
ratesubmitbtn.addEventListener('click',()=>{
   let elem=document.getElementById('removelist');
   elem.style.display='inline-block';
   let perchange=+progressbar.value;
   let imdbid=detcont.childNodes[0].childNodes[3].innerText;
  
   let filterval=favStorage.filter(item=>{
     if(item.id==imdbid){
       return item;
     }
   });

   if(filterval.length!==0){
    favStorage.forEach(item=>{
      if(item.id==imdbid){
        item.percent=perchange;
      }
    });
   }
   else {
    favStorage.push({id:imdbid,percent:perchange});
    
   }
   favcall(); 
});

// Remove User List {Remove from list not working properly on deletion need to be checked}
detcont.addEventListener('click',(e)=>{
  if(e.target.className=='removelist'){
    let imdbid=e.target.parentElement.childNodes[3].innerText;
    favStorage=favStorage.filter(item=>{if(item.id!==imdbid){return item;}});
    favcall();
    let elem=document.getElementById('removelist');
    elem.style.display='none';
  }
  
});