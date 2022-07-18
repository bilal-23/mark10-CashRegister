import { useState, useRef } from "react";
import Footer from "./components/Footer";
import "./styles.css";

export default function App() {
  const billRef = useRef();
  const cashRef = useRef();
  const [notes, setNotes] = useState();
  const [error, setError] = useState(false);

  function formSubmitHandler(e) {
    e.preventDefault();
    let changeToBeReturn = [
      { amount: 2000, notes: 0 },
      { amount: 500, notes: 0 },
      { amount: 100, notes: 0 },
      { amount: 50, notes: 0 },
      { amount: 10, notes: 0 },
      { amount: 5, notes: 0 },
      { amount: 1, notes: 0 }
    ];
    const billAmount = billRef.current.value;
    const cashAmount = cashRef.current.value;
    let amountToBeReturned = cashAmount - billAmount;
    if (billAmount === "" || cashAmount === "") {
      return;
    } else if (amountToBeReturned < 0) {
      setError("Do You Want To Wash Dishes !!!");
    } else {
      setError(false);
      changeToBeReturn.forEach((amt, index) => {
        const notes = Math.trunc(amountToBeReturned / amt.amount);
        amountToBeReturned = amountToBeReturned % amt.amount;
        changeToBeReturn[index].notes = notes;
      });
      setNotes(changeToBeReturn);
    }
  }

  return (
    <>
      <main className="App">
        <header className="header">
          <h1 className="heading">
            <span role="img" aria-label="Cash Emoji">
              💸
            </span>{" "}
            Cash Register
          </h1>
          <p className="normal-text text-center">
            Enter the bill amount and cash given by the customer and know
            minimum number of notes to return.
          </p>
          <form onSubmit={formSubmitHandler} className="inputs-container">
            <div className="input-group">
              <label>Bill Amount :</label>
              <input type="number" ref={billRef} />
            </div>
            <div className="input-group">
              <label>Cash Given :</label>
              <input type="number" ref={cashRef} />
            </div>
            <div className="btn-container">
              <button className="button">Check</button>
            </div>
          </form>
        </header>
        {error && <p className="error">{error}</p>}
        {!error && (
          <table className={`change-table ${!notes && "hide"}`}>
            <caption className="normal-text">Return Change </caption>
            <tbody>
              <tr>
                <th>No of Notes</th>
                {notes?.map((item) => {
                  return (
                    <td key={item.amount} className="no-of-notes">
                      {item?.notes}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th>Note</th>
                <td>2000</td>
                <td>500</td>
                <td>100</td>
                <td>20</td>
                <td>10</td>
                <td>5</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        )}
      </main>
      <Footer />
    </>
  );
}
