import { useState, useEffect } from 'react'
import logo from '../assets/images/logo.svg'
import learnosity from '../assets/images/learnosity.svg'
import react_logo from '../assets/images/reactjs.svg'
import '../style/App.css'

const Home = () => {

  const [homeMessage, setHomeMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    if (!homeMessage) {

      setLoading(true)

      const callBackendAPI = async () => {

        const response = await fetch('/welcome');
        const body = await response.json();

        if (response.status !== 200) {

          throw Error(body.message);

        }
        setHomeMessage(body.message);
        setLoading(false);
      }

      callBackendAPI().catch(console.error);
      setLoading(false);

    }

  }, [homeMessage]);

  return (
    <>
      {loading ? (
        <div> ....Loading </div>
      ) : (
        <div className="app">
          <header className="app-header">
            <a 
              className="app-link" 
              href="/assess" 
              rel="noopener noreferrer"
            >
              <img src={logo} className="app-logo" alt="learnosity logo" />
            </a>
            <a
              className="app-link"
              href="https://learnosity.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={learnosity} className="app-name" alt="learnosity" />
            </a>
            <div className="react-logo-container">using 
              <img src={react_logo} className="react-logo" alt="react logo" />
            </div>
          </header>
          <a 
            className="app-link" 
            href="/assess" 
            rel="noopener noreferrer"
          >
            <div className="message-container">
              <div className="a-message-for-you">
                <p className="the-message"> {homeMessage} </p>
              </div>
            </div>
          </a>
        </div>
      )}
    </>
  )
}

export default Home
