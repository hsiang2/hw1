const searchBtn = document.querySelector('#search')
const input = document.querySelector('input')
const artistResult = document.querySelector('#artist')
const eventsResult = document.querySelector('#events')
// var isLike = false
// var eventCollection = []

// const listResult = document.querySelector('#list')
// const listBtn = document.querySelector('#open-list')

var list = localStorage.getItem("eventCollection") ? JSON.parse(localStorage.getItem("eventCollection")) : []


// function renderList() {
//     listResult.innerHTML = `<div class="event">
//         <h1 class="title">Events</h1>
//         ${list.map(event => { 
//             return `<div class="event-item">
//             <div class="event-date-box">
//                 <h2 class="event-date">${event.datetime.slice(5, 10).replace("-", " / ")}</h2>
//                 <h4 class="event-date-year">${event.datetime.slice(0, 4)}</h4>
//             </div>      
//             <div class="event-location-box">
//                 <h2 class="event-location">${event.venue.name}</h2>
//                 <h4 class="event-location-detail">${event.venue.city}, ${event.venue.country}</h4>
//             </div>
//             <button data-event='${JSON.stringify(event)}' onclick="pressLike(this)">
//                 <i class="${list.some((e) => e.id == event.id) ? "fa-solid" : "fa-regular"} fa-heart" id="icon"></i>
//             </button>
//         </div>`}).join('')}
//     </div>`
// }

function renderArtist(json) {
    const artist = json;
    return `
        <img class="img" src=${artist.thumb_url} alt="">
        <h1 class="name">${artist.name}</h1>
    `
}

function renderEvents(json) {
    const events = json

    // const list = localStorage.getItem("eventCollection");
    // list = localStorage.getItem("eventCollection");
    // var class = 
    // list = JSON.parse(localStorage.getItem("eventCollection"))

    return `<div class="event">
        <h1 class="title">Events</h1>
         ${events.map(event => { 
        //     console.log(list?.includes(JSON.stringify(event)))
            // console.log("befor click:" + isLike)
            // isLike = list?.includes(JSON.stringify(event))===true && list?.includes(JSON.stringify(event))!==undefined ? true : false;
            // showLike(this, JSON.stringify(event))
        
            return `<div class="event-item">
            <div class="event-date-box">
                <h2 class="event-date">${event.datetime.slice(5, 10).replace("-", " / ")}</h2>
                <h4 class="event-date-year">${event.datetime.slice(0, 4)}</h4>
            </div>      
            <div class="event-location-box">
                <h2 class="event-location">${event.venue.name}</h2>
                <h4 class="event-location-detail">${event.venue.city}, ${event.venue.country}</h4>
            </div>
            <button data-event='${JSON.stringify(event)}' onclick="pressLike(this)">
                <i class="${list.some((e) => e.id == event.id) ? "fa-solid" : "fa-regular"} fa-heart" id="icon"></i>
            </button>
            
        </div>`}).join('')}
    </div>`
   
}


function pressLike(button) {
    
    const icon = button.querySelector('i');
    const eventData = JSON.parse(button.dataset.event)
    
    if (list.some((e) => e.id == eventData.id)) {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        let index = list?.findIndex(event => event.id === eventData.id);
        if (index !== -1) {
            list?.splice(index, 1)
        }
        // isLike = false
    } else {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        list?.push(eventData);
        // console.log("list: ", list)
        // let index = eventCollection.indexOf(item);
        // eventCollection.splice(index, 1)
        // isLike = true
    }
    localStorage.setItem("eventCollection", JSON.stringify(list));
    // isLike = !isLike
    
}


async function fetchArtist(artistName) {
    fetch(`https://rest.bandsintown.com/artists/${artistName}/?app_id=YOUR_APP_ID`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('error')
            }
            return  response.json()
        })
        .then((json) => {
            artistResult.innerHTML = renderArtist(json);
            // if (Object.keys(json).length === 0 || !json.name) {
            //     artistResult.innerHTML = `<div>Artist Not Found</div>`;
            // } else {
            //     artistResult.innerHTML = renderArtist(json);
            // }
            // console.log(json);
        })
        .catch(err => {
            artistResult.innerHTML = `<div>Request Failed</div>`;
            console.log('Request Failed', err);
        });
}

async function fetchEvents(artistName) {

    fetch(`https://rest.bandsintown.com/artists/${artistName}/events?app_id=YOUR_APP_ID`)
        .then((response) => response.json())
        .then((json) => {
            eventsResult.innerHTML = renderEvents(json);
            
        })
        .catch(err => {
            console.log('Request Failed', err);
        });
}

searchBtn.addEventListener('click', () => {
    fetchArtist(input.value);
    fetchEvents(input.value);
});

// listBtn.addEventListener('click', () => {
//     renderList()
// })



