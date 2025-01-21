import express from 'express';
import routes from './routes/index.js';


const app = express();
app.disable('x-powered-by');

app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        message: 'El sistema está funcionando correctamente',
    });
});

app.use('/api', routes);

app.use((req, res, next) => {
    console.log(`Ruta no encontrada: ${req.originalUrl} - Método: ${req.method}`);
    res.status(404).json({ message: `Ruta no encontrada: ${req.originalUrl}` });
});



export default app;
