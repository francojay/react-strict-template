import { Box, CircularProgress } from '@mui/material'
import { type FC } from 'react'

const LoadingScreen: FC = () => (
    <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        minWidth="100vw"
    >
        <CircularProgress />
    </Box>
)

export default LoadingScreen 