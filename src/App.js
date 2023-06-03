import { useState, useEffect } from "react";
import './input.css';
import randomWords from 'random-words'
const WORDS = 200

const STIME = 10

function App() {
  const[words, setWords] = useState([])
  const[countDown, setCountDown] = useState(STIME)

  useEffect(()=>{
    setWords(generateWords())
  }, [])

  function generateWords() {
    return new Array(WORDS).fill(null).map(()=> randomWords())


  }
  function start() {
   let interval = setInterval(()=>{
      setCountDown((prevCountDown) => {
        if(prevCountDown===0){
          clearInterval(interval)
        } else{
          return prevCountDown - 1

        }
        

      } )

    }, 1000)
  }

  function handleKeyDown(event){
    console.log(event.key)
  }



  return (
    <div className="App">
      <div className="section">
        <div className="is-size-1 has-text-centered has-text-primary">
          <h2>{countDown}</h2>

        </div>

      <div className="card">
        <div className="card-content">
        
          <div className="content">
  
            {words.map((word, i)=>(
              <>
              <span key ={i}>
                {word.split("").map((char, idx) =>(
                  <span key={idx}>{char}</span>

                ))}
              </span>
              <span> </span>

              </>

         

            ))}

            <div className="control is-expanded section">

      <label class = "col-form-label col-form-label-lg" ></label>

      <input id = "input-typing" type = "text" className="input"onKeyDown={handleKeyDown} autoCorrect="off" autoCapitalize="none"
      placeholder="Re-type if failed, press <TAB> or <ESC> to resest" 
      spellCheck = "false" class="form-control form-control-lg" >
      </input>
    </div>

    

    <div className="section">
    <button className="button is-info is-fullwidth" onClick={start}>
      Next
    </button>
    </div>

    <div class= "center stats mt-auto">
      <h4>WPM:33</h4>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <h4>Accuracy:100%</h4>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <h4>Average WPM:0</h4>
    </div>
            
            </div>
        </div>
        </div>


      </div>
    </div>
            

  );
}

export default App;
