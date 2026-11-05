import request from './client.js';

const inFlightRequests = new Map();
const productCache = new Map();
const PRODUCT_CACHE_TTL = 30_000;

function normalizeProduct(p) {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description,
    category: p.category?.name,
    type: p.type?.name,
    material: p.material,
    price: p.price,
    image: p.thumbnail,
    tags: [], // backend has no tags field yet — see note below
    featured: p.featured,
    active: p.active,
    available: p.available,
    stock: p.stock,
  };
}

export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const path = `/products${query ? `?${query}` : ''}`;
  const cached = productCache.get(path);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.products;
  }

  if (!inFlightRequests.has(path)) {
    const requestPromise = request(path)
      .then((products) => {
        const normalizedProducts = products.map(normalizeProduct);
        productCache.set(path, {
          products: normalizedProducts,
          expiresAt: Date.now() + PRODUCT_CACHE_TTL,
        });
        return normalizedProducts;
      })
      .finally(() => inFlightRequests.delete(path));
    inFlightRequests.set(path, requestPromise);
  }

  return inFlightRequests.get(path);
}

export function getProductBySlug(slug) {
  return request(`/products/${slug}`);
}

export function getCategories() {
  return request('/categories');
}

export function getProductTypes() {
  return request('/product-types');
}

export function createProduct(data) {
  return request('/products', { method: 'POST', body: JSON.stringify(data) });
}

export function updateProduct(id, data) {
  return request(`/products/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export function deleteProduct(id) {
  return request(`/products/${id}`, { method: 'DELETE' });
}

export function getProductById(id) {
  return request(`/products/admin/${id}`);
}