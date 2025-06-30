export default function handler(req, res) {
  // ✅ Allow all origins (or restrict to your frontend URL if needed)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Handle preflight request (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // your existing logic...
  if (req.method === 'GET') {
    const { ingredient } = req.query;

    const db = {
      apple: { carbs: 13.8, fat: 0.2, protein: 0.3 },
      paneer: { carbs: 1.2, fat: 20.8, protein: 18.3 },
      chickpeas: { carbs: 27.4, fat: 2.6, protein: 8.9 }
    };

    if (db[ingredient]) {
      res.status(200).json(db[ingredient]);
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
    }
  }

  else if (req.method === 'POST') {
    res.status(201).json({ message: 'Ingredient added (mock)' });
  }

  else {
    res.status(405).end();
  }
}
