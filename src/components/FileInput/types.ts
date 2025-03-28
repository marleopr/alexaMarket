export interface FileInputProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onFileSelect: (files: File[]) => void;
  onError?: (error: string) => void;
  helperText?: string;
  disabled?: boolean;
  hasFile?: boolean;
  selectedFile?: File
}

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}
