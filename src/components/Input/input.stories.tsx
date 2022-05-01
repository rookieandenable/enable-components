import { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { useState } from '@storybook/addons'
import { Input } from './input'
import Icon from '../Icon/icon'

const defaultInput = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState<string>('')
  return (
    <Fragment>
      <Input onChange={action('change')} placeholder='placeholder' />
      <Input disabled placeholder='disabled' />
      <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder='mvvm' />
    </Fragment>
  )
}

const sizeInput = () => (
  <Fragment>
    <Input size='lg' placeholder='large' />
    <Input size='sm' placeholder='small' />
  </Fragment>
)

const iconInput = () => (
  <Fragment>
    <Input icon={'user'} placeholder='user icon' />
    <Input icon={'file'} placeholder='user file' />
  </Fragment>
)

const preOrApInput = () => (
  <Fragment>
    <Input append={'.com'} placeholder='input url' />
    <Input append={<Icon icon={'search'} />} placeholder='input content' />
    <Input prepend={'https://'} placeholder='input url' />
    <Input prepend={<Icon icon={'icons'} />} placeholder='input content' />
  </Fragment>
)

storiesOf('Input 输入框', module)
  .add('Input', defaultInput)
  .add('不同尺寸的 Input', sizeInput)
  .add('icon Input', iconInput)
  .add('前后缀 Input', preOrApInput)