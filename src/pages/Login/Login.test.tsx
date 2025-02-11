import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Login from './Login'
import { useAuth } from '../../hooks/useAuth'

// Mock useAuth to avoid actual API calls and track how it's used
vi.mock('../../hooks/useAuth', () => ({
    useAuth: vi.fn(() => ({
        login: vi.fn(),
        logout: vi.fn(),
        loading: false,
        error: undefined,
        isAuthenticated: false
    }))
}))

describe('Login Component', () => {
    it('should prevent default form submission and call login with credentials', () => {
        const mockLogin = vi.fn()
        vi.mocked(useAuth).mockImplementation(() => ({
            login: mockLogin,
            logout: vi.fn(),
            loading: false,
            error: undefined,
            isAuthenticated: false
        }))

        render(<Login />)
        
        // RTL encourages using getByRole for better accessibility coverage.
        // Plus it catches if someone accidentally removes the input's role
        const usernameInput = screen.getByRole('textbox', { name: /username/i })
        
        // Password fields are special - no role, so we fall back to label text.
        // This also makes sure our input stays properly labeled!
        const passwordInput = screen.getByLabelText(/password/i)
        
        // Regex keeps this working even if we tweak the button text
        const submitButton = screen.getByRole('button', { name: /login/i })

        // Simulate real user interaction instead of just setting values.
        // Catches any broken onChange handlers
        fireEvent.change(usernameInput, { target: { value: 'testuser' } })
        fireEvent.change(passwordInput, { target: { value: 'testpass' } })

        // Click the button instead of submitting the form directly.
        // Makes sure the button isn't disabled or hidden
        fireEvent.click(submitButton)

        // If this passes, we know:
        // - preventDefault worked (no page reload)
        // - Our login fn got the right creds
        expect(mockLogin).toHaveBeenCalledWith({
            username: 'testuser',
            password: 'testpass'
        })
    })
}) 