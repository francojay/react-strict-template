import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Stack,
    Typography
} from '@mui/material'
import { type FC } from 'react'
import { type Product } from '../../types/Product'

interface ProductCardProps {
    product: Product
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    return (
        <Card>
            <Stack height="100%">
                <CardMedia
                    height={140}
                    component="img"
                    alt={product.title}
                    image={product.imageUrl}
                />
                <CardContent>
                    <Stack spacing={1}>
                        <Typography gutterBottom variant="subtitle1" component="h2">
                            {product.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                            paragraph
                        >
                            {product.description}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                            ${product.price.toFixed(2)}
                        </Typography>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Stack direction="row" spacing={1}>
                        <Button size="small" color="primary">
                            Add to Cart
                        </Button>
                        <Button size="small" color="primary">
                            View Details
                        </Button>
                    </Stack>
                </CardActions>
            </Stack>
        </Card>
    )
}

export default ProductCard
