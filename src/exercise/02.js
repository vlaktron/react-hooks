// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStoreState(key, defaultValue = '') {
  const getInitialState = () => {
    switch(typeof(defaultValue)) {
      case 'string':
        String(window.localStorage.getItem(key) ?? defaultValue)
        break
      case 'int':
        Number(window.localStorage.getItem(key) ?? defaultValue)
        break
      case 'obj':
        JSON.parse(window.localStorage.getItem(key) ?? JSON.stringify(defaultValue))
        break
      default:
        throw new Error(`Unable to parse type of: ${typeof(defaultValue)}`)
    }
    
  }
  const [state, setState] = React.useState(getInitialState)
  React.useEffect( () => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStoreState('name', initialName)
  

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName={10.1} />
}

export default App
