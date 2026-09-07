import prisma from '../lib/prisma.js';
import { slugify } from '../utils/slugify.js';

export async function listCategories(req, res) {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } });
  res.json(categories);
}

export async function createCategory(req, res) {
  const { name, active = true, sortOrder = 0 } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }

  const category = await prisma.category.create({
    data: { name, slug: slugify(name), active, sortOrder },
  });

  res.status(201).json(category);
}

export async function updateCategory(req, res) {
  const { id } = req.params;
  const { name, active, sortOrder } = req.body;

  const data = {};
  if (name !== undefined) {
    data.name = name;
    data.slug = slugify(name);
  }
  if (active !== undefined) data.active = active;
  if (sortOrder !== undefined) data.sortOrder = sortOrder;

  try {
    const category = await prisma.category.update({ where: { id }, data });
    res.json(category);
  } catch (err) {
    res.status(404).json({ error: 'Category not found' });
  }
}

export async function deleteCategory(req, res) {
  const { id } = req.params;

  const inUse = await prisma.product.count({ where: { categoryId: id } });
  if (inUse > 0) {
    return res.status(400).json({
      error: `Cannot delete: ${inUse} product(s) still use this category`,
    });
  }

  try {
    await prisma.category.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: 'Category not found' });
  }
}
