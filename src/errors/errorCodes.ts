export const ErrorCodes = {
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  FRIEND_NOT_FOUND: 'FRIEND_NOT_FOUND',
  INVALID_FRIEND: 'INVALID_FRIEND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

export const ErrorMessages = {
  [ErrorCodes.USER_NOT_FOUND]: 'User not found',
  [ErrorCodes.FRIEND_NOT_FOUND]: 'Friend not found',
  [ErrorCodes.INVALID_FRIEND]: 'User cannot be friends with themselves',
  [ErrorCodes.INTERNAL_SERVER_ERROR]: 'Internal server error',
} as const; 