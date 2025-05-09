import { GraphQLError } from 'graphql';
import { AppError } from './AppError';

export const formatError = (error: GraphQLError) => {
  const originalError = error.originalError as AppError;

  // 如果是自定義錯誤，使用自定義格式
  if (originalError instanceof AppError) {
    return {
      message: originalError.message,
      statusCode: originalError.statusCode,
    };
  }

  // 默認錯誤格式
  return {
    message: error.message,
    statusCode: 500,
  };
}; 