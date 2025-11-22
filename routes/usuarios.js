// usuarios.js
import express from 'express';
const router = express.Router();

export default (supabase) => {

  // Listar usuários
  router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('usuarios').select('*');

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  });

  // Buscar usuário por ID (AGORA ID É NÚMERO)
  router.get('/:id', async (req, res) => {
    const id = Number(req.params.id); 
    const { data, error } = await supabase.from('usuarios').select('*').eq('id', id).single();

    if (error || !data) return res.status(404).json({ error: 'Usuário não encontrado' });
    return res.json(data);
  });

  // Criar usuário
  router.post('/', async (req, res) => {
    const { nome, email, senha } = req.body;

    const { data, error } = await supabase
      .from('usuarios')
      .insert([{ nome, email, senha }])
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  });

  // Atualizar usuário
  router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const campos = req.body;

    const { data, error } = await supabase
      .from('usuarios')
      .update(campos)
      .eq('id', id)
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  });

  // Excluir usuário
  router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);

    const { error } = await supabase
      .from('usuarios')
      .delete()
      .eq('id', id);

    if (error) return res.status(400).json({ error: error.message });

    return res.json({ message: 'Usuário removido com sucesso' });
  });

  return router;
};
