### Build a React component that fetches data from Google Sheets

Google Sheets can be used to provide a makeshift database that’s easy to modify for non-developers. It’s not the best solution for high traffic sites but works well for internal websites or when prototyping an app.

In this tutorial use Papa Parse to fetch data from a Google Sheet into React.
[https://www.npmjs.com/package/tabletop](https://www.npmjs.com/package/tabletop)

Let’s start by installing Papa Parse into our React application using NPM:

    npm install papaparse`

For this tutorial I’ve created a simple spreadsheet with the following data:

![](https://w3collective.com/wp-content/uploads/2020/08/react-sheet-data.png)

There are some requirements for the structure of this data:

- All columns must have a “label” in the first row and not contain any weird characters.
- Google assumes an empty row is the end of the sheet and stops returning data.

Once the sheet is complete select “File” -> "Share" -> “Publish to web” so it’s publicly visible.

Now for the component, create a new MovieData.js file



    import React, { useState } from "react";
    import Papa from "papaparse";
    
    const MovieData = () => {
      const [data, setData] = useState({});
      Papa.parse(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQpRGwrDuvb1eZiyUTWhPWIcmKrFiFYk-MR28hayZGs6wLTZ9mGZKl6nGPtO4HBf20Okw4b-Fasm55u/pub?output=csv",
        {
          download: true,
          header: true,
          complete: (results) => {
            setData(results.data);
          },
        }
      );
      const movies = Array.from(data);
      return (
        <ul>
          {movies.map((data) => (
            <li key={data.movie}>
              {data.movie} ({data.year}) - Rating {data.rating}
            </li>
          ))}
        </ul>
      );
    };
    export default MovieData;
 
