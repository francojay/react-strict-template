// Log the environment variables to debug
console.log('Environment Variables:', {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    MODE: import.meta.env.MODE,
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
})

if (!import.meta.env.VITE_API_URL) {
    throw new Error('VITE_API_URL environment variable is not defined')
}

export const config = {
    apiUrl: import.meta.env.VITE_API_URL,
} as const; 