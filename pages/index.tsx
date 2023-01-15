import { Box, Flex, Stack, Text } from '@chakra-ui/layout'
import { Image, Skeleton } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'
import GradientLayout from '../components/gradientLayout'
import prisma from '../lib/prisma'
import { useMe } from '../lib/hooks'

const Home = ({ artists }) => {
  const { user, isLoading } = useMe()
  /** TODO: Skeleton for data in loading state */
  if (isLoading) {
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    )
  }
  return (
    <GradientLayout
      color="gray"
      roundImage
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistCount} public playlists`}
      image="https://frontendmasters.github.io/fullstack-app-next-website/images/profile.png"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl">Top artists this month</Text>
          <Text fontSize="sm">Only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX="10px" width="20%" key={uuidv4()}>
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  src="https://placekitten.com/300/300"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})
  return {
    props: {
      artists,
    },
  }
}

export default Home
