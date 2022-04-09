import React from 'react';
import Button from './components/Button/button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button>Hello</Button>
        <Button disabled>Disabled Button</Button>
        <Button btnType='primary' size='large'>Large Primary</Button>
        <Button btnType='danger' size='small'>Small Danger</Button>
        <Button btnType='link' href='http://www.baidu.com'>Baidu Link</Button>
        <Button btnType='link' disabled href='http://www.baidu.com'>Baidu Link</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
