// lib/token.ts
import { nanoid } from 'nanoid'
import { prisma } from '@/lib/prisma'

export async function generatePasswordResetToken(userId: string): Promise<string> {
  const token = nanoid(32)
  const expires = new Date(Date.now() + 3600000) // 1 hour from now

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId,
      expires
    }
  })

  return token
}

export async function validatePasswordResetToken(token: string): Promise<string | null> {
  const storedToken = await prisma.passwordResetToken.findUnique({
    where: { token }
  })

  if (!storedToken || storedToken.expires < new Date()) {
    return null
  }

  return storedToken.userId
}