const loadData = async (searchValue = 'comedy') => { //all card data show
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchValue}`)
  const resJson = await res.json()
  const data = resJson.posts
  showCardData(data)
}
const showCardData = (data) => { //html card data show
  const cardContainer = document.getElementById('card-container')
  cardContainer.textContent = ''
  data.forEach(cardData => {
    // console.log(cardData);
    const card = document.createElement('div')
    card.innerHTML = `
        <div class="card w-full lg:w-3/4 bg-base-100 shadow-xl my-10">
        <div class="card-body bg-[#F3F3F5] rounded-3xl">
        <div class="text-[#12132DCC] w-full">
          <p class="inline mr-2"><span># </span> ${cardData.category}</p>
          <p class="inline-block ml-0 lg:ml-8"><span>Author : </span>${!!cardData.author.name ? cardData.author.name : "Unknown"}</p>
        </div>
          <a href="#"
            class="flex flex-col items-center  border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 my-4">
            <div class="relative">
                <img id="card-img" class="w-20 h-20 rounded-full ring ring-offset-green-100 ring-offset-2 hover:ring-0" src="${cardData.image}" alt="">
                <span id="profile-dote" class="top-0 left-14 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
            </div>
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#12132D]">${cardData.title}</h5>
              <p class="mb-3 font-normal text-[#12132D99]">${cardData.description}</p>
            </div>
          </a>
          <hr>
          <div class="flex justify-between items-center">
            <div class="flex gap-0 lg:gap-2">
              <img src="icon/tabler-icon-message-2.png" alt=""><span id="">${cardData.comment_count}</span>
              <img class="ml-2 lg:ml-10" src="icon/tabler-icon-eye.png" alt=""><span id="">${cardData.view_count}</span>
              <img class="ml-2 lg:ml-10" src="icon/tabler-icon-clock-hour-9.png" alt=""><span id="">${cardData.posted_time}</span>
            </div>
            <div class=""><button class="clickButton" onclick="mainButton('${cardData.title}','${cardData.view_count}')"><img src="icon/email 1.png" alt=""></button></div>
          </div>
        </div>
      
        `
    cardContainer.appendChild(card);
    toggleClass(cardData.isActive)
  });
  loadingSpanerHide('loading-container')
}
function incrementCounter() { // increment click count for a specific card
  const clickCountSpan = document.getElementById(`mark-as-read`);
  let clickCount = parseInt(clickCountSpan.textContent) || 0;
  clickCount++;
  clickCountSpan.textContent = clickCount;
}


const search = () => {//search function 
  const searchInput = document.getElementById('default-search')
  const searchValue = searchInput.value
  loadData(searchValue)
  loadingSpanerShow('loading-container')
  // console.log(searchValue);
}
const loadingSpanerShow=(getElementById)=>{ //loading spaner show
  const loading = document.getElementById(getElementById)
  loading.classList.remove('hidden')
}
const loadingSpanerHide=(getElementById)=>{ //loading spaner hide
  const loading = document.getElementById(getElementById)
  loading.classList.add('hidden')
}

const mainButton = (titel, viewCount) => { //card button click
  // console.log(titel,viewCount);
  const emailCard = document.getElementById('email-card-container');
  const div = document.createElement('div')
  div.innerHTML = `
    <div class="flex justify-between my-8">
        <h4 class="text-[#12132D]">${titel}</h4>
        <div class="flex gap-2 items-center ml-24 text-[#12132D99]">
        <img src="icon/tabler-icon-eye.png" alt=""><span>${viewCount}</span>
        </div>
    </div>
    `
  emailCard.appendChild(div)
  incrementCounter()
}
const toggleClass = (stets) => { //profile status background add or remove
  if (stets === false) {
    const profile = document.getElementById('profile-dote')
    profile.classList.remove('bg-green-400')
    profile.classList.add('bg-red-400')

    const cardImage = document.getElementById('card-img')
    cardImage.classList.remove('ring-green-400')
    cardImage.classList.add('ring-red-400')
  }
}
loadData()
// latast post show
const lastPost = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`)
  const resJson = await res.json()
  // console.log(resJson);
  loadingSpanerShow('loading-container2')
  latastCardShow(resJson)
}
//show latast card 
const latastCardShow = (data) => {
  const cardContainer2 = document.getElementById('Latest-card')
  cardContainer2.textContent = ''
  data.forEach(latastCardData => {
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="card w-full bg-base-100 shadow-xl">
    <figure><img class="rounded-2xl" src="${latastCardData.cover_image}" alt="Album"/></figure>
    <div class="card-body">
      <div class="flex text-[#12132D99]">
        <img class="mr-3" src="icon/FrameDate.svg" alt="">
        <p id="">${!!latastCardData.author.posted_date ? latastCardData.author.posted_date : "No publish date"}</p>
      </div>
      <h2 class="card-title">${latastCardData.title}</h2>
      <p class="my-4">${latastCardData.description}</p>

      <div class="card-actions flex">
        <div class="avatar">
          <div class="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 hover:ring-0">
            <img src="${latastCardData.
        profile_image}" alt="">
              <div class="">" />
          </div>
        </div>
    
        <div class=" ml-4">
          <h3 class="font-bold text-[#12132D] text-xl">${latastCardData.author.name}</h3><p class="text-[#12132D99]">${!!latastCardData.author.designation ? latastCardData.author.designation : "Unknown"}</p>
        </div>
      </div>
    </div>
  </div>
    `
    cardContainer2.appendChild(div)
  })
  loadingSpanerHide('loading-container2')
}
lastPost()