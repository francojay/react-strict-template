import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Home from './Home'
import { MemoryRouter } from 'react-router-dom'

// Mock useAuth hook
vi.mock('../../hooks/useAuth', () => ({
    useAuth: vi.fn(() => ({
        login: vi.fn(),
        logout: vi.fn(),
        loading: false,
        error: undefined,
        isAuthenticated: true  // Important: set to true for Home page
    }))
}))

// Mock the Header component since we're just testing the Home page's content
vi.mock('../../layout/Header', () => ({
    default: () => <div data-testid="mock-header">Header</div>
}))

// Mock the ProductCard component to make testing easier
vi.mock('../../components/ProductCard/ProductCard', () => ({
    default: ({ product }: { product: { name: string } }) => (
        <div data-testid="product-card">{product.name}</div>
    )
}))

// Mock the products data
vi.mock('../../mocks/MockProducts', () => ({
    products: [
        { id: 1, name: 'Test Product 1' },
        { id: 2, name: 'Test Product 2' },
        { id: 3, name: 'Test Product 3' }
    ]
}))

describe('Home Component', () => {
    it('should render all products in a grid', () => {
        // Wrap with MemoryRouter for routing context
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )
        
        // Check if header is rendered
        expect(screen.getByTestId('mock-header')).toBeInTheDocument()
        
        // Verify all product cards are rendered
        const productCards = screen.getAllByTestId('product-card')
        expect(productCards).toHaveLength(3)
        
        // Check if product names are displayed
        expect(screen.getByText('Test Product 1')).toBeInTheDocument()
        expect(screen.getByText('Test Product 2')).toBeInTheDocument()
        expect(screen.getByText('Test Product 3')).toBeInTheDocument()
    })
}) 