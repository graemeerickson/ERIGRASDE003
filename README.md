# ERIGRASDE003
## Problem
Considering that a non-technical savvy person will be the end-user of the programs you coded (challenges 1 and 2), add a user interface to the previous two-code challenges you created and instructions on how to use them.
## Approach
### Tools & Technologies
#### Languages & Frameworks
* Backend:
  * Node.js
  * Express
  * Python
* Frontend:
  * React.js

#### Tools
* Middleware:
  * Passport
  * goodreads-passport
  * express-session
  * CORS
* Webscraping:
  * Expedia Facebook posts
    * urlopen (from urllib.request package): Enabled requesting & retrieving the raw HTML from the [Expedia Facebook posts webpage](https://www.facebook.com/pg/expedia/posts/ "Expedia Facebook posts webpage").
    * BeautifulSoup (from bs4 package): Enabled parsing the retrieved HTML with methods built into BeautifulSoup like *findAll* and *find*. Using this package freed me from manually traversing the DOM and instead focus on simply finding the right "hooks" (via elements and/or class names) to target the relevant information.
  * Goodreads quotes
    * node-fetch: Enabled requesting & retrieving the raw HTML from the [Goodreads Mark Twain quotes webpage](https://www.goodreads.com/author/quotes/1244.Mark_Twain "Goodreads Mark Twain quotes webpage") using the *fetch* statement.
    * Cheerio: Enabled parsing the retrieved HTML with methods built into Cheerio like 'find'. Using this package freed me from manually traversing the DOM and instead focus on simply finding the right "hooks" (via elements and/or class names) to target the relevant information.
* Filesystem interaction:
  * Facebook posts Python script
    * json: The json *dump* method enabled storing of the data structure into JSON format, per the requirements.
    * codecs: The *getwriter* method enabled the stored data to be encoded with utf-8.
  * Goodreads quotes Javascript code
    * fs: Enabled writing to a text file in both the main program and the test script, and enabled checking for and deleting an existing text file in the text script.


### Logic Flow & App Design
See the [ERIGRASDE001](https://github.com/graemeerickson/ERIGRASDE001 "ERIGRASDE001") readme and the [ERIGRASDE002](https://github.com/graemeerickson/ERIGRASDE002 "ERIGRASDE002") readme for logic flows related to the backend processes of fetching Expedia Facebook posts and Mark Twain quotes from Goodreads.

#### Frontend Routes
|Path|React Component|Purpose
|--|--|--|
|/|Home|Display home screen with text encouraging the user to explore the links in the navbar
|/facebook|FacebookPosts|Connect with backend to retrieve and then render Expedia Facebook posts
|/quotes|GoodreadsQuotes|Present a Goodreads login button to an unauthorized user, and for an authorized user, connect with backend to retrieve and then render Mark Twain quotes
|/quotes/:id|GoodreadsQuotes|Rendered once user has been authorized, where a '1' will be included in the path route
|*|PageNotFound|Display when a user has reached an undefined route, and encourage the user to explore the links in the navbar

#### Server Routes
|URL|Method|Purpose
|--|--|--|
|/facebook|GET|Execute Python script that parses Expedia's Facebook posts page, parse it for the 8 most recent posts, and store the posts into a text file. Once file is generated, read the file and send the data to the frontend to display on the UI.
|/quotes|GET|Retrieve Goodreads' Mark Twain quotes page and parse it for the top 10 quotes. Store those 10 quotes into an array of objects, and send that data structure to the frontend to display on the UI.
|/auth|GET|Authenticate user with Goodreads OAuth API using Passport middleware.
|/auth/callback|GET|Reached via Goodreads' OAuth callback. At this point, user is authenticated, so redirect him/her to the frontend '/quotes/:id' route, where ':id' is the authorized code '1'.

## How to Test


























