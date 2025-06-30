export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    const ingredient = req.query.ingredient;

    if (!ingredient) {
      return res.status(400).json({ error: 'Missing ingredient query parameter' });
    }

    // 🔧 Replace this with actual DB lookup if needed
    // For now, mock data
    return res.status(200).json({
      name: ingredient,
      carbs: 13.8,
      fat: 0.2,
      protein: 0.3
    });
  }

  if (method === 'POST') {
    const { name, carbs, fat, protein } = req.body;

    if (!name || carbs == null || fat == null || protein == null) {
      return res.status(400).json({ error: 'Missing required fields: name, carbs, fat, protein' });
    }

    // 🔧 You can connect this part to Supabase, Firebase, or a file/db
    // Right now it returns a mock "saved" response
    return res.status(200).json({
      message: 'Ingredient added (mock)',
      data: {
        name,
        carbs: parseFloat(carbs),
        fat: parseFloat(fat),
        protein: parseFloat(protein)
      }
    });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
