const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createOrderItem(req, res) {
  const { orderId, nomeProduto, qtd, preco } = req.body;
  try {
    const item = await prisma.orderItem.create({
      data: { orderId, nomeProduto, qtd, preco }
    });
    res.json(item);
  } catch (err) {
    console.error("Erro ao criar item:", err);
    res.status(500).json({ error: "Erro ao criar item" });
  }
}

async function getOrderItems(req, res) {
  const { orderId } = req.query;
  try {
    const items = await prisma.orderItem.findMany({
      where: orderId ? { orderId: Number(orderId) } : {}
    });
    res.json(items);
  } catch (err) {
    console.error("Erro ao buscar itens:", err);
    res.status(500).json({ error: "Erro ao buscar itens" });
  }
}

async function updateOrderItem(req, res) {
  const { id } = req.params;
  const { nomeProduto, qtd, preco } = req.body;
  try {
    const item = await prisma.orderItem.update({
      where: { id: Number(id) },
      data: { nomeProduto, qtd, preco }
    });
    res.json(item);
  } catch (err) {
    console.error("Erro ao atualizar item:", err);
    res.status(500).json({ error: "Erro ao atualizar item" });
  }
}

async function deleteOrderItem(req, res) {
  const { id } = req.params;
  try {
    await prisma.orderItem.delete({ where: { id: Number(id) } });
    res.json({ message: "Item removido com sucesso" });
  } catch (err) {
    console.error("Erro ao deletar item:", err);
    res.status(500).json({ error: "Erro ao deletar item" });
  }
}

module.exports = {
  createOrderItem,
  getOrderItems,
  updateOrderItem,
  deleteOrderItem
};