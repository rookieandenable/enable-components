import { Fragment } from "react"
import { storiesOf } from '@storybook/react'

storiesOf('welcome to use enable-components', module)
  .add('welcome πππ', () => {
    return (
      <Fragment>
        <h1>ζ¬’θΏππποΌζ₯ε° enable-components η»δ»ΆεΊ</h1>
      </Fragment>
    )
  }, { info: { disable: true } })