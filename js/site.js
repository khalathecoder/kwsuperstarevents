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
    dropdownMenu.innerHTML = ''; //removes the current city values above

    let currentEvents = events; //TODO: get these from storage

    let cityNames = currentEvents.map(
        function(event) {
            return event.city;
        }
    ) //map method requries anon function, gives each item of array one item at a time
    // you can also write it like: let cityNames = currentEvents.map(event => event.city);

    let citiesSet = new Set(cityNames); //Set objects are a collection of values
    let distinctCities = [...citiesSet]; // converts to array with the []: ['Charlotte', 'San Diego', 'New York']

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
}