import React from "react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { render } from "../test/render";
import { useAlchemyForm } from "./useAlchemyForm";
import { ControlledAutocomplete } from "./ControlledAutocomplete";

// jsdom does not implement ResizeObserver — must be a class (arrow functions aren't constructable)
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

beforeAll(() => {
  vi.stubGlobal("ResizeObserver", ResizeObserverMock);
});

// ─── Fixtures ─────────────────────────────────────────────────────────────────

interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Diana" },
];

// ─── Wrappers ─────────────────────────────────────────────────────────────────

function MultiForm({
  initialValues = [],
  ...props
}: Readonly<
  Partial<
    Omit<
      React.ComponentProps<typeof ControlledAutocomplete<User, { tags: number[] }>>,
      "name" | "control" | "data" | "getOptionLabel" | "getOptionValue"
    >
  > & { initialValues?: number[] }
>) {
  const { control } = useForm({ defaultValues: { tags: initialValues } });
  return (
    <ControlledAutocomplete
      name="tags"
      control={control}
      data={users}
      label="Tags"
      getOptionLabel={(u) => u.name}
      getOptionValue={(u) => u.id}
      {...props}
    />
  );
}

function MultiFormTracked({
  initialValues = [],
}: Readonly<{ initialValues?: number[] }>) {
  const { control, watch } = useForm({ defaultValues: { tags: initialValues } });
  return (
    <>
      <ControlledAutocomplete
        name="tags"
        control={control}
        data={users}
        label="Tags"
        getOptionLabel={(u) => u.name}
        getOptionValue={(u) => u.id}
      />
      <span data-testid="value">{JSON.stringify(watch("tags"))}</span>
    </>
  );
}

