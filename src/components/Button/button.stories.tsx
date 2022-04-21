import React, { Fragment } from "react"
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './button'

const defaultButton = () => (
  <Button onClick={ action('click') }> default button </Button>
)

const buttonWithSize = () => (
  <Fragment>
    <Button size="lg"> large button </Button>
    <Button size="sm"> small button </Button>
  </Fragment>
)

const buttonWithType = () => (
  <Fragment>
    <Button btnType="primary"> primary button </Button>
    <Button btnType="danger"> danger button </Button>
    <Button btnType="link" href="https://cn.bing.com"> link button </Button>
  </Fragment>
)

storiesOf('按钮 button', module)
  .add('默认 Button', defaultButton)
  .add('不同尺寸的 Button', buttonWithSize)
  .add('不同样式的 Button', buttonWithType)