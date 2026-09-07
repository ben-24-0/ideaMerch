import prisma from '../lib/prisma.js';
import { slugify } from '../utils/slugify.js';

export async function listTypes(req, res) {
  const types = await prisma.productType.findMany({ orderBy: { sortOrder: 'asc' } });
  res.json(types);
}

export async function createType(req, res) {
  const { name, active = true, sortOrder = 0 } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }

  const type = await prisma.productType.create({
    data: { name, slug: slugify(name), active, sortOrder },
  });

  res.status(201).json(type);
}

export async function updateType(req, res) {
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
    const type = await prisma.productType.update({ where: { id }, data });
    res.json(type);
  } catch (err) {
    res.status(404).json({ error: 'Product type not found' });
  }
}

export async function deleteType(req, res) {
  const { id } = req.params;

  const inUse = await prisma.product.count({ where: { typeId: id } });
  if (inUse > 0) {
    return res.status(400).json({
      error: `Cannot delete: ${inUse} product(s) still use this type`,
    });
  }

  try {
    await prisma.productType.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: 'Product type not found' });
  }
}
