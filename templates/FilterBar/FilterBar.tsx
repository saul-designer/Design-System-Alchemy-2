import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Filter } from "lucide-react";
import type { SxProps, Theme } from "@mui/material/styles";

export interface FilterBarProps {
  /** Array of filter field elements — each becomes one grid cell. */
  filters: React.ReactNode[];
  /** Whether the filter panel is open (controlled mode). */
  open?: boolean;
  /** Initial open state in uncontrolled mode (default: false). */
  defaultOpen?: boolean;
  /** Called when the toggle button is clicked. */
  onOpenChange?: (open: boolean) => void;
  /** Called when the "Clear" button is clicked. Enables the Clear button. */
  onClearAll?: () => void;
  /** Show the Clear button. Defaults to true when onClearAll is provided. */
  showClearButton?: boolean;
  /** Max filter fields per row (default: 4). */
  maxPerRow?: number;
  /** Toggle button label when panel is hidden (default: "Show Filters"). */
  showLabel?: string;
  /** Toggle button label when panel is visible (default: "Hide Filters"). */
  hideLabel?: string;
  /** Optional content rendered to the left of the toggle button (e.g., a search bar). */
  toolbarStart?: React.ReactNode;
  /**
   * Renders filters inline in a single row alongside toolbarStart and a Clear button.
   * Hides the show/hide toggle button and the collapsible panel.
   */
  inline?: boolean;
  /** Sx props for the root container. */
  sx?: SxProps<Theme>;
}

export const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
  (
    {
      filters,
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      onClearAll,
      showClearButton = true,
      maxPerRow = 4,
      showLabel = "Show Filters",
      hideLabel = "Hide Filters",
      toolbarStart,
      inline = false,
      sx,
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = openProp !== undefined ? openProp : internalOpen;

    const handleToggle = () => {
      const next = !isOpen;
      if (openProp === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    };

    const showClear = showClearButton && Boolean(onClearAll);

    if (inline) {
      return (
        <Box
          ref={ref}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "nowrap",
            ...sx,
          }}
        >
          {toolbarStart && <Box sx={{ flex: 1, minWidth: 0 }}>{toolbarStart}</Box>}
          {filters.map((filter, index) => (
            <Box key={index} sx={{ minWidth: "160px" }}>
              {filter}
            </Box>
          ))}
          {showClear && (
            <Button
              variant="outlined"
              type="button"
              onClick={onClearAll}
              sx={{ flexShrink: 0 }}
            >
              Clear
            </Button>
          )}
        </Box>
      );
    }

    // Split filters into rows of maxPerRow
    const rows: React.ReactNode[][] = [];
    for (let i = 0; i < filters.length; i += maxPerRow) {
      rows.push(filters.slice(i, i + maxPerRow));
    }

    return (
      <Box ref={ref} sx={sx}>
        {/* Toolbar: optional leading content + toggle button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {toolbarStart && <Box sx={{ flex: 1, minWidth: 0 }}>{toolbarStart}</Box>}
          <Button
            variant="outlined"
            startIcon={<Filter size={18} aria-hidden />}
            onClick={handleToggle}
            sx={{ fontWeight: "bold", flexShrink: 0 }}
          >
            {isOpen ? hideLabel : showLabel}
          </Button>
        </Box>

        {/* Collapsible filter panel */}
        <Box
          sx={{
            transition:
              "max-height 0.4s ease-in-out, padding 0.4s ease-in-out, opacity 0.3s ease-in-out",
            overflow: "hidden",
            maxHeight: isOpen ? "800px" : "0px",
            opacity: isOpen ? 1 : 0,
            px: 1,
            py: isOpen ? 2 : 0,
          }}
        >
          <Box
            sx={{
              py: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {rows.map((row, rowIndex) => {
              const isLastRow = rowIndex === rows.length - 1;
              const shouldGrow = !isLastRow || row.length < maxPerRow;

              return (
                <Box
                  key={rowIndex}
                  sx={{
                    display: "flex",
                    flexWrap: "nowrap",
                    justifyContent: isLastRow ? "flex-start" : "space-between",
                    alignItems: "flex-end",
                    width: "100%",
                  }}
                >
                  {row.map((item, itemIndex) => (
                    <Box
                      key={itemIndex}
                      sx={{
                        flexGrow: shouldGrow ? 1 : 0,
                        minWidth: "200px",
                        flexBasis: shouldGrow ? "auto" : "200px",
                        mr: itemIndex !== row.length - 1 ? 2 : 0,
                      }}
                    >
                      {item}
                    </Box>
                  ))}

                  {/* Clear button: right-aligned on the last row */}
                  {isLastRow && showClear && (
                    <Box sx={{ flexShrink: 0, ml: "auto", pl: 2 }}>
                      <Button variant="outlined" type="button" onClick={onClearAll}>
                        Clear
                      </Button>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  }
);

FilterBar.displayName = "FilterBar";
