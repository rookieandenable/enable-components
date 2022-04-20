import React, { FC, useState } from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Transition from './components/Transition/transition';

library.add(fas)

const App: FC = () => {
  const [show, setShow] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <Menu>
          <MenuItem>default</MenuItem>
          <MenuItem disabled>disabled</MenuItem>
          <MenuItem>active</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>drop1</MenuItem>
            <MenuItem>drop2</MenuItem>
          </SubMenu>
        </Menu>
        <Button onClick={() => { setShow(!show) }}>Hello</Button>
        <Button disabled>Disabled Button</Button>
        <Button btnType='primary' size='lg'>Large Primary</Button>
        <Button btnType='danger' size='sm'>Small Danger</Button>
        <Button btnType='link' href='http://www.baidu.com'>Baidu Link</Button>
        <Button btnType='link' disabled href='http://www.baidu.com'>Baidu Link</Button>
        <Transition
          in={show}
          timeout={300}
          animation='zoom-in-top'
        >
          <div>
            <p><code>11111fjafjejgvjfjs</code></p>
            <p><code>11111fjafjejgvjfjs</code></p>
            <p><code>11111fjafjejgvjfjs</code></p>
            <p><code>11111fjafjejgvjfjs</code></p>
            <p><code>11111fjafjejgvjfjs</code></p>
            <p><code>11111fjafjejgvjfjs</code></p>
          </div>
        </Transition>
        <Transition
          in={show}
          timeout={300}
          animation='zoom-in-top'
        >
          <div>
            <Button btnType='primary' size='lg'>Large Primary</Button>
          </div>
        </Transition>
      </header>
    </div>
  );
}

export default App;
