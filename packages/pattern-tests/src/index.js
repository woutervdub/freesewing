import configTests from './tests/config'
import draftTests from './tests/draft'

const allTests = (pattern, pkg) => {
  configTests(pattern, pkg)
  draftTests(pattern, pkg)
}

export { configTests, draftTests, allTests }
