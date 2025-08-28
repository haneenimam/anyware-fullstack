import './db';
import app from './app';

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
