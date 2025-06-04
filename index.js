import fetch from 'node-fetch';

const [,, method, resource, ...args] = process.argv;
const BASE_URL = 'https://fakestoreapi.com';

async function main() {
  if (method === 'GET') {
    if (!resource.startsWith('products')) {
      console.error('Solo se permite acceso al recurso "products".');
      process.exit(1);
    }

    try {
      const response = await fetch(`${BASE_URL}/${resource}`);
      const data = await response.json();
      console.log(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error al obtener productos:', error.message);
    }
  }

  else if (method === 'POST') {
    if (resource !== 'products') {
      console.error('Solo se puede crear productos en el recurso "products".');
      process.exit(1);
    }

    const [title, price, category] = args;

    if (!title || !price || !category) {
      console.error('Faltan argumentos. Usá: npm run start POST products <title> <price> <category>');
      process.exit(1);
    }

    const product = {
      title,
      price: parseFloat(price),
      category
    };

    try {
      const response = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });

      const data = await response.json();
      console.log('Producto creado:');
      console.log(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error al crear producto:', error.message);
    }
  }

  else if (method === 'DELETE') {
    // Para DELETE esperamos resource tipo "products/7"
    if (!resource.startsWith('products/')) {
      console.error('Para eliminar un producto, usá: DELETE products/<productId>');
      process.exit(1);
    }

    try {
      const response = await fetch(`${BASE_URL}/${resource}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Producto eliminado:');
        console.log(JSON.stringify(data, null, 2));
      } else {
        console.error(`Error eliminando producto: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error.message);
    }
  }

  else {
    console.error(`Método no soportado: ${method}. Usá GET, POST o DELETE.`);
  }
}

main();
