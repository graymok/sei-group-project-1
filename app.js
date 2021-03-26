console.log("Let's do this")

const buttonGetWineList = document.getElementById('all-wines-btn')
const buttonCreateNewWine = document.getElementById('new-wine-input-btn')
//const buttonSubmitNewWine = document.getElementById('btn-post')
const wineCatalog = document.querySelector('.wine-catalog')
const mainContent = document.querySelector('.main-content')
const siteHeader = document.getElementById('site-header')

let result = null
let deleteButton = null
let nameLinks = null
let nameDetails = null
let newWineDetails = null



const getWineCatalog = async () => {
    try {
        let response = await fetch('https://myapi-profstream.herokuapp.com/api/3f4da7/wines/')
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
    //console.log("nameLinks", nameLinks)
    //console.log("nameLinks[0]", nameLinks[0])

    nameDetails = document.querySelectorAll('.wine-name')
    //console.log("nameDetails", nameDetails)
    //console.log("nameDetails[0]", nameDetails[0])

    

    for (let k = 0; k < nameLinks.length; k++) {
        nameLinks[k].addEventListener('click', () => {
        siteHeader.innerText = nameLinks[k].innerText     
            for (let m = 0; m < nameDetails.length; m++) {
                if(nameDetails[m].classList.contains("hidden") !== true) {
                    nameDetails[m].classList.add("hidden") 
                }
                
            }
            //if (document.getElementById("testingInput").classList.contains("hidden") !== true) {
            //    document.getElementById("testingInput").classList.add("hidden")
            //}
            if (document.querySelector('.wineViewing').classList.contains("hidden") === true) {
                document.querySelector('.wineViewing').classList.remove("hidden")
            }


            if (document.getElementById("splash-home").classList.contains("hidden") !== true) {
                document.getElementById("splash-home").classList.add("hidden")
            }

            if (document.getElementById("parent-form").classList.contains("hidden") !== true) {
                document.getElementById("parent-form").classList.add("hidden")
            }
            
            //console.log(`You clicked ${nameLinks[k].id}`)
            //wineClearDetails()
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

/* buttonSubmitNewWine.addEventListener('click', () => {
    createNewWinePost()
    
    clearWineCatalogDOM()
    getWineCatalog()
}) */

/* buttonCreateNewWine.addEventListener('click', () => {
    for (let m = 0; m < nameDetails.length; m++) {
        if(nameDetails[m].classList.contains("hidden") !== true) {
            nameDetails[m].classList.add("hidden")
        }
    }
    document.getElementById("testingInput").classList.remove("hidden")

    

}) */

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
  
    // const body = JSON.stringify({name, year, grape, country, region, description, picture, price})
  
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
    
    console.log(name)

    siteHeader.innerText = `${name}`
    getWineCatalog()
    clearWineCatalogDOM()
    if (document.getElementById("parent-form").classList.contains("hidden") !== true) {
        document.getElementById("parent-form").classList.add("hidden")
    }

    document.querySelector('.wineViewing').classList.remove("hidden")

    let newWineName = document.createElement('div')
    newWineName.innerText = `Name: ${name}`
    newWineName.classList.add("wine-name")
    wineViewing.appendChild(newWineName)
        
    let newWinePrice = document.createElement('div')
    newWinePrice.innerText = `Price: $${price}`
    newWinePrice.classList.add("wine-price")
    wineName.appendChild(newWinePrice)

    let newWineYear = document.createElement('div')
    newWineYear.innerText = `Year: ${year}`
    newWineYear.classList.add("wine-year")
    wineName.appendChild(newWineYear)

    let newWineGrapes = document.createElement('div')
    newWineGrapes.innerText = `Grapes: ${grapes}`
    newWineGrapes.classList.add("wine-grapes")
    wineName.appendChild(newWineGrapes)

    let newWineCountry = document.createElement('div')
    newWineCountry.innerText = `Country: ${country}`
    newWineCountry.classList.add("wine-country")
    wineName.appendChild(newWineCountry)

    let newWineRegion = document.createElement('div')
    newWineRegion.innerText = `Region: ${region}`
    newWineRegion.classList.add("wine-region")
    wineName.appendChild(newWineRegion)

    let newWineDescription = document.createElement('div')
    newWineDescription.innerText = `Description: ${description}`
    newWineDescription.classList.add("wine-description")
    wineName.appendChild(newWineDescription)

    let newWinePicture = document.createElement('img')
    newWinePicture.src = `${picture}`
    newWinePicture.classList.add("wine-picture")
    wineName.appendChild(newWinePicture)

})




    /* if (document.querySelector('.wineViewing').classList.contains("hidden") !== true) {
        document.querySelector('.wineViewing').classList.add("hidden")
    }
    if (document.getElementById("parent-form").classList.contains("hidden") !== true) {
        document.getElementById("parent-form").classList.add("hidden")
    }
    getWineCatalog()
    clearWineCatalogDOM()
    if (document.getElementById("splash-home").classList.contains("hidden") === true) {
        document.getElementById("splash-home").classList.remove("hidden")
    } */


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


/* const createNewWinePost = async () => {
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
} */


const wineLinksNav = (wineID) => {
    document.getElementById(`${wineID}`).classList.remove("hidden")
}


let deleteWine = async (wineID) => {
    //alert("You deleted the wine!")
    console.log(`You deleted wine ID: ${wineID}`)
    let responseDelete = await fetch(`https://myapi-profstream.herokuapp.com/api/3f4da7/wines/${wineID}`, {
        method: 'DELETE'
    })
}    


document.addEventListener('DOMContentLoaded', getWineCatalog);