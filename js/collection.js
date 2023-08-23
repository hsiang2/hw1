const listResult = document.querySelector('#list')
const listBtn = document.querySelector('#open-list')

var list = localStorage.getItem("eventCollection") ? JSON.parse(localStorage.getItem("eventCollection")) : []

function renderList() {
    listResult.innerHTML = `<div class="event">
        <h1 class="title list">Events List</h1>
        ${list.map(event => { 
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
                <h1 id="icon">X</h1>
            </button>
        </div>`}).join('')}
    </div>`
}

renderList()

function pressLike(button) {
    const eventData = JSON.parse(button.dataset.event)
    let index = list?.findIndex(event => event.id === eventData.id);
    if (index !== -1) {
        list?.splice(index, 1)
    }
    localStorage.setItem("eventCollection", JSON.stringify(list));
    renderList()
    
}




