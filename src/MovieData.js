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