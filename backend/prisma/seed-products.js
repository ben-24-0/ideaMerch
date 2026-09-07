import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const sampleProducts = [
  {
    name: 'Naruto Keychain',
    description: 'Laser-cut acrylic keychain, Naruto design.',
    material: 'Acrylic',
    price: 149,
    thumbnail: 'https://placehold.co/400x400',
    categorySlug: 'anime',
    typeSlug: 'keychains',
    featured: true,
    stock: 20,
  },
  {
    name: 'Cat Face Keychain',
    description: 'Minimal engraved cat keychain.',
    material: 'Acrylic',
    price: 129,
    thumbnail: 'https://placehold.co/400x400',
    categorySlug: 'cute',
    typeSlug: 'keychains',
    featured: true,
    stock: 30,
  },
  {
    name: 'Diwali Name Plate',
    description: 'Personalized engraved name plate, festive design.',
    material: 'MDF Wood',
    price: 399,
    thumbnail: 'https://placehold.co/400x400',
    categorySlug: 'festivals',
    typeSlug: 'name-plates',
    featured: false,
    stock: 10,
  },
  {
    name: 'Custom Photo Frame',
    description: 'Engraved photo frame with custom text.',
    material: 'MDF Wood',
    price: 349,
    thumbnail: 'https://placehold.co/400x400',
    categorySlug: 'personalized',
    typeSlug: 'photo-frames',
    featured: true,
    stock: 15,
  },
  {
    name: 'Desk Name Stand',
    description: 'Simple desk stand, any name engraved.',
    material: 'Acrylic',
    price: 249,
    thumbnail: 'https://placehold.co/400x400',
    categorySlug: 'general',
    typeSlug: 'stands',
    featured: false,
    stock: 25,
  },
];

async function main() {
  for (const p of sampleProducts) {
    const category = await prisma.category.findUnique({ where: { slug: p.categorySlug } });
    const type = await prisma.productType.findUnique({ where: { slug: p.typeSlug } });

    if (!category || !type) {
      console.log(`Skipping "${p.name}" — category/type not found. Run "npm run seed" first.`);
      continue;
    }

    const slug = slugify(p.name);

    await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        name: p.name,
        slug,
        description: p.description,
        material: p.material,
        price: p.price,
        thumbnail: p.thumbnail,
        featured: p.featured,
        stock: p.stock,
        categoryId: category.id,
        typeId: type.id,
      },
    });
  }

  console.log('Seeded sample products.');
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });
