import { FileValidationResult } from './types';

export const validateFiles = (
  files: FileList,
  maxSize?: number,
  accept?: string
): FileValidationResult => {
  const acceptedTypes = accept?.split(',').map(type => type.trim());

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (maxSize && file.size > maxSize) {
      return {
        isValid: false,
        error: `File ${file.name} exceeds maximum size of ${maxSize / 1000000}MB`,
      };
    }

    if (acceptedTypes?.length && !acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      return file.type.match(new RegExp(type.replace('*', '.*')));
    })) {
      return {
        isValid: false,
        error: `File ${file.name} has an invalid file type`,
      };
    }
  }

  return { isValid: true };
};