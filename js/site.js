var events = [{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2017",
},
{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "06/01/2018",
},
{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "06/01/2019",
},
{
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "06/01/2017",
},
{
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "06/01/2018",
},
{
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "06/01/2019",
},
{
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "06/01/2017",
},
{
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "06/01/2018",
},
{
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "06/01/2019",
},
];

//build dropdown for specific city
function buildDropDown() {
    let dropdownMenu = document.getElementById('eventDropDown');
    dropdownMenu.innerHTML = ''; //clears out the current city values above

    let currentEvents = events; //TODO: get these from storage

    let cityNames = currentEvents.map(
        function(event) {
            return event.city;
        }
    ) //map method requries anon function, gives each item of array one item at a time
    // you can also write it like: let cityNames = currentEvents.map(event => event.city);

    let citiesSet = new Set(cityNames); //Set objects are a collection of values to ensure NO DUPLICATES
    let distinctCities = [...citiesSet]; // converts set to array with the []: ['Charlotte', 'San Diego', 'New York'] // ...spread operator

    const dropdownTemplate = document.getElementById('dropdownItemTemplate');

    //copy the template
    let dropdownItemNode = document.importNode(dropdownTemplate.content, true); //false would include li parent tag but no child elements inside

    //make our changes
    let dropdownItemLink = dropdownItemNode.querySelector('a')
    dropdownItemLink.innerText = 'All Cities';
    dropdownItemLink.setAttribute('data-string', 'All');

    //add out copy to the page
    dropdownMenu.appendChild(dropdownItemNode);

    for(let i = 0; i < distinctCities.length; i += 1) {
        //get the city name
        let cityName = distinctCities[i];

            //generate a dropdown element
            let dropdownItemNode = document.importNode(dropdownTemplate.content, true);
            let dropdownItemLink = dropdownItemNode.querySelector('a');
            dropdownItemLink.innerText = cityName;
            dropdownItemLink.setAttribute('datastring', cityName);
            
        //append to dropdown menu
        dropdownMenu.appendChild(dropdownItemNode);
    }

    displayEventData(currentEvents);
    displayStats(currentEvents);
}

function displayEventData(currentEvents) {
       // get the table
    const eventTable = document.getElementById('eventTable');
    const template = document.getElementById('tableRowTemplate');

    eventTable.innerHTML = '';

    for (let i = 0; i < currentEvents.length; i++) {
        let event = currentEvents[i];

        let tableRow = document.importNode(template.content, true);

        tableRow.querySelector('[data-id="event"]').textContent = event.event;
        tableRow.querySelector('[data-id="city"]').textContent = event.city;
        tableRow.querySelector('[data-id="state"]').textContent = event.state;
        tableRow.querySelector('[data-id="attendance"]').textContent = event.attendance;
        tableRow.querySelector('[data-id="date"]').textContent = event.date;

        //display results
        eventTable.appendChild(tableRow);
    }
}

function calculateStats(currentEvents) {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = currentEvents[0].attendance;

    for(let i = 0; i < currentEvents.length; i++) {
        let currentAttendance = currentEvents[i].attendance;

        total += currentAttendance; // total = total + currentAttendance;

        if (currentAttendance > most) {
            most = currentAttendance;
        }

        if (currentAttendance < least) {
            least = currentAttendance;
        }  
    }

    average = total / currentEvents.length;


    // created 1 object stats for the values above to be able to return
    let stats = { 
        total: total,
        average: average,
        most: most,
        least: least
    }

    return stats;
}

function displayStats(currentEvents) {
    let statistics = calculateStats(currentEvents); //giving the stats object since that is what it is returning from calculateStats(currentEvents)

    //get the elements where the stats go
    //set their text to be the correct stat form statistics
    document.getElementById('total').textContent = statistics.total.toLocaleString();
    document.getElementById('average').textContent = Math.round(statistics.average).toLocaleString();
    document.getElementById('most').textContent = statistics.most.toLocaleString();
    document.getElementById('least').textContent = statistics.least.toLocaleString();
}