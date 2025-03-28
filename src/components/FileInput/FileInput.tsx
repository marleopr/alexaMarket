import React, { useRef, ChangeEvent } from "react";
import { FormControl, FormHelperText, Typography, Box } from "@mui/material";
import { FileInputProps } from "./types";
import { validateFiles } from "./util";
import { Upload } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export const FileInput: React.FC<FileInputProps> = ({
  accept,
  multiple = false,
  maxSize,
  onFileSelect,
  onError,
  helperText,
  disabled = false,
  hasFile,
  selectedFile
}) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    const validation = validateFiles(files, maxSize, accept);

    if (!validation.isValid) {
      onError?.(validation.error || "Invalid file");
      event.target.value = "";
      return;
    }

    onFileSelect(Array.from(files));
    event.target.value = "";
  };

  return (
    <FormControl fullWidth disabled={disabled}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <Box
        sx={{
          border: "2px dashed",
          borderColor: "primary.main",
          borderRadius: 1,
          p: 3,
          textAlign: "center",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
        onClick={handleClick}
      >
        <Upload fontSize={"medium"} style={{ margin: "0 auto" }} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {hasFile ? selectedFile?.name : t("Common.ClickHereOrDragToUpload")}
        </Typography>
        {helperText && (
          <Typography variant="body2" color="text.secondary">
            {helperText}
          </Typography>
        )}
      </Box>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
