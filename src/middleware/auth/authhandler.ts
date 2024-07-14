import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ApiError, ApiErrorCodes } from '../errorhandler/APIError'

/**
 * The decoded token interface.
 * (I am building this on top of the existing codebase of another project I worked on.
 * This is why I keep the JWT functionality)
 */
type DecodedToken = {
  password: string | undefined
}

/**
 * Checks if the password is valid.
 * @param password the sub field of the decoded token.
 * @throws {ApiError} if the token is invalid.
 */
const checkValidPassword = (password: string | undefined): void => {
  const validPassword = 'Password123'
  if (!password || password !== validPassword) {
    throw new ApiError(ApiErrorCodes.UNAUTHORIZED, 'Invalid token')
  }
}

/**
 * Validates the token in the request header.
 * @param req the incoming request.
 * @param res the outgoing response.
 * @param next the next (middleware) function.
 * @throws {ApiError} if the token is invalid.
 */
export const authHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.decode(token) as DecodedToken
      if (decoded) {
        checkValidPassword(decoded.password)
        next()
        return
      }
    } catch (error) {
      throw new ApiError(ApiErrorCodes.UNAUTHORIZED, 'Invalid token')
    }
  }
  throw new ApiError(ApiErrorCodes.UNAUTHORIZED, 'Invalid token')
}

export default authHandler
