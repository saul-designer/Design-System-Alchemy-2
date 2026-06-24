import React from "react";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import { Accordion } from "../Accordion";

export interface AccordionGroupItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionGroupProps {
  items: AccordionGroupItem[];
  allowMultiple?: boolean;
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onChangeExpanded?: (expandedIds: string[]) => void;
  sx?: SxProps<Theme>;
}

export const AccordionGroup = React.forwardRef<HTMLDivElement, AccordionGroupProps>(
  (
    {
      items,
      allowMultiple = true,
      expandedIds,
      defaultExpandedIds,
      onChangeExpanded,
      sx,
    },
    ref
  ) => {
    const isControlled = Array.isArray(expandedIds);
    const initialExpanded = React.useMemo(
      () => (Array.isArray(defaultExpandedIds) ? defaultExpandedIds : []),
      [defaultExpandedIds]
    );
    const [internalExpandedIds, setInternalExpandedIds] =
      React.useState<string[]>(initialExpanded);
    const activeExpandedIds = isControlled
      ? (expandedIds as string[])
      : internalExpandedIds;

    React.useEffect(() => {
      if (!isControlled) {
        setInternalExpandedIds(initialExpanded);
      }
    }, [initialExpanded, isControlled]);

    const handleAccordionChange = (id: string, isExpanded: boolean) => {
      const nextExpandedIds = isExpanded
        ? allowMultiple
          ? [...activeExpandedIds, id]
          : [id]
        : activeExpandedIds.filter((expandedId) => expandedId !== id);

      if (!isControlled) {
        setInternalExpandedIds(nextExpandedIds);
      }
      onChangeExpanded?.(nextExpandedIds);
    };

    return (
      <Box ref={ref}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const itemSpacingSx: SxProps<Theme> = {
            mb: isLast ? 0 : 1.5,
            "&.Mui-expanded": {
              my: 0,
              mb: isLast ? 0 : 1.5,
            },
          };
          const itemSx = [
            itemSpacingSx,
            ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
          ] as SxProps<Theme>;
          return (
            <Accordion
              key={item.id}
              summary={item.title}
              details={item.content}
              disabled={item.disabled}
              expanded={activeExpandedIds.includes(item.id)}
              onChange={(nextExpanded) => handleAccordionChange(item.id, nextExpanded)}
              sx={itemSx}
            />
          );
        })}
      </Box>
    );
  }
);

AccordionGroup.displayName = "AccordionGroup";
