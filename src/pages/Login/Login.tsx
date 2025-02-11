import { Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

const Login = () => {
    const { login, loading, error } = useAuth()
    const [username, setUsername] = useState('testuser')
    const [password, setPassword] = useState('password123')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        login({ username, password })
    }

    return (
        <Stack
            spacing={2}
            width="100%"
            component="form"
            alignItems="center"
            justifyContent="center"
            onSubmit={handleSubmit}
        >
            <Typography variant="h3">Login</Typography>
            {error && (
                <Typography color="error">{error}</Typography>
            )}
            <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button
                variant="contained"
                type="submit"
                disabled={loading}
            >
                <Typography variant="h6">
                    {loading ? 'Logging in...' : 'Login'}
                </Typography>
            </Button>
        </Stack>
    )
}

export default Login