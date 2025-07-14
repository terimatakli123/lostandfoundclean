let items = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { photoUrl, description, location } = req.body;
    if (!photoUrl || !description || !location) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const newItem = { photoUrl, description, location };
    items.unshift(newItem);
    res.status(201).json({ message: 'Reported successfully', item: newItem });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
