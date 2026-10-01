import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  const [products, setProducts] = React.useState([]);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/products')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load products');
        return response.json();
      })
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <header>
        <h1>CloudShop</h1>
        <p>A Java, React and PostgreSQL deployment project</p>
      </header>

      <h2>Our Products</h2>

      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      <section className="products">
        {products.map((product) => (
          <article className="product" key={product.id}>
            <h3>{product.name}</h3>
            <p>NPR {Number(product.price).toLocaleString('en-NP')}</p>
            <button type="button" onClick={() =>
              alert(`${product.name} selected`)
            }>
              View product
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
