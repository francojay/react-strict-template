import {
    Box,
    Button,
    Stack,
    Typography
} from '@mui/material'
import { useAuth } from '../hooks/useAuth'

const Header = () => {
    const { logout } = useAuth()

    return (
        <Stack
            p={3}
            top={0}
            zIndex={1100}
            borderBottom={1}
            position="sticky"
            borderColor="divider"
            justifyContent="space-between"
            alignItems="center"
            bgcolor="background.default"
            direction="row"
        >
            <Typography variant="h6">
                My Store
            </Typography>
            <Box>
                <Button variant="contained" onClick={logout}>
                    <Typography variant="body1">
                        Logout
                    </Typography>
                </Button>
            </Box>
        </Stack>
    )
}

export default Header
