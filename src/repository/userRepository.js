const prisma = require('../config/prisma');

const userRepository = {
  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async findByUsername(username) {
    return prisma.user.findUnique({
      where: { username },
    });
  },

  async findById(id) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async create({ username, email, password, role = 'USER' }) {
    return prisma.user.create({
      data: { username, email, password, role },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  },

  async existsByEmail(email) {
    const count = await prisma.user.count({ where: { email } });
    return count > 0;
  },

  async existsByUsername(username) {
    const count = await prisma.user.count({ where: { username } });
    return count > 0;
  },
};

module.exports = userRepository;
