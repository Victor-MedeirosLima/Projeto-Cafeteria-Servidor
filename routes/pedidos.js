// pedidos.routes.js
import express from 'express';
const router = express.Router();

export default (supabase) => {

  // Listar pedidos
  router.get('/', async (req, res) => {
    const { data, error } = await supabase
      .from('pedidos')
      .select(`
        *,
        usuarios (
          id,
          nome,
          email
        )
      `)
      .order('data_criacao', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  });

  // Buscar pedido por ID
  router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const { data, error } = await supabase
      .from('pedidos')
      .select(`
        *,
        usuarios (
          id,
          nome,
          email
        )
      `)
      .eq('id', id)
      .single();

    if (error) return res.status(404).json({ error: "Pedido não encontrado" });
    return res.json(data);
  });

  // Criar pedido
    router.post('/', async (req, res) => {
    const { usuario_id, produto, quantidade, total } = req.body;

    const { data, error } = await supabase
        .from('pedidos')
        .insert([{ usuario_id, produto, quantidade, total }])
        .select()
        .single();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
    });

  // Atualizar pedido
  router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const campos = req.body;

    // Se usuário quiser atualizar usuario_id
    if (campos.usuario_id && isNaN(Number(campos.usuario_id))) {
      return res.status(400).json({ error: "usuario_id deve ser numérico" });
    }

    const { data, error } = await supabase
      .from('pedidos')
      .update(campos)
      .eq('id', id)
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  });

  // Excluir pedido
  router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const { error } = await supabase
      .from('pedidos')
      .delete()
      .eq('id', id);

    if (error) return res.status(400).json({ error: error.message });

    return res.json({ message: "Pedido removido com sucesso" });
  });

  return router;
};
