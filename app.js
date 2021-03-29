console.log("Let's do this")

const buttonGetWineList = document.getElementById('all-wines-btn')
const buttonCreateNewWine = document.getElementById('new-wine-input-btn')
const wineCatalog = document.querySelector('.wine-catalog')
const mainContent = document.querySelector('.main-content')
const siteHeader = document.getElementById('site-header')

let result = null
let deleteButton = null
let nameLinks = null
let nameDetails = null


const getWineCatalog = async () => {
    try {
        let response = await fetch('https://myapi-profstream.herokuapp.com/api/3f4da7/wines/')
        let result = await response.json()
        loadWineCatalogDOM(result)
        wineCatalogArr.push(result)
        return wineCatalogArr
        
    } catch (error) {

    }
   
    
}


const loadWineCatalogDOM = (result) => {
    let wineIndex = document.createElement('div')
    wineIndex.classList.add("wine-index")
    wineCatalog.appendChild(wineIndex)

    let wineViewing = document.createElement('div')
    wineViewing.classList.add("wineViewing")
    mainContent.appendChild(wineViewing)


    for (let i = 0; i < result.length; i++) {

        // sidebar listing
        let wineIndexListing = document.createElement('div')
        wineIndexListing.id = `index-${result[i].id}`
        wineIndexListing.innerText = `${result[i].name}`
        wineIndexListing.classList.add("wine-index-listing")
        wineIndex.appendChild(wineIndexListing)

        // wine details
        let wineName = document.createElement('div')
        wineName.innerText = `Name: ${result[i].name}`
        wineName.id = `wine-${result[i].id}`
        wineName.classList.add("wine-name")
        wineName.classList.add("hidden")
        wineViewing.appendChild(wineName)
        
        let winePrice = document.createElement('div')
        winePrice.innerText = `Price: $${result[i].price}`
        winePrice.classList.add("wine-price")
        wineName.appendChild(winePrice)

        let wineYear = document.createElement('div')
        wineYear.innerText = `Year: ${result[i].year}`
        wineYear.classList.add("wine-year")
        wineName.appendChild(wineYear)

        let wineGrapes = document.createElement('div')
        wineGrapes.innerText = `Grapes: ${result[i].grapes}`
        wineGrapes.classList.add("wine-grapes")
        wineName.appendChild(wineGrapes)

        let wineCountry = document.createElement('div')
        wineCountry.innerText = `Country: ${result[i].country}`
        wineCountry.classList.add("wine-country")
        wineName.appendChild(wineCountry)

        let wineRegion = document.createElement('div')
        wineRegion.innerText = `Region: ${result[i].region}`
        wineRegion.classList.add("wine-region")
        wineName.appendChild(wineRegion)

        let wineDescription = document.createElement('div')
        wineDescription.innerText = `Description: ${result[i].description}`
        wineDescription.classList.add("wine-description")
        wineName.appendChild(wineDescription)

        let wineNav = document.createElement('button')
        wineNav.id = `${result[i].id}`
        wineNav.innerText = "Remove this wine"
        wineNav.classList.add("wine-btn")
        wineName.appendChild(wineNav)

        let winePicture = document.createElement('img')
        winePicture.src = `${result[i].picture}`
        winePicture.classList.add("wine-picture")
        wineName.appendChild(winePicture)
    }
    deleteButton = document.querySelectorAll('.wine-btn')

    for (let j = 0; j < deleteButton.length; j++) {        
        deleteButton[j].addEventListener('click', () => {
            deleteWine(deleteButton[j].id)
        })
    }

    nameLinks = document.querySelectorAll('.wine-index-listing')
    nameDetails = document.querySelectorAll('.wine-name')

    for (let k = 0; k < nameLinks.length; k++) {
        nameLinks[k].addEventListener('click', () => {
        siteHeader.innerText = nameLinks[k].innerText     
            for (let m = 0; m < nameDetails.length; m++) {
                if(nameDetails[m].classList.contains("hidden") !== true) {
                    nameDetails[m].classList.add("hidden") 
                }
                
            }
            if (document.querySelector('.wineViewing').classList.contains("hidden") === true) {
                document.querySelector('.wineViewing').classList.remove("hidden")
            }

            if (document.getElementById("splash-home").classList.contains("hidden") !== true) {
                document.getElementById("splash-home").classList.add("hidden")
            }

            if (document.getElementById("parent-form").classList.contains("hidden") !== true) {
                document.getElementById("parent-form").classList.add("hidden")
            }
            
            let wineIDcode = nameLinks[k].id.slice(6, 10)
            wineLinksNav(`wine-${wineIDcode}`)
        })
    }

}

const clearWineCatalogDOM = () => {
    while(wineCatalog.firstChild) {
        wineCatalog.removeChild(wineCatalog.firstChild)
    }
}

buttonGetWineList.addEventListener('click', () => {
    siteHeader.innerText = "Index of All Wines"
    clearWineCatalogDOM()
    if (document.querySelector('.wineViewing').classList.contains("hidden") !== true) {
        document.querySelector('.wineViewing').classList.add("hidden")
    }
    if (document.getElementById("parent-form").classList.contains("hidden") !== true) {
        document.getElementById("parent-form").classList.add("hidden")
    }
    getWineCatalog()
    clearWineCatalogDOM()
    if (document.getElementById("splash-home").classList.contains("hidden") === true) {
        document.getElementById("splash-home").classList.remove("hidden")
    }

})

document.querySelector('#wine-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    //get form values
    let name = document.querySelector('#name').value
    let year = document.querySelector('#year').value
    let grapes = document.querySelector('#grapes').value
    let country = document.querySelector('#country').value
    let region = document.querySelector('#region').value
    let description = document.querySelector('#description').value
    let picture = document.querySelector('#picture').value
    let price = document.querySelector('#price').value
  
    const res = await fetch('http://myapi-profstream.herokuapp.com/api/3f4da7/wines/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": `${name}`,
        "year": `${year}`,
        "grapes": `${grapes}`,
        "country": `${country}`,
        "region": `${region}`,
        "description": `${description}`,
        "picture": `${picture}`,
        "price": `${price}`
      })
    })

    siteHeader.innerText = `${name}`
    let newWineName = siteHeader.innerText
    if (document.getElementById("parent-form").classList.contains("hidden") !== true) {
        document.getElementById("parent-form").classList.add("hidden")
    }

})

buttonCreateNewWine.addEventListener('click', () => {
    siteHeader.innerText = "New Wine Details"

    if (document.querySelector('.wineViewing').classList.contains("hidden") !== true) {
        document.querySelector('.wineViewing').classList.add("hidden")
    }

    if (document.getElementById("splash-home").classList.contains("hidden") !== true) {
        document.getElementById("splash-home").classList.add("hidden")
    }

    if (document.getElementById("parent-form").classList.contains("hidden") === true) {
        document.getElementById("parent-form").classList.remove("hidden")
    }
})

const wineLinksNav = (wineID) => {
    document.getElementById(`${wineID}`).classList.remove("hidden")
}

let deleteWine = async (wineID) => {
    console.log(`You deleted wine ID: ${wineID}`)
    let responseDelete = await fetch(`https://myapi-profstream.herokuapp.com/api/3f4da7/wines/${wineID}`, {
        method: 'DELETE'
    })
}    

document.addEventListener('DOMContentLoaded', getWineCatalog);