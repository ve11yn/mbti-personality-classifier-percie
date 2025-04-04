import './App.css'
import NavBar from './components/nav-bar/nav-bar'
import Prompt from './components/prompt/prompt'

function App() {

  return (
    <>
      <div>
      {/* create state, when prompt-field is not filled then show text. */}
      {/* when it is filled then hide text */}
    
        <NavBar />
        <Prompt />
      </div>
    </>
  )
}

export default App
