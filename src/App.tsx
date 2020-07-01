import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from './components/Hello'
import MouseTracker from './components/MouseTracker'
import useMousePosition from './hooks/useMousePosition'
import LikeButton from './components/LikeButton'
import useURLLoader from './hooks/useURLLoader'

interface IShowResult {
    message: string;
    status: string;
}
interface IThemeProps{
    [key: string]: {color: string; background: string;}
}
const themes: IThemeProps = {
    'light': {
        color: '#000',
        background: '#eee'
    },
    'dark': {
        color: '#fff',
        background: '#222',
    }
};
export const ThemeContext = React.createContext(themes.light);

function App() {
    const [show, setShow] = useState(true);
    const positions = useMousePosition();
    const [data, loading] = useURLLoader(
        'https://dog.ceo/api/breeds/image/random', [show]);
    const dogResult = data as IShowResult;  // 将data转换成IShowResult类型的变量

  return (
    <div className="App">
        <ThemeContext.Provider value={themes.dark}>
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  <button onClick={() => {setShow(!show)}}>Refresh dog photo</button>
                </p>
                  { loading ? <p>"狗狗读取中"</p>
                  : <img src={dogResult && dogResult.message} />}
                  {/* 此处show类似一个开关的作用 */}
                  { show && <MouseTracker/>}
                  <p>X: {positions.x}, Y: {positions.y}</p>
                <LikeButton />
                {/*<MouseTracker/>*/}
                <Hello/>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
        </ThemeContext.Provider>
    </div>
  );
}

export default App;
