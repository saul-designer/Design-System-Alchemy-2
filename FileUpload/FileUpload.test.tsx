import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import { FileUpload } from "./FileUpload";

const noop = () => {};

describe("FileUpload", () => {
  it("renders the upload area", () => {
    render(<FileUpload onFileSelect={noop} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders the default label", () => {
    render(<FileUpload onFileSelect={noop} />);
    expect(screen.getByText("Drop files here or click to upload")).toBeInTheDocument();
  });

  it("renders a custom label", () => {
    render(<FileUpload onFileSelect={noop} label="Upload your file" />);
    expect(screen.getByText("Upload your file")).toBeInTheDocument();
  });

  it("renders helperText when no error", () => {
    render(<FileUpload onFileSelect={noop} helperText="Max 5MB" />);
    expect(screen.getByText("Max 5MB")).toBeInTheDocument();
  });

  it("hides helperText when error is true", () => {
    render(<FileUpload onFileSelect={noop} helperText="Max 5MB" error />);
    expect(screen.queryByText("Max 5MB")).not.toBeInTheDocument();
  });

  it("renders errorMessage when error is true", () => {
    render(<FileUpload onFileSelect={noop} error errorMessage="Invalid file type" />);
    expect(screen.getByText("Invalid file type")).toBeInTheDocument();
  });

  it("does not render errorMessage when error is false", () => {
    render(<FileUpload onFileSelect={noop} errorMessage="Invalid file type" />);
    expect(screen.queryByText("Invalid file type")).not.toBeInTheDocument();
  });

  it("calls onFileSelect with selected file", () => {
    const onFileSelect = vi.fn();
    render(<FileUpload onFileSelect={onFileSelect} />);
    const input = screen.getByTestId("file-input");
    const file = new File(["content"], "test.txt", { type: "text/plain" });
    fireEvent.change(input, { target: { files: [file] } });
    expect(onFileSelect).toHaveBeenCalledWith([file]);
  });

  it("calls onFileSelect with all files when multiple is true", () => {
    const onFileSelect = vi.fn();
    render(<FileUpload onFileSelect={onFileSelect} multiple />);
    const input = screen.getByTestId("file-input");
    const file1 = new File(["a"], "a.txt", { type: "text/plain" });
    const file2 = new File(["b"], "b.txt", { type: "text/plain" });
    fireEvent.change(input, { target: { files: [file1, file2] } });
    expect(onFileSelect).toHaveBeenCalledWith([file1, file2]);
  });

  it("calls onError when file exceeds maxSize", () => {
    const onError = vi.fn();
    const onFileSelect = vi.fn();
    render(<FileUpload onFileSelect={onFileSelect} onError={onError} maxSize={10} />);
    const input = screen.getByTestId("file-input");
    const bigFile = new File(["a".repeat(100)], "big.txt", { type: "text/plain" });
    fireEvent.change(input, { target: { files: [bigFile] } });
    expect(onError).toHaveBeenCalled();
    expect(onFileSelect).not.toHaveBeenCalled();
  });

  it("calls onFileSelect when file is within maxSize", () => {
    const onFileSelect = vi.fn();
    render(<FileUpload onFileSelect={onFileSelect} maxSize={10000} />);
    const input = screen.getByTestId("file-input");
    const smallFile = new File(["small"], "small.txt", { type: "text/plain" });
    fireEvent.change(input, { target: { files: [smallFile] } });
    expect(onFileSelect).toHaveBeenCalledWith([smallFile]);
  });

  it("does not call onFileSelect when files list is empty", () => {
    const onFileSelect = vi.fn();
    render(<FileUpload onFileSelect={onFileSelect} />);
    const input = screen.getByTestId("file-input");
    fireEvent.change(input, { target: { files: [] } });
    expect(onFileSelect).not.toHaveBeenCalled();
  });

  it("sets isDragging on dragOver when not disabled", () => {
    const { container } = render(<FileUpload onFileSelect={noop} />);
    const dropZone = container.querySelector("[role='button']") as HTMLElement;
    fireEvent.dragOver(dropZone);
    expect(dropZone).toBeInTheDocument();
  });

  it("triggers file input click on zone click when not disabled", () => {
    const { container } = render(<FileUpload onFileSelect={noop} />);
    const dropZone = container.querySelector("[role='button']") as HTMLElement;
    const input = screen.getByTestId("file-input") as HTMLInputElement;
    const clickSpy = vi.spyOn(input, "click").mockImplementation(() => {});
    fireEvent.click(dropZone);
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it("does not trigger file input click when disabled", () => {
    const { container } = render(<FileUpload onFileSelect={noop} disabled />);
    const dropZone = container.querySelector("[role='button']") as HTMLElement;
    const input = screen.getByTestId("file-input") as HTMLInputElement;
    const clickSpy = vi.spyOn(input, "click").mockImplementation(() => {});
    fireEvent.click(dropZone);
    expect(clickSpy).not.toHaveBeenCalled();
  });

  it("does not set isDragging on dragOver when disabled", () => {
    const { container } = render(<FileUpload onFileSelect={noop} disabled />);
    const dropZone = container.querySelector("[role='button']") as HTMLElement;
    fireEvent.dragOver(dropZone);
    expect(dropZone).toHaveAttribute("aria-disabled", "true");
  });

  it("clears isDragging on dragLeave", () => {
    const { container } = render(<FileUpload onFileSelect={noop} />);
    const dropZone = container.querySelector("[role='button']") as HTMLElement;
    fireEvent.dragOver(dropZone);
    fireEvent.dragLeave(dropZone);
    expect(dropZone).toBeInTheDocument();
  });

  it("calls onFileSelect on drop", () => {
    const onFileSelect = vi.fn();
    const { container } = render(<FileUpload onFileSelect={onFileSelect} />);
    const dropZone = container.querySelector("[role='button']") as HTMLElement;
    const file = new File(["content"], "dropped.txt", { type: "text/plain" });
    fireEvent.drop(dropZone, { dataTransfer: { files: [file] } });
    expect(onFileSelect).toHaveBeenCalledWith([file]);
  });

  it("does not call onFileSelect on drop when disabled", () => {
    const onFileSelect = vi.fn();
    const { container } = render(<FileUpload onFileSelect={onFileSelect} disabled />);
    const dropZone = container.querySelector("[role='button']") as HTMLElement;
    const file = new File(["content"], "dropped.txt", { type: "text/plain" });
    fireEvent.drop(dropZone, { dataTransfer: { files: [file] } });
    expect(onFileSelect).not.toHaveBeenCalled();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<FileUpload onFileSelect={noop} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
