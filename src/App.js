import { useState } from 'react';
import './App.scss';
import Hero from './components/Hero';

function App() {
    const [ count, setCount ] = useState(0);

    // useCallback vs useMeno
    const handleHeroClick = () => { }

    return (
        <div className="app">
            <h1>React hooks - PostList</h1>

            <p>{count}</p>
            <button onClick={() => setCount(count+1)}>Increase</button>

            <Hero name="Easy Frontend" onClick={handleHeroClick}/>
        </div>
    );
}

export default App;
