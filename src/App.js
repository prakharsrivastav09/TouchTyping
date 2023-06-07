import { useState, useEffect, useRef } from "react";
import "./Deskstop1.css";
import Navbar from "./Navbar";
import randomWords from "random-words";

const NUMB_OF_WORDS = 50;
const SECONDS = 10;

function App() {
  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(SECONDS);
  const [currInput, setCurrInput] = useState("");
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState("waiting");
  const textInput = useRef(null);

  useEffect(() => {
    setWords(generateWords());
  }, []);

  useEffect(() => {
    if (status === "started") {
      textInput.current.focus();
    }
  }, [status]);

  function generateWords() {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords());
  }

  function start() {
    if (status === "finished") {
      setWords(generateWords());
      setCurrWordIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setCurrCharIndex(-1);
      setCurrChar("");
    }

    if (status !== "started") {
      setStatus("started");
      let interval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval);
            setStatus("finished");
            setCurrInput("");
            return SECONDS;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    }
  }

  function handleKeyDown({ keyCode, key }) {
    // space bar
    if (keyCode === 32) {
      checkMatch();
      setCurrInput("");
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(-1);
      // backspace
    } else if (keyCode === 8) {
      setCurrCharIndex(currCharIndex - 1);
      setCurrChar("");
    } else {
      setCurrCharIndex(currCharIndex + 1);
      setCurrChar(key);
    }
  }

  function checkMatch() {
    const wordToCompare = words[currWordIndex];
    const doesItMatch = wordToCompare === currInput.trim();
    if (doesItMatch) {
      setCorrect(correct + 1);
    } else {
      setIncorrect(incorrect + 1);
    }
  }

  function getCharClass(wordIdx, charIdx, char) {
    if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex &&
      currChar &&
      status !== "finished"
    ) {
      if (char === currChar) {
        return "has-background-success";
      } else {
        return "has-background-danger";
      }
    } else if (
      wordIdx === currWordIndex &&
      currCharIndex >= words[currWordIndex].length
    ) {
      return "has-background-danger";
    } else {
      return "";
    }
  }

  return (
    <>
      <Navbar />

      <div className="App has-text-centered">
        <h1 className="tot">Typing Skill Test</h1>
        <h1 className="title">Test Your Typing Skills in a Minute</h1>

        {status === "finished" && (
          <div className="section">
            <div className="columns">
              <div className="column has-text-centered">
                <div className="card">
                  <div className="card-content">
                    <p className="is-size-5">Words per minute:</p>
                    <p className="has-text-primary is-size-1">{correct}</p>
                  </div>
                </div>
              </div>
              <div className="column has-text-centered">
                <div className="card">
                  <div className="card-content">
                    <p className="is-size-5">Timer:</p>
                    <p className="has-text-info is-size-1">{countDown}</p>
                  </div>
                </div>
              </div>
              <div className="column has-text-centered">
                <div className="card">
                  <div className="card-content">
                    <p className="is-size-5">Accuracy:</p>
                    <p className="has-text-primary is-size-1">
                      {correct !== 0 ? (
                        <p className="has-text-info is-size-1">
                          {Math.round((correct / (correct + incorrect)) * 100)}%
                        </p>
                      ) : (
                        <p className="has-text-info is-size-1">0</p>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {status !== "started" && (
          <div className="section">
            <div className="control is-expanded section">
              <div className="section take-test-container">
                <button className="button Startbutton" onClick={start}>
                  Take Test
                </button>
              </div>
            </div>
          </div>
        )}

        {status === "started" && (
          <div className="section">
            <div className="card">
              <div className="card-content">
                <div className="content">
                  {words.map((word, i) => (
                    <span key={i}>
                      <span>
                        {word.split("").map((char, idx) => (
                          <span
                            className={getCharClass(i, idx, char)}
                            key={idx}
                          >
                            {char}
                          </span>
                        ))}
                      </span>
                      <span> </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="control is-expanded section">
            <div className="control is-expanded section ">
        <input className = "ghl input" rows = "5" ref={textInput} disabled={status !== "started"} type="text"  onKeyDown={handleKeyDown} value={currInput} onChange={(e) => setCurrInput(e.target.value)}  />
      </div>
            </div>
            <div className="control has-text-centered">
              <div className="startcard">
                <div className="card-content">
                  <p className="is-size-5">Timer:</p>
                  <h2>{countDown}</h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
