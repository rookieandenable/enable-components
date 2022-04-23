import { Fragment } from "react"
import { storiesOf } from '@storybook/react'

storiesOf('welcome to use enable-components', module)
  .add('welcome 😂😂😂', () => {
    return (
      <Fragment>
        <h1>欢迎👏👏👏，来到 enable-components 组件库</h1>
      </Fragment>
    )
  }, { info: { disable: true } })