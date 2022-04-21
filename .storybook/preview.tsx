import { CSSProperties } from 'react'
import '../src/styles/index.scss'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const styles: CSSProperties = {
  textAlign: 'center'
}

export const decorations = [
  (Story) => {
    <div style={styles}>
      { Story() }
    </div>
  }
]