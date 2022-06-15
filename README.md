# Angular Spotify Application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) 

## Description
In this Angular Web application we will be interacting with two web services: Spotify's REST APIs and my own created Express App that provides REST APIs for User Authentication and saving of User's favorite songs. The main functionalities involve:

### Logging/registering users 

Once succesfully logged in, this application will receive a JSON web token, which is required to access user-related APIs as well as navigate throughout the application.

### Displaying Spotify's New Releases, Album information, and Artist Discography

The main feature in this application is displaying Spotify's new releases to the user. The main page will load in cards from Material UI, in which it will display the top 50 new release albums on Spotify.

Another features include navigation to album information, allowing users to listen to sample tracks, if provided, and allow users to favorite any tracks.

Finally, the last feature involves displaying the Artist Information/Discography, where the Artist's newest albums will be displayed and allow navigation to the specific Album page.

### Saved Favorites

Finally, users can save favorite songs on the album information page. Every time the user favorites a song, the song ID is sent as a POST request to my Express Server, in which it will save the song ID to MongoDB for the particular user. When the user clicks on the "favorite" page on our Angular App, we will send a GET request to my Express Server to grab all favorite song Ids, in which our Angular Framework will send as a GET request to the Spotify REST API and display the songs on the page. 

