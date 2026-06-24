import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Upload } from "lucide-react";
import type { SxProps, Theme } from "@mui/material/styles";

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onFileSelect: (files: File[]) => void;
  onError?: (message: string) => void;
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      accept,
      multiple = false,
      maxSize,
      onFileSelect,
      onError,
      label = "Drop files here or click to upload",
      helperText,
      error = false,
      errorMessage,
      disabled = false,
      sx,
    },
    ref
  ) => {
    const theme = useTheme();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const processFiles = (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const fileArray = Array.from(files);

      if (maxSize) {
        const oversized = fileArray.find((f) => f.size > maxSize);
        if (oversized) {
          onError?.(`File "${oversized.name}" exceeds the maximum allowed size.`);
          return;
        }
      }

      onFileSelect(multiple ? fileArray : [fileArray[0]]);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (!disabled) processFiles(e.dataTransfer.files);
    };

    const handleClick = () => {
      if (!disabled) inputRef.current?.click();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(e.target.files);
      e.target.value = "";
    };

    const borderColor = error ? "error.main" : isDragging ? "primary.main" : "divider";

    return (
      <Box ref={ref} sx={sx}>
        <Box
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            border: "2px dashed",
            borderColor,
            borderRadius: 2,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            cursor: disabled ? "not-allowed" : "pointer",
            bgcolor: isDragging ? "action.hover" : "transparent",
            opacity: disabled ? 0.5 : 1,
            transition: "border-color 0.2s, background-color 0.2s",
          }}
        >
          <Upload
            size={40}
            aria-hidden
            color={error ? theme.palette.error.main : theme.palette.text.secondary}
          />
          <Typography
            variant="body2"
            color={error ? "error" : "text.secondary"}
            align="center"
          >
            {label}
          </Typography>
          {helperText && !error && (
            <Typography variant="caption" color="text.disabled">
              {helperText}
            </Typography>
          )}
          {error && errorMessage && (
            <Typography variant="caption" color="error">
              {errorMessage}
            </Typography>
          )}
        </Box>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          style={{ display: "none" }}
          data-testid="file-input"
        />
      </Box>
    );
  }
);

FileUpload.displayName = "FileUpload";
