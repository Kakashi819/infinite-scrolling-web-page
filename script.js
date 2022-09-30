const imageContainer = document.getElementById("image-container");
const loader=document.getElementById('loader');

//unsplash API
const count = 30;
const apiKey = '-G7onH5G7LdXK7nq0Kw8fcXRwACjSDt8urDzisZhM8Y';
let photoArray = [];
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttribute(element,attribute){
  for(const key in attribute){
    element.setAttribute(key,attribute[key]);
  }
}

let imagesLoaded=0;
let totalImages=0;
let ready=false;

function imageloader(){
  imagesLoaded++;
  console.log(imagesLoaded);
  if(imagesLoaded===totalImages){
    ready=true;
    loader.hidden=true;
  }
}
function displayPhotos() {
  imagesLoaded=0;
  totalImages=photoArray.length;
  //run this loop for each function in this photo array
  photoArray.forEach((photo) => {
    //since when we click on the photo it goes to unsplash api so create an anchor tag with some id
    const item = document.createElement('a');
    setAttribute(item,{
      href:photo.links.html,
      target:'_blank',
    });
    //above we created an anchor tag now create an image tag them later append this image tag to this anchor tag
    // and append that anchor tag to our image container div
    const img = document.createElement('img');
    setAttribute(img,{
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener('load',imageloader);
    //push img in item container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
// simple api calling storing that data get calling display photos function to display function
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    console.log(response);
    photoArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('scroll',()=>{
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight- 1000 && ready){
    ready=false;
    getPhotos();
  }
});
//on load
getPhotos();


//how will u implement infinite scroll functionality
// set a definite height that we that height is achieved and all photos are loaded the 
// u can call next api call

