import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Importar rotas
import usuariosRoutes from './routes/usuarios.js';
import produtosRoutes from './routes/produtos.js';
import pedidosRoutes from './routes/pedidos.js';

dotenv.config();

const app = express();

// Conectar ao Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(express.json());

// Rotas
app.use('/usuarios', usuariosRoutes(supabase));
app.use('/produtos', produtosRoutes(supabase));
app.use('/pedidos', pedidosRoutes(supabase));

app.listen(process.env.port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${process.env.port}`);
});