function SingleForm({ initialValue = null }: Readonly<{ initialValue?: number | null }>) {
  const { control } = useForm({ defaultValues: { tag: initialValue } });
  return (
    <ControlledAutocomplete
      name="tag"
      control={control}
      data={users}
      label="Tag"
      getOptionLabel={(u) => u.name}
      getOptionValue={(u) => u.id}
      singleSelect
      hideCheckbox
    />
  );
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("ControlledAutocomplete", () => {
  it("renders the combobox input", () => {
    render(<MultiForm />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders with label", () => {
    const { container } = render(<MultiForm />);
    expect(container.querySelector("label")).toHaveTextContent("Tags");
  });

  it("renders with placeholder when no value is selected", () => {
    render(<MultiForm placeholder="Pick one" />);
    expect(screen.getByPlaceholderText("Pick one")).toBeInTheDocument();
  });

  it("renders as disabled", () => {
    render(<MultiForm disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("renders with small size", () => {
    const { container } = render(<MultiForm size="small" />);
    expect(container.querySelector(".MuiInputBase-sizeSmall")).toBeInTheDocument();
  });

  it("opens dropdown and shows options", async () => {
    render(<MultiForm />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "a" } });
    await waitFor(() => expect(screen.getByText("Alice")).toBeInTheDocument());
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  it("selects an option and updates the form value", async () => {
    render(<MultiFormTracked />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Ali" } });
    await waitFor(() => screen.getByText("Alice"));
    fireEvent.click(screen.getByText("Alice"));
    await waitFor(() => expect(screen.getByTestId("value")).toHaveTextContent("[1]"));
  });

  it("renders chips for pre-selected values", () => {
    render(<MultiFormTracked initialValues={[2, 3]} />);
    // jsdom clientWidth=0 → visibleCount=1: first chip renders, rest collapse into "+N more"
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("+1 more")).toBeInTheDocument();
    expect(screen.getByTestId("value")).toHaveTextContent("[2,3]");
  });

  it("renders in singleSelect mode", () => {
    render(<SingleForm />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows selected label in singleSelect mode after picking an option", async () => {
    render(<SingleForm />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Bob" } });
    await waitFor(() => screen.getByText("Bob"));
    fireEvent.click(screen.getByText("Bob"));
    await waitFor(() => expect(screen.getByRole("combobox")).toHaveValue("Bob"));
  });

  it("shows external error prop", () => {
    const { container } = render(<MultiForm error />);
    expect(container.querySelector(".Mui-error")).toBeInTheDocument();
  });

  it("shows external helperText", () => {
    render(<MultiForm helperText="At least one required." />);
    expect(screen.getByText("At least one required.")).toBeInTheDocument();
  });

  it("shows react-hook-form validation error", async () => {
    const schema = z.object({ tags: z.array(z.number()).min(1, "Required") });
    function ValidationForm() {
      const { control, handleSubmit } = useAlchemyForm({
        schema,
        defaultValues: { tags: [] as number[] },
        mode: "all",
      });
      return (
        <form onSubmit={handleSubmit(() => {})}>
          <ControlledAutocomplete
            name="tags"
            control={control}
            data={users}
            label="Tags"
            getOptionLabel={(u) => u.name}
            getOptionValue={(u) => u.id}
          />
          <button type="submit">Submit</button>
        </form>
      );
    }
    render(<ValidationForm />);
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(await screen.findByText("Required")).toBeInTheDocument();
  });

  it("shows checkboxes by default in the dropdown", async () => {
    render(<MultiForm />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "a" } });
    await waitFor(() => screen.getByText("Alice"));
    expect(screen.getAllByRole("checkbox").length).toBeGreaterThan(0);
  });

  it("hides checkboxes when hideCheckbox is true", async () => {
    render(<MultiForm hideCheckbox />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "a" } });
    await waitFor(() => screen.getByText("Alice"));
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });

  it("calls onOpenModal when a freeSolo new-value option is selected", async () => {
    const onOpenModal = vi.fn();
    render(<MultiForm freeSolo onOpenModal={onOpenModal} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "NewTrade" } });
    await waitFor(() => screen.getByText('Add "NewTrade"'));
    fireEvent.click(screen.getByText('Add "NewTrade"'));
    expect(onOpenModal).toHaveBeenCalledWith("NewTrade");
  });

  it("calls onClick when the container is clicked", async () => {
    const onClick = vi.fn();
    render(<MultiForm onClick={onClick} />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(onClick).toHaveBeenCalled();
  });

  it("calls onBlur when the field loses focus", async () => {
    const onBlur = vi.fn();
    render(
      <>
        <MultiForm onBlur={onBlur} />
        <button>other</button>
      </>
    );
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.tab();
    expect(onBlur).toHaveBeenCalled();
  });

  it("removes stale ids when the data prop shrinks", async () => {
    function SanitizationForm() {
      const [data, setData] = React.useState(users);
      const { control, watch } = useForm({ defaultValues: { tags: [1, 2, 3] } });
      return (
        <>
          <ControlledAutocomplete
            name="tags"
            control={control}
            data={data}
            label="Tags"
            getOptionLabel={(u) => u.name}
            getOptionValue={(u) => u.id}
          />
          <button onClick={() => setData(users.slice(0, 1))}>shrink</button>
          <span data-testid="value">{JSON.stringify(watch("tags"))}</span>
        </>
      );
    }
    render(<SanitizationForm />);
    expect(screen.getByTestId("value")).toHaveTextContent("[1,2,3]");
    await userEvent.click(screen.getByRole("button", { name: "shrink" }));
    await waitFor(() => expect(screen.getByTestId("value")).toHaveTextContent("[1]"));
  });

  it("renders with enableUniqueKeys without errors", async () => {
    render(<MultiForm enableUniqueKeys />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "a" } });
    await waitFor(() => expect(screen.getByText("Alice")).toBeInTheDocument());
  });

  it("opens overflow popover on mouseEnter and shows hidden items", async () => {
    render(<MultiFormTracked initialValues={[2, 3]} />);
    const moreBox = screen.getByText("+1 more").closest(".MuiBox-root");
    fireEvent.mouseEnter(moreBox);
    await waitFor(() => expect(screen.getByText("Charlie")).toBeInTheDocument());
  });

  it("fires mouseLeave on the +N more chip without errors", async () => {
    render(<MultiFormTracked initialValues={[2, 3]} />);
    const moreBox = screen.getByText("+1 more").closest(".MuiBox-root");
    fireEvent.mouseEnter(moreBox);
    await waitFor(() => screen.getByText("Charlie"));
    fireEvent.mouseLeave(moreBox);
    // Popover stays open (timer callback is a no-op); combobox is aria-hidden behind the modal
    expect(screen.getByRole("combobox", { hidden: true })).toBeInTheDocument();
  });

  it("clears pending close timer on rapid re-enter", async () => {
    render(<MultiFormTracked initialValues={[2, 3]} />);
    const moreBox = screen.getByText("+1 more").closest(".MuiBox-root");
    fireEvent.mouseEnter(moreBox);
    await waitFor(() => screen.getByText("Charlie"));
    fireEvent.mouseLeave(moreBox); // sets closeTimerRef
    fireEvent.mouseEnter(moreBox); // hits the `if (closeTimerRef.current)` branch
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  it("clears singleSelect value when the clear button is clicked", async () => {
    function SingleFormTracked() {
      const { control, watch } = useForm<{ tag: number | null }>({
        defaultValues: { tag: null },
      });
      return (
        <>
          <ControlledAutocomplete
            name="tag"
            control={control}
            data={users}
            label="Tag"
            getOptionLabel={(u) => u.name}
            getOptionValue={(u) => u.id}
            singleSelect
            hideCheckbox
          />
          <span data-testid="value">{JSON.stringify(watch("tag"))}</span>
        </>
      );
    }
    render(<SingleFormTracked />);
    // Select Alice so a value exists and the Clear button appears
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Alic" } });
    await waitFor(() => screen.getByText("Alice"));
    fireEvent.click(screen.getByText("Alice"));
    await waitFor(() => expect(screen.getByTestId("value")).toHaveTextContent("1"));
    // MUI marks the clear button aria-hidden; use a direct DOM query to click it
    const clearBtn = document.querySelector('[aria-label="Clear"]');
    expect(clearBtn).toBeInTheDocument();
    fireEvent.click(clearBtn);
    await waitFor(() => expect(screen.getByTestId("value")).toHaveTextContent("null"));
  });

  it("returns null from renderTags when all chips are removed", async () => {
    render(<MultiFormTracked initialValues={[1]} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    const chip = screen.getByText("Alice").closest("[role='button']");
    const cancelIcon = chip?.querySelector("[data-testid='CancelIcon']");
    if (cancelIcon) fireEvent.click(cancelIcon);
    await waitFor(() => expect(screen.queryByText("Alice")).not.toBeInTheDocument());
    expect(screen.getByTestId("value")).toHaveTextContent("[]");
  });

  it("closes the overflow popover on backdrop click", async () => {
    render(<MultiFormTracked initialValues={[2, 3]} />);
    const moreBox = screen.getByText("+1 more").closest(".MuiBox-root");
    fireEvent.mouseEnter(moreBox);
    await waitFor(() => screen.getByText("Charlie"));
    const backdrop = document.querySelector(".MuiBackdrop-root");
    expect(backdrop).toBeInTheDocument();
    fireEvent.click(backdrop);
    await waitFor(() => expect(screen.queryByText("Charlie")).not.toBeInTheDocument());
  });

  it("renders without crashing when form value is null in multi mode", () => {
    function NullValueForm() {
      const { control } = useForm({
        defaultValues: { tags: null as unknown as number[] },
      });
      return (
        <ControlledAutocomplete
          name="tags"
          control={control}
          data={users}
          label="Tags"
          getOptionLabel={(u) => u.name}
          getOptionValue={(u) => u.id}
        />
      );
    }
    render(<NullValueForm />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("clears pending close timer when mouseLeave fires a second consecutive time", async () => {
    render(<MultiFormTracked initialValues={[2, 3]} />);
    const moreBox = screen.getByText("+1 more").closest(".MuiBox-root");
    fireEvent.mouseEnter(moreBox);
    await waitFor(() => screen.getByText("Charlie"));
    fireEvent.mouseLeave(moreBox);
    fireEvent.mouseLeave(moreBox);
    expect(screen.getByRole("combobox", { hidden: true })).toBeInTheDocument();
  });

  it("renders without crashing when name sanitizes to an empty id", () => {
    function EmptyIdForm() {
      const { control } = useForm({ defaultValues: { "---": [] as number[] } });
      return (
        <ControlledAutocomplete
          name={"---" as never}
          control={control}
          data={users}
          label="Tags"
          getOptionLabel={(u) => u.name}
          getOptionValue={(u) => u.id}
        />
      );
    }
    render(<EmptyIdForm />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
