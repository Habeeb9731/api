export const config = {
  api: {
    bodyParser: true, // enables JSON parsing for POST
  },
};

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight response
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Mock database
  const db = {
    apple: { carbs: 13.8, fat: 0.2, protein: 0.3 },
    paneer: { carbs: 1.2, fat: 20.8, protein: 18.3 },
    chickpeas: { carbs: 27.4, fat: 2.6, protein: 8.9 }
  };

  // GET nutrition info
  if (req.method === 'GET') {
    const { ingredient } = req.query;
    if (!ingredient) {
      return res.status(400).json({ message: 'Ingredient is required' });
    }

    const data = db[ingredient.toLowerCase()];
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: 'Ingredient not found' });
    }
  }

  // POST mock ingredient
  if (req.method === 'POST') {
    const { name, carbs, fat, protein } = req.body;

    if (!name || carbs == null || fat == null || protein == null) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Log it (just for fun, no real storage)
    console.log('Added ingredient:', { name, carbs, fat, protein });

    return res.status(201).json({
      message: 'Ingredient added (mock)',
      data: { name, carbs, fat, protein }
    });
  }

  // Method not allowed
  return res.status(405).json({ message: 'Method Not Allowed' });
}
