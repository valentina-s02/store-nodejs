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

  else {
    console.error(`Método no soportado: ${method}. Usá GET o POST.`);
  }
}

main();