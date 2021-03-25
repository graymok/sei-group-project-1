# Group Project 1

## Project Team
* Elias Ramirez
* Gregory Bertrand
* Tim Mok


## Project Tracker

https://trello.com/b/miDJ1IgI/sei-group-project-1


## User Stories

1. When I load the site, I see links to "All Wines" and "Create a New Wine". I also see a header (under the links) identifying which view I'm currently in, and a viewing area. The header starts off as "Index of All Wines", and the viewing area starts off with a list of all existing wines.

2. Each wine in the list displays just the wine's name.

3. When I click on a single wine in the list, the header changes to "Details for {wine name}", and the viewing area changes to the full details for that wine.

4. When I click on "Create a New Wine", the header changes to "New Wine Details", and the viewing area changes to a form. The form contains a labeled input for each attribute of the wine (as required by the API).

5. When I submit the new wine, I see the details page for the wine I just created (including an updated header and viewing area).


## Stretch Goals

1. When I am in "Details for {wine name}" view, there is a Delete button underneath the wine's details. When I click this button, the wine gets deleted from the API, and the view changes to the List of All Wines.

2. When I am in "Details for {wine name}" view, there is an Edit button underneath the book's details. When I click this button, the header changes to "Editing {wine name}", and the viewing area changes to a form. The fields of the form are pre-filled with the wine's attributes. When I submit this form, the wine gets updated in the API, and my view changes to the Details page for the wine I just updated.

3. The API will only accept your POST request if all fields are present. We want to visually communicate this to our user. So when the Create a New Wine form is submitted, before firing off the API call, check that each field has something in it. If any fields are blank, decline to make the API request, and visually indicate that those fields are required. This is called validating the form.

4. Perform form validations on the Edit form as well as the Create form.

5. Put a placeholder on the page while the data is loading (a spinner, something else animated, or even just "Loading..." text)