import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook } from '@testing-library/react'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { routeEnum } from '../routes'
import { api } from '../util/api'
import { useAuth } from './useAuth'

// Mock dependencies
vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
    Navigate: vi.fn()
}))

vi.mock('@tanstack/react-query', async () => {
    const actual = await vi.importActual('@tanstack/react-query')
    return {
        ...actual,
        useMutation: vi.fn().mockImplementation(({ mutationFn, onSuccess }) => ({
            mutate: async (variables: any) => {
                const result = await mutationFn(variables)
                onSuccess?.(result)
            },
            isPending: false,
            error: undefined
        }))
    }
})

vi.mock('../util/api', () => ({
    api: {
        post: vi.fn()
    }
}))

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn()
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Wrapper for renderHook with QueryClient
const createWrapper = () => {
    const queryClient = new QueryClient()
    return ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

describe('useAuth', () => {
    const mockNavigate = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
        vi.mocked(useNavigate).mockReturnValue(mockNavigate)
    })

    it('should handle successful login', async () => {
        const mockToken = 'test-token'
        vi.mocked(api.post).mockResolvedValueOnce({ token: mockToken })

        const { result } = renderHook(() => useAuth(), {
            wrapper: createWrapper()
        })

        await act(async () => {
            result.current.login({ username: 'test', password: 'pass' })
        })

        // Check if API was called with correct credentials
        expect(api.post).toHaveBeenCalledWith('/auth/login', {
            username: 'test',
            password: 'pass'
        })

        // Verify token was stored
        expect(localStorageMock.setItem).toHaveBeenCalledWith('token', mockToken)

        // Check navigation
        expect(mockNavigate).toHaveBeenCalledWith(routeEnum.HOME)
    })

    it('should handle logout', () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper: createWrapper()
        })

        act(() => {
            result.current.logout()
        })

        // Verify token was removed
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('token')

        // Check navigation to login
        expect(mockNavigate).toHaveBeenCalledWith(routeEnum.LOGIN)
    })

    it('should check authentication status', () => {
        localStorageMock.getItem.mockReturnValueOnce('some-token')

        const { result } = renderHook(() => useAuth(), {
            wrapper: createWrapper()
        })

        expect(result.current.isAuthenticated).toBe(true)
        expect(localStorageMock.getItem).toHaveBeenCalledWith('token')
    })
}) 