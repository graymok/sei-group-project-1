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