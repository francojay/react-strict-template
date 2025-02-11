import { config } from '../config'

if (!config.apiUrl) {
    throw new Error('API URL is not configured. Please check your environment variables.')
}

export const api = {
    async post<T>(endpoint: string, data: unknown): Promise<T> {
        // Ensure endpoint starts with a forward slash and trim any trailing spaces
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`.trim()
        
        // Remove any trailing slashes from the API URL
        const baseUrl = config.apiUrl.toString().replace(/\/+$/, '')
        
        const response = await fetch(`${baseUrl}${cleanEndpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        const responseData = await response.json()
        if (!response.ok) throw new Error(responseData.error)
        return responseData
    }
}