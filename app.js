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
const buttonCreateNewWine = document.getElementById('btn-create')
const buttonSubmitNewWine = document.getElementById('btn-post')
const testingArea = document.querySelector('.testingarea')
const testingPopupZone = document.querySelector('.testingPopupZone')

let result = null
let deleteButton = null
let nameLinks = null
let nameDetails = null



const getWineCatalog = async () => {
    try {
        let response = await fetch('https://myapi-profstream.herokuapp.com/api/d2537b/wines')
        let result = await response.json()
        //console.log(result)
        //console.log(result[0].id)
        loadWineCatalogDOM(result)

    } catch (error) {

    }
}

const loadWineCatalogDOM = (result) => {
    let wineIndex = document.createElement('div')
    wineIndex.classList.add("wine-index")
    testingArea.appendChild(wineIndex)

    let wineViewing = document.createElement('div')
    wineViewing.classList.add("wineViewing")
    testingPopupZone.appendChild(wineViewing)


    for (let i = 0; i < result.length; i++) {

        let wineIndexListing = document.createElement('div')
        wineIndexListing.id = `index-${result[i].id}`
        wineIndexListing.innerText = `${result[i].name}`
        wineIndexListing.classList.add("wine-index-listing")
        wineIndex.appendChild(wineIndexListing)

        let wineName = document.createElement('div')
        wineName.innerText = `Name: ${result[i].name}`
        wineName.id = `wine-${result[i].id}`
        wineName.classList.add("wine-name")
        wineName.classList.add("hidden")
        wineViewing.appendChild(wineName)
        
        let winePrice = document.createElement('div')
        winePrice.innerText = `Price: $${result[i].price}`
        winePrice.classList.add("wine-price")
        //winePrice.classList.add("hidden")
        wineName.appendChild(winePrice)

        let wineYear = document.createElement('div')
        wineYear.innerText = `Year: ${result[i].year}`
        wineYear.classList.add("wine-year")
        //wineYear.classList.add("hidden")
        wineName.appendChild(wineYear)

        let wineGrapes = document.createElement('div')
        wineGrapes.innerText = `Grapes: ${result[i].grapes}`
        wineGrapes.classList.add("wine-grapes")
        //wineGrapes.classList.add("hidden")
        wineName.appendChild(wineGrapes)

        let wineCountry = document.createElement('div')
        wineCountry.innerText = `Country: ${result[i].country}`
        wineCountry.classList.add("wine-country")
        //wineCountry.classList.add("hidden")
        wineName.appendChild(wineCountry)

        let wineRegion = document.createElement('div')
        wineRegion.innerText = `Region: ${result[i].region}`
        wineRegion.classList.add("wine-region")
        //wineRegion.classList.add("hidden")
        wineName.appendChild(wineRegion)

        let wineDescription = document.createElement('div')
        wineDescription.innerText = `Description: ${result[i].description}`
        wineDescription.classList.add("wine-description")
        //wineDescription.classList.add("hidden")
        wineName.appendChild(wineDescription)

        let wineNav = document.createElement('button')
        wineNav.id = `${result[i].id}`
        wineNav.innerText = "Remove this wine"
        wineNav.classList.add("wine-btn")
        //wineNav.classList.add("hidden")
        wineName.appendChild(wineNav)

        let winePicture = document.createElement('img')
        winePicture.src = `${result[i].picture}`
        winePicture.classList.add("wine-picture")
        //winePicture.classList.add("hidden")
        wineName.appendChild(winePicture)
    }
    deleteButton = document.querySelectorAll('.wine-btn')

    for (let j = 0; j < deleteButton.length; j++) {        
        deleteButton[j].addEventListener('click', () => {
            deleteWine(deleteButton[j].id)
        })
    }

    nameLinks = document.querySelectorAll('.wine-index-listing')
    //console.log("nameLinks", nameLinks)
    //console.log("nameLinks[0]", nameLinks[0])

    nameDetails = document.querySelectorAll('.wine-name')
    //console.log("nameDetails", nameDetails)
    //console.log("nameDetails[0]", nameDetails[0])

    

    for (let k = 0; k < nameLinks.length; k++) {
        nameLinks[k].addEventListener('click', () => {
             
            for (let m = 0; m < nameDetails.length; m++) {
                if(nameDetails[m].classList.contains("hidden") !== true) {
                    nameDetails[m].classList.add("hidden")
                }
            }
            if (document.getElementById("testingInput").classList.contains("hidden") !== true) {
                document.getElementById("testingInput").classList.add("hidden")
            }
             
            
            //console.log(`You clicked ${nameLinks[k].id}`)
            //wineClearDetails()
            let wineIDcode = nameLinks[k].id.slice(6, 10)
            wineLinksNav(`wine-${wineIDcode}`)
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

buttonSubmitNewWine.addEventListener('click', () => {
    createNewWinePost()
    
    clearWineCatalogDOM()
    getWineCatalog()
})

buttonCreateNewWine.addEventListener('click', () => {
    for (let m = 0; m < nameDetails.length; m++) {
        if(nameDetails[m].classList.contains("hidden") !== true) {
            nameDetails[m].classList.add("hidden")
        }
    }
    document.getElementById("testingInput").classList.remove("hidden")

    

})


const createNewWinePost = async () => {
    let newName = document.getElementById("new-name").value
    let newYear = document.getElementById("new-year").value
    let newPrice = document.getElementById("new-price").value
    let newGrapes = document.getElementById("new-grapes").value
    let newDescription = document.getElementById("new-description").value
    let newCountry = document.getElementById("new-country").value
    let newRegion = document.getElementById("new-region").value
    let newPicture = document.getElementById("new-picture").value
    
    let responsePOST = await fetch('http://myapi-profstream.herokuapp.com/api/d2537b/wines', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "name": `${newName}`,
        "year": `${newYear}`,
        "grapes": `${newGrapes}`,
        "country": `${newCountry}`,
        "region": `${newRegion}`,
        "description": `${newDescription}`,
        "picture": `${newPicture}`,
        "price": `${newPrice}`

        })
    }) 
}



const wineLinksNav = (wineID) => {
    document.getElementById(`${wineID}`).classList.remove("hidden")
}


let deleteWine = async (wineID) => {
    console.log(`You deleted wine ID: ${wineID}`)
    let responseDelete = await fetch(`https://myapi-profstream.herokuapp.com/api/d2537b/wines/${wineID}`, {
        method: 'DELETE'
    })
}    


document.addEventListener('DOMContentLoaded', getWineCatalog);