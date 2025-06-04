import fetch from 'node-fetch';

const [,, method, resource] = process.argv;

const BASE_URL = 'https://fakestoreapi.com';

async function main() {
  if (method !== 'GET') {
    console.error('Método no soportado. Solo se permite GET.');
    process.exit(1);
  }

  if (!resource.startsWith('products')) {
    console.error('Solo se permite acceso al recurso "products".');
    process.exit(1);
  }

  try {
    const response = await fetch(`${BASE_URL}/${resource}`);
    if (!response.ok) {
      throw new Error(`Error al hacer la solicitud: ${response.status}`);
    }

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2)); // Mostrar bien formateado
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
  }
}

main();
