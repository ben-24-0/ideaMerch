import prisma from '../lib/prisma.js';
import { slugify } from '../utils/slugify.js';

export async function listProducts(req, res) {
  console.time("PRODUCT QUERY");

  const { category, type, includeInactive } = req.query;

  const where = {};

  if (!includeInactive) where.active = true;
  if (category) where.category = { slug: category };
  if (type) where.type = { slug: type };

  console.time("PRISMA");

const products = await prisma.product.findMany({
  where,
  select: {
    id: true,
    slug: true,
    name: true,
    description: true,
    material: true,
    price: true,
    thumbnail: true,
    featured: true,
    active: true,
    available: true,
    stock: true,

    category: {
      select: {
        name: true,
        slug: true,
      },
    },

    type: {
      select: {
        name: true,
        slug: true,
      },
    },
  },
  orderBy: {
    createdAt: "desc",
  },
});

  console.timeEnd("PRISMA");
  console.timeEnd("PRODUCT QUERY");

  res.json(products);
}
export async function getProductBySlug(req, res) {
  const product = await prisma.product.findUnique({
    where: { slug: req.params.slug },
    include: { category: true, type: true },
  });

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
}


export async function getProductById(req, res) {
  const product = await prisma.product.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      category: true,
      type: true,
    },
  });

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  res.json(product);
}



export async function createProduct(req, res) {
  const {
    name,
    description,
    material,
    price,
    thumbnail,
    categoryId,
    typeId,
    featured = false,
    active = true,
    available = true,
    stock = 0,
  } = req.body;

  if (!name || !material || price === undefined || !categoryId || !typeId) {
    return res.status(400).json({
      error: 'name, material, price, categoryId and typeId are required',
    });
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        slug: slugify(name),
        description,
        material,
        price: Number(price),
        thumbnail,
        categoryId,
        typeId,
        featured,
        active,
        available,
        stock: Number(stock),
      },
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: 'Invalid categoryId or typeId' });
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const body = req.body;

  const data = {};
  const passthroughFields = [
    'description',
    'material',
    'thumbnail',
    'categoryId',
    'typeId',
    'featured',
    'active',
    'available',
  ];
  for (const field of passthroughFields) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  if (body.name !== undefined) {
    data.name = body.name;
    data.slug = slugify(body.name);
  }
  if (body.price !== undefined) data.price = Number(body.price);
  if (body.stock !== undefined) data.stock = Number(body.stock);

  try {
    const product = await prisma.product.update({ where: { id }, data });
    res.json(product);
  } catch (err) {
    res.status(404).json({ error: 'Product not found' });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: 'Product not found' });
  }
}
