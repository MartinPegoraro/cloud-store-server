import express from 'express';
import productRoutes from '../components/product/network.js';

const router = express.Router();

router.use('/product', productRoutes);

export default router;