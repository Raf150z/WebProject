const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// URLs de las APIs
const LARAVEL_API = 'http://localhost:8000/api';
const CODEIGNITER_API = 'http://localhost:8081/api';

// Ruta de salud
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'Node.js Gateway',
        timestamp: new Date().toISOString()
    });
});

// Obtener datos combinados de ambas APIs
app.get('/api/combined-data', async (req, res) => {
    try {
        const [productsResponse, customersResponse] = await Promise.all([
            axios.get(`${LARAVEL_API}/products`),
            axios.get(`${CODEIGNITER_API}/customers`)
        ]);

        res.json({
            success: true,
            data: {
                products: productsResponse.data.data,
                customers: customersResponse.data.data,
                summary: {
                    total_products: productsResponse.data.data.length,
                    total_customers: customersResponse.data.data.length,
                    timestamp: new Date().toISOString()
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error al obtener datos combinados'
        });
    }
});

// Endpoint de estadísticas
app.get('/api/stats', async (req, res) => {
    try {
        const products = await axios.get(`${LARAVEL_API}/products`);
        const customers = await axios.get(`${CODEIGNITER_API}/customers`);

        const totalValue = products.data.data.reduce((sum, product) => {
            return sum + (product.price * product.stock);
        }, 0);

        res.json({
            success: true,
            data: {
                total_products: products.data.data.length,
                total_customers: customers.data.data.length,
                total_inventory_value: totalValue,
                avg_price: products.data.data.length > 0
                    ? totalValue / products.data.data.length
                    : 0
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Proxy para Laravel API
app.use('/api/laravel', async (req, res) => {
    try {
        const targetUrl = req.originalUrl.replace('/api/laravel', LARAVEL_API);

        const response = await axios({
            method: req.method,
            url: targetUrl,
            data: req.body,
            headers: { 'Content-Type': 'application/json' }
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            success: false,
            error: error.message
        });
    }
});

// Proxy para CodeIgniter API
app.use('/api/codeigniter', async (req, res) => {
    try {
        const targetUrl = req.originalUrl.replace('/api/codeigniter', CODEIGNITER_API);

        const response = await axios({
            method: req.method,
            url: targetUrl,
            data: req.body,
            headers: { 'Content-Type': 'application/json' }
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            success: false,
            error: error.message
        });
    }
});


// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Node.js Gateway running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🔗 Combined data: http://localhost:${PORT}/api/combined-data`);
});
