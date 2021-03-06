import { CSSProperties } from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '../src/styles/index.scss'

library.add(fas)

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
  // padding: '20px 40px'
}

const decorations = (Story: any) => (
  <div style={styles}>
    {/* <h3>组件演示</h3> */}
    { Story() }
  </div>
)

addDecorator(decorations)

// export default {
//   title: 'Component',
//   decorators: [withInfo],
// }

addParameters({info: { inline: true, header: false}})

const loaderFn = () => {
  // 第一个先引入welcome页面
  const allExports = [require('../src/welcome.stories.tsx')];
  const req = require.context('../src/components', true, /\.stories\.tsx$/);
  req.keys().forEach(fName => allExports.push(req(fName)));
  return allExports;
};


// automatically import all files ending in *.stories.tsx
configure(loaderFn, module);