import React, { useState } from 'react'
import "./App.css"
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './Character'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Fail, SUCCESS } from './message';

const App = () => {
  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(26)
  const [includeUpperCase, setIncludeUpperCase] = useState(false)
  const [includeLowerCase, setIncludeLowerCase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const handleGeneratePassword = () => {
    if (!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbols) {
      notify("At least one checkbox must be selected in order to generate a password.", true)
    }
    else {
      let characterList = ""
      if (includeUpperCase) {
        characterList = characterList + upperCaseLetters
      }
      if (includeNumbers) {
        characterList = characterList + numbers
      }
      
      if (includeSymbols) {
        characterList = characterList + specialCharacters
      }
      if (includeLowerCase) {
        characterList = characterList + lowerCaseLetters
      }
      setPassword(createPassword(characterList))
      notify("Successfully Created a Password", false)
    }


  }
  const createPassword = (characterList) => {
    let password = ""
    const characterListLength = characterList.length
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }
  const copyToClipboard = (password) => {

    navigator.clipboard.writeText(password)
  }
  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        hideProgressBar: true,
        color:CanvasGradient,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast(message, {
        position: "top-center",
        hideProgressBar: true,
        color:CanvasGradient,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }

  }
  const handleCopyPassword = (e) => {
    if (password === "") {
      notify(Fail, true)
    }
    else {
      copyToClipboard(password)
      notify(SUCCESS)
    }

  }

  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator__header">
           Password Generator
          </h2>
          <div className="generator__password">
            <h3 >{password}</h3>
            <button className="copy__btn">
              <i onClick={handleCopyPassword} className="far fa-clipboard"></i>
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="password-strength">Password length</label>
            <input className="" defaultValue={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} type="number" id="password-stregth" name="password-strength" max="26" min="8" />
          </div>
          <div className="form-group">
            <label htmlFor="include-symbols">SpecalCharacters</label>
            <input checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} type="checkbox" id="include-symbols" name="include-symbols" />
          </div>

          <div className="form-group">
            <label htmlFor="include-numbers">Numbers</label>
            <input checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} type="checkbox" id="include-numbers" name="include-numbers" />
          </div>

          <div className="form-group">
            <label htmlFor="uppercase-letters">Uppercase Letters</label>
            <input checked={includeUpperCase} onChange={(e) => setIncludeUpperCase(e.target.checked)} type="checkbox" id="uppercase-letters" name="uppercase-letters" />
          </div>
          <div className="form-group">
            <label htmlFor="lowercase-letters">Lowercase Letters</label>
            <input checked={includeLowerCase} onChange={(e) => setIncludeLowerCase(e.target.checked)} type="checkbox" id="lowercase-letters" name="lowercase-letters" />
          </div>
         
          
          <button onClick={handleGeneratePassword} className="generator__btn">
            Generate Password
          </button>
          <ToastContainer
            position="center"
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  )
}

export default App