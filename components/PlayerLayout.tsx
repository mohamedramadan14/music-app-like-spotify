import { Box } from '@chakra-ui/layout'
import Sidebar from './SideBar'
import PlayerBar from './PlayerBar'

const PlayerLayout = ({ children }) => {
  return (
    <Box width="100vw" height="100vh">
      {/** SideBar */}
      <Box position="absolute" top="0" width="250px" left="0">
        <Sidebar />
      </Box>
      <Box marginLeft="250px" marginBottom="100px">
        <Box height="calc(100vh - 100px)">{children}</Box>
      </Box>
      <Box position="absolute" bottom="0" left="0">
        <PlayerBar />
      </Box>
    </Box>
  )
}

export default PlayerLayout
