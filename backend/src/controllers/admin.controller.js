import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma.js';

export async function listAdmins(req, res) {
  const admins = await prisma.admin.findMany({
    select: { id: true, name: true, email: true, active: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  });
  res.json(admins);
}

export async function createAdmin(req, res) {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'password must be at least 8 characters' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.admin.create({
      data: { name, email, passwordHash },
      select: { id: true, name: true, email: true, active: true, createdAt: true },
    });
    res.status(201).json(admin);
  } catch (err) {
    res.status(409).json({ error: 'An admin with that email already exists' });
  }
}

export async function updateAdmin(req, res) {
  const { id } = req.params;
  const { name, email, password, active } = req.body;

  const data = {};
  if (name !== undefined) data.name = name;
  if (email !== undefined) data.email = email;
  if (active !== undefined) data.active = active;
  if (password !== undefined) {
    if (password.length < 8) {
      return res.status(400).json({ error: 'password must be at least 8 characters' });
    }
    data.passwordHash = await bcrypt.hash(password, 10);
  }

  try {
    const admin = await prisma.admin.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, active: true, createdAt: true },
    });
    res.json(admin);
  } catch (err) {
    res.status(404).json({ error: 'Admin not found' });
  }
}

export async function deleteAdmin(req, res) {
  const { id } = req.params;

  if (id === req.admin.sub) {
    return res.status(400).json({ error: "You can't delete your own account while logged in as it" });
  }

  const activeCount = await prisma.admin.count({ where: { active: true } });
  const target = await prisma.admin.findUnique({ where: { id } });

  if (target?.active && activeCount <= 1) {
    return res.status(400).json({ error: 'Cannot delete the last active admin' });
  }

  try {
    await prisma.admin.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: 'Admin not found' });
  }
}
