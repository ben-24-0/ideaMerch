import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = ['General', 'Anime', 'Cute', 'Festivals', 'Personalized'];
const types = ['Keychains', 'Name Plates', 'Stands', 'Photo Frames'];

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

async function main() {
  for (const [i, name] of categories.entries()) {
    const slug = slugify(name);
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: { name, slug, sortOrder: i },
    });
  }

  for (const [i, name] of types.entries()) {
    const slug = slugify(name);
    await prisma.productType.upsert({
      where: { slug },
      update: {},
      create: { name, slug, sortOrder: i },
    });
  }

  console.log('Seeded categories and product types.');
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });
