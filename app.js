//Wine Class: Represents a Wine
class Wine {
  constructor(name, region, year) {
    this.name = name
    this.region = region
    this.year = year
  }
}

//UI Class: Handle UI Task
//hard coded data, its an array
class UI {
  static displayWines() {
    const StoredWine = [
      {
        name: 'Wine One',
        region: 'New York',
        year: '2020'
      },
      {
        name: 'Wine Two',
        region: 'region',
        year: '2020'
      }
    ];

    //we are setting wine to this array
    const wines = StoredWines;

    //we are looping thru, and calling the addWinetolist method.
    wines.forEach((wine) => UI.addWineToList())
  }

  //here we CREATE add addWineToList(). you can call functions before you create them. Here we create the row to put into the tbody over in the HTML file
  static addWineToList(wine) {
    const list = document.querySelector('#wine-list');

    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${wine.name}</td>
    <td>${wine.region}</td>
    <td>${wine.year}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    //now we have to append this newly created row to the list
    list.appendChild(row)
  }
}


//Store Class: Handles Storage

//Event: Display Wines


//Event: Add a Wine 

//Event: Remove a Wine
// tim's wine API for testing: https://myapi-profstream.herokuapp.com/api/d2537b/wines

console.log("Let's do this")

const buttonGetWineList = document.getElementById('btn-getlist')
const testingArea = document.querySelector('.testingarea')

let result = null
let deleteButton = null

const getWineCatalog = async () => {
    try {
        let response = await fetch('https://myapi-profstream.herokuapp.com/api/d2537b/wines')
        let result = await response.json()
        console.log(result)
        console.log(result[0].id)
        loadWineCatalogDOM(result)

    } catch (error) {

    }
}

const loadWineCatalogDOM = (result) => {
    let wineEntries = document.createElement('div')
    wineEntries.classList.add("wine-entries")
    testingArea.appendChild(wineEntries)

    for (let i = 0; i < result.length; i++) {

        let wineEntry = document.createElement('div')
        wineEntry.id = `wine-${result[i].id}`
        wineEntry.innerText = `Name: ${result[i].name}`
        wineEntry.classList.add("wine-name")
        wineEntries.appendChild(wineEntry)

        let winePrice = document.createElement('div')
        winePrice.innerText = `Price: $${result[i].price}`
        winePrice.classList.add("wine-price")
        wineEntry.appendChild(winePrice)

        let wineYear = document.createElement('div')
        wineYear.innerText = `Year: ${result[i].year}`
        wineYear.classList.add("wine-year")
        wineEntry.appendChild(wineYear)

        let wineGrapes = document.createElement('div')
        wineGrapes.innerText = `Grapes: ${result[i].grapes}`
        wineGrapes.classList.add("wine-grapes")
        wineEntry.appendChild(wineGrapes)

        let wineCountry = document.createElement('div')
        wineCountry.innerText = `Country: ${result[i].country}`
        wineCountry.classList.add("wine-country")
        wineEntry.appendChild(wineCountry)

        let wineRegion = document.createElement('div')
        wineRegion.innerText = `Region: ${result[i].region}`
        wineRegion.classList.add("wine-region")
        wineEntry.appendChild(wineRegion)

        let wineDescription = document.createElement('div')
        wineDescription.innerText = `Description: ${result[i].description}`
        wineDescription.classList.add("wine-description")
        wineEntry.appendChild(wineDescription)

        let wineNav = document.createElement('button')
        wineNav.id = `${result[i].id}`
        wineNav.innerText = "Remove this wine"
        wineNav.classList.add("wine-btn")
        wineEntry.appendChild(wineNav)

        let winePicture = document.createElement('img')
        winePicture.src = `${result[i].picture}`
        winePicture.classList.add("wine-picture")
        wineEntry.appendChild(winePicture)
    }
    deleteButton = document.querySelectorAll('.wine-btn')

    for (let j = 0; j < deleteButton.length; j++) {        
        deleteButton[j].addEventListener('click', () => {
            deleteWine(deleteButton[j].id)
        })
    }

}

const clearWineCatalogDOM = () => {
    while(testingArea.firstChild) {
        testingArea.removeChild(testingArea.firstChild)
    }
}

buttonGetWineList.addEventListener('click', () => {
    clearWineCatalogDOM()
    getWineCatalog()

})


let deleteWine = async (wineID) => {
    console.log(`You deleted wine ID: ${wineID}`)
    let responseDelete = await fetch(`https://myapi-profstream.herokuapp.com/api/d2537b/wines/${wineID}`, {
        method: 'DELETE'
    })
}    
