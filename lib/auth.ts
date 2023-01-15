import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { TRAX_ACCESS_TOKEN: token } = req.cookies // destructuring and then rename to => token
    if (token) {
      let user

      try {
        const { id } = jwt.verify(token, 'hello')

        user = await prisma.user.findUnique({
          where: { id },
        })

        if (!user) {
          throw new Error("This user doesn't exist ")
        }
      } catch (error) {
        res.status(401).json({ error: 'Not Authorized ' })
        return
      }

      return handler(req, res, user)
    }

    res.status(401).json({ error: 'Not Authorized ' })
  }
}

export const validateToken = (token) => {
  const user = jwt.verify(token, 'hello')
  return user
}
