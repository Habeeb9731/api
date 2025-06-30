import { createClient } from '@supabase/supabase-js';

// ✅ Supabase config using your anon key and project URL
const supabase = createClient(
  'https://jcjbpgsndupozastbqug.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjamJwZ3NuZHVwb3phc3RicXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTIxOTksImV4cCI6MjA2Njg2ODE5OX0.T-PQvG3WNfJonvgiqWzgV6rsggumRzQIT4A5ZVhJZ84'
);

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  // Allow cross-origin requests (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET /api/ingredients?ingredient=banana
  if (req.method === 'GET') {
    const { ingredient } = req.query;

    if (!ingredient) {
      return res.status(400).json({ message: 'Ingredient query param is required' });
    }

    const { data, error } = await supabase
      .from('ingredients')
      .select('*')
      .eq('name', ingredient.toLowerCase())
      .single();

    if (error) {
      return res.status(404).json({ message: 'Ingredient not found', error });
    }

    return res.status(200).json(data);
  }

  // POST /api/ingredients (with JSON body)
  if (req.method === 'POST') {
    const { name, carbs, fat, protein } = req.body;

    if (!name || carbs == null || fat == null || protein == null) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('ingredients')
      .insert([{ name: name.toLowerCase(), carbs, fat, protein }]);

    if (error) {
      return res.status(400).json({ message: 'Insert failed', error });
    }

    return res.status(201).json({ message: 'Ingredient added', data });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
