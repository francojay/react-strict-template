import {
    Container,
    Grid,
    Stack
} from '@mui/material'
import { type FC } from 'react'
import ProductCard from '../../components/ProductCard/ProductCard'
import Header from '../../layout/Header'
import { products } from '../../mocks/MockProducts'

const Home: FC = () => {
    return (
        <Stack>
            <Header />
            <Container maxWidth="xl" sx={{ py: 2 }}>
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <Grid
                            item
                            key={product.id}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                        >
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Stack>
    )
}

export default Home
