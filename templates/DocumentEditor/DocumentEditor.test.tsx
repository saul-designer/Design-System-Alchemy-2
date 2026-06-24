import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test/render";
import {
  DocumentEditor,
  FieldToken,
  TypeChip,
  DocSectionHeading,
  DocParagraph,
} from "./DocumentEditor";

// ─── FieldToken ───────────────────────────────────────────────────────────────

describe("FieldToken", () => {
  it("renders the label", () => {
    render(<FieldToken label="full_name" />);
    expect(screen.getByText("full_name")).toBeInTheDocument();
  });

  it("renders an icon when provided", () => {
    render(<FieldToken icon={<span data-testid="icon" />} label="email" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("has contentEditable false so it stays pinned inside editable containers", () => {
    render(<FieldToken label="pin" />);
    const el = screen.getByText("pin").closest("span");
    expect(el).toHaveAttribute("contenteditable", "false");
  });
});

// ─── TypeChip ─────────────────────────────────────────────────────────────────

describe("TypeChip", () => {
  it("renders the type label", () => {
    render(<TypeChip type="Email" source="system" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders with contractor source", () => {
    render(<TypeChip type="Select" source="contractor" />);
    expect(screen.getByText("Select")).toBeInTheDocument();
  });
});

// ─── DocSectionHeading ────────────────────────────────────────────────────────

describe("DocSectionHeading", () => {
  it("renders children", () => {
    render(<DocSectionHeading>1. Engagement</DocSectionHeading>);
    expect(screen.getByText("1. Engagement")).toBeInTheDocument();
  });

  it("is contentEditable", () => {
    render(<DocSectionHeading>Section</DocSectionHeading>);
    const el = screen.getByText("Section");
    expect(el).toHaveAttribute("contenteditable", "true");
  });
});

// ─── DocParagraph ─────────────────────────────────────────────────────────────

describe("DocParagraph", () => {
  it("renders children", () => {
    render(<DocParagraph>Lorem ipsum</DocParagraph>);
    expect(screen.getByText("Lorem ipsum")).toBeInTheDocument();
  });

  it("is contentEditable", () => {
    render(<DocParagraph>Editable text</DocParagraph>);
    const el = screen.getByText("Editable text");
    expect(el).toHaveAttribute("contenteditable", "true");
  });
});

// ─── DocumentEditor ───────────────────────────────────────────────────────────

describe("DocumentEditor", () => {
  it("renders the document title in the page header", () => {
    render(<DocumentEditor title="My Agreement">Content</DocumentEditor>);
    expect(screen.getAllByText("My Agreement").length).toBeGreaterThan(0);
  });

  it("renders children as document canvas content", () => {
    render(
      <DocumentEditor title="Doc">
        <p data-testid="canvas-content">Body text</p>
      </DocumentEditor>
    );
    expect(screen.getByTestId("canvas-content")).toBeInTheDocument();
  });

  it("renders breadcrumb parent label", () => {
    render(
      <DocumentEditor title="Agreement" breadcrumbParent="Contracts">
        Content
      </DocumentEditor>
    );
    expect(screen.getByText("Contracts")).toBeInTheDocument();
  });

  it("renders default breadcrumb parent when not provided", () => {
    render(<DocumentEditor title="Doc">Content</DocumentEditor>);
    expect(screen.getByText("Documents")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(
      <DocumentEditor title="Doc" subtitle="Custom subtitle here">
        Content
      </DocumentEditor>
    );
    expect(screen.getByText("Custom subtitle here")).toBeInTheDocument();
  });

  it("renders the version badge when provided", () => {
    render(
      <DocumentEditor title="Doc" versionBadge={<span data-testid="badge">v1</span>}>
        Content
      </DocumentEditor>
    );
    expect(screen.getByTestId("badge")).toBeInTheDocument();
  });

  it("renders the field registry when fields are provided", () => {
    const fields = [
      {
        id: "f1",
        label: "Full name",
        key: "field:full_name",
        type: "Text",
        source: "system",
      },
    ];
    render(
      <DocumentEditor title="Doc" fields={fields}>
        Content
      </DocumentEditor>
    );
    expect(screen.getByText("Full name")).toBeInTheDocument();
    expect(screen.getByText("field:full_name")).toBeInTheDocument();
  });

  it("does not render the field registry when fields are empty", () => {
    render(
      <DocumentEditor title="Doc" fields={[]}>
        Content
      </DocumentEditor>
    );
    expect(screen.queryByText("Field Registry")).not.toBeInTheDocument();
  });

  it("renders custom registry title and subtitle", () => {
    const fields = [
      { id: "f1", label: "Name", key: "field:name", type: "Text", source: "system" },
    ];
    render(
      <DocumentEditor
        title="Doc"
        fields={fields}
        registryTitle="Custom Registry"
        registrySubtitle="Drop here"
      >
        Content
      </DocumentEditor>
    );
    expect(screen.getByText("Custom Registry")).toBeInTheDocument();
    expect(screen.getByText("Drop here")).toBeInTheDocument();
  });

  it("renders sidebar when provided", () => {
    render(
      <DocumentEditor title="Doc" sidebar={<nav data-testid="sidebar">Nav</nav>}>
        Content
      </DocumentEditor>
    );
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  it("renders appBar when provided", () => {
    render(
      <DocumentEditor title="Doc" appBar={<header data-testid="appbar">AppBar</header>}>
        Content
      </DocumentEditor>
    );
    expect(screen.getByTestId("appbar")).toBeInTheDocument();
  });

  it("calls onPreview when Preview button is clicked", () => {
    const onPreview = vi.fn();
    render(
      <DocumentEditor title="Doc" onPreview={onPreview}>
        Content
      </DocumentEditor>
    );
    fireEvent.click(screen.getByRole("button", { name: /preview/i }));
    expect(onPreview).toHaveBeenCalledOnce();
  });

  it("calls onSave when Save version button is clicked", () => {
    const onSave = vi.fn();
    render(
      <DocumentEditor title="Doc" onSave={onSave}>
        Content
      </DocumentEditor>
    );
    fireEvent.click(screen.getByRole("button", { name: /save version/i }));
    expect(onSave).toHaveBeenCalledOnce();
  });

  it("renders TypeChip inside the registry for each field", () => {
    const fields = [
      { id: "f1", label: "SSN", key: "field:ssn", type: "Number", source: "contractor" },
    ];
    render(
      <DocumentEditor title="Doc" fields={fields}>
        Content
      </DocumentEditor>
    );
    expect(screen.getByText("Number")).toBeInTheDocument();
  });
});
