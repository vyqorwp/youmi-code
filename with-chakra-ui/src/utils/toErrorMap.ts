import {FieldError} from '../generated/graphql';

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  console.log('error--', errors);
  errors.forEach(({field, message}) => {
    errorMap[field] = message;
  });
  console.log('errorMap===', errorMap);
  return errorMap;
};
