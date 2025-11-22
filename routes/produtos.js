// produtos.routes.js
import express from 'express';
const router = express.Router();

export default (supabase) => {

  // Listar todos os produtos
  router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('produtos').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  });

  // Obter um produto por ID
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('produtos').select('*').eq('id', id).single();
    if (!data) return res.status(404).json({ error: 'Produto não encontrado' });
    return res.json(data);
  });

  // Criar produto
  router.post('/', async (req, res) => {
    const { nome, descricao, preco, disponivel } = req.body;
    const { data, error } = await supabase.from('produtos').insert([
      { nome, descricao, preco, disponivel }
    ]).select().single();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  });

  // Atualizar produto
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    const { data, error } = await supabase.from('produtos').update(campos).eq('id', id).select().single();
    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  });

  // Excluir produto
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('produtos').delete().eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    return res.json({ message: 'Produto removido com sucesso' });
  });

  return router;
};
