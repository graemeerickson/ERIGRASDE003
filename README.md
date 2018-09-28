# ERIGRASDE003
## Problem
Considering that a non-technical savvy person will be the end-user of the programs you coded (challenges 1 and 2), add a user interface to the previous two-code challenges you created and instructions on how to use them.
## Approach
### Tools & Technologies
#### Languages & Frameworks
I chose to write my solution using Node.js (Javascript) and the Express framework on the backend, and with React.js on the frontend. Of course, since the script from problem #1 is executed as part of this application, Python is also used to execute that script.

Node.js and Express were sensible backend options because they are lightweight and quick to get up & running, and also because I knew I wanted to use the Passport npm package for integration with the Goodreads OAuth API given my familiarity from using Passport in the past for authentication.

I chose React for the frontend because as a single-page app, it enables a very quick frontend user experience. The user can explore the links in the navbar without the entire page refreshing on him/her since only the area beneath the navbar is re-rendered. I value the positive UX that React enables, and I also wanted to get more practice using it since it is an increasingly common frontend solution in the industry.

#### Tools
* Frontend:
  * React-Router-Dom: BrowserRouter enabled use of frontend routing, including 'Switch' to enable catching any undefined routes to render a '404' component.
* Middleware:
  * Passport: Enabled authentication integration with Goodreads.
  * goodreads-passport: Provided Passport strategy for authenticating with Goodreads in Node.js using the OAuth 1.0 API, including setting the callback URL upon successful authentication.
  * express-session: Enabled initialization of authentication sessions.
  * CORS: Enabled access from one local port (3000) to another (3001) since the same local machine is hosting both the client and the server.
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
|/|Home|Display home screen with text encouraging the user to explore the links in the navbar.
|/facebook|FacebookPosts|Connect with backend to retrieve and then render Expedia Facebook posts.
|/quotes|GoodreadsQuotes|Present a Goodreads login button to an unauthorized user, and for an authorized user, connect with backend to retrieve and then render Mark Twain quotes.
|/quotes/:id|GoodreadsQuotes|Rendered once user has been authorized, where a '1' will be included in the path route.
|*|PageNotFound|Display when a user has reached an undefined route, and encourage the user to explore the links in the navbar.
#### Server Routes
|URL|Method|Purpose
|--|--|--|
|/facebook|GET|Execute Python script that parses Expedia's Facebook posts page, parse it for the 8 most recent posts, and store the posts into a text file. Once file is generated, read the file and send the data to the frontend to display on the UI.
|/quotes|GET|Retrieve Goodreads' Mark Twain quotes page and parse it for the top 10 quotes. Store those 10 quotes into an array of objects, and send that data structure to the frontend to display on the UI.
|/auth|GET|Authenticate user with Goodreads OAuth API using Passport middleware.
|/auth/callback|GET|Reached via Goodreads' OAuth callback. At this point, user is authenticated, so redirect him/her to the frontend '/quotes/:id' route, where ':id' is the authorized code '1'.
#### A Note on Auth
Authentication with the Goodreads OAuth API is only partially implemented. While the application successfully redirects the user to the Goodreads' login portal and successfully handles the callback indicating successful authentication, it then leverages the new url path (/quotes/:id) and LocalStorage to check if the user is authorized, rather than calling the Goodreads OAuth API each time with a token. I wasn't able to figure out how to implement the latter solution without also using a database; if I had more time, I would research this further and potentially implement a database to make full proper OAuth work.

The implemented solution writes a 'True' boolean to the user's LocalStorage once authorized with Goodreads, and each time the Quotes page is visited, the app (a) checks LocalStorage for that boolean or if it doesn't exist, then (b) it checks if the URL path contains a '1' indicating that the user has been authorized. The loophole with this approach is that a savvy user could manually navigate directly to the '/quotes/1' route to access the quotes without authenticating with Goodreads.
## How to Test
Explore the app!
* Start with the Home page and verify that there is text encouraging the user to click the Facebook posts and Goodreads quotes links in the navbar.
* Click the 'Expedia on Facebook' nav link and verify that [the 8 most recent Expedia Facebook posts](https://www.facebook.com/pg/expedia/posts/ "the 8 most recent Expedia Facebook posts") are displayed.
* Click the 'Quotes' nav link and verify that you're first met with a Goodreads login button. Click through and enter valid login credentials. If invalid, Goodreads will re-prompt. If valid, verify that the user is properly redirected back to the Quotes page (via '/quotes/:id') route, and that [the top 10 Mark Twain quotes](https://www.goodreads.com/author/quotes/1244.Mark_Twain "the top 10 Mark Twain quotes") are displayed.
* Try each page on a mobile screen; each page is designed to render responsively regardless of screen size.