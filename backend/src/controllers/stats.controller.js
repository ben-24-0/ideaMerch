import prisma from '../lib/prisma.js';

export async function getStats(req, res) {
  const [totalProducts, activeProducts, featuredProducts, outOfStock, categories, types] =
    await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { active: true } }),
      prisma.product.count({ where: { featured: true } }),
      prisma.product.count({ where: { stock: 0 } }),
      prisma.category.findMany({
        select: { name: true, _count: { select: { products: true } } },
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.productType.findMany({
        select: { name: true, _count: { select: { products: true } } },
        orderBy: { sortOrder: 'asc' },
      }),
    ]);

  res.json({
    totalProducts,
    activeProducts,
    inactiveProducts: totalProducts - activeProducts,
    featuredProducts,
    outOfStock,
    byCategory: categories.map((c) => ({ name: c.name, count: c._count.products })),
    byType: types.map((t) => ({ name: t.name, count: t._count.products })),
  });
}
