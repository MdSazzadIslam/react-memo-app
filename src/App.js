import React, { useState, useEffect } from "react";
import http from "axios";

const App = () => {
  const [error, setError] = useState(false);

  const [records, setRecords] = useState([]);

  useEffect(() => {
    debugger;

    http
      .get("https://www.anapioficeandfire.com/api/books")

      .then((response) => {
        setError(false);
        setRecords(response.data);
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error);

        setError(error);
      });
  }, [setRecords]);

  if (error) {
    return <div> Error: {error.message}</div>;
  } else {
    return (
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>AUTHOR</th>
              <th>NAME OF BOOK</th>
              <th>PUBLISHER</th>
            </tr>
          </thead>

          <tbody>
            {records.map((item, key) => (
              <tr key={key}>
                <td> {key + 1}</td>
                <td> {item.authors}</td>
                <td> {item.name} </td>
                <td> {item.publisher} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default React.memo(App);

/* When deciding to update DOM, React first renders your component, 
then compares the result with the previous render result. 
If the render results are different, React updates the DOM.
Current vs previous render results comparison is fast. 
But you can speed up the process under some circumstances.
When a component is wrapped in React.memo(), 
React renders the component and memoizes the result. 
Before the next render, if the new props are the same, 
React reuses the memoized result skipping the next rendering. */
