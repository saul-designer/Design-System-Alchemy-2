import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormProps, FieldValues, Resolver } from "react-hook-form";

export interface UseAlchemyFormProps<T extends FieldValues> extends UseFormProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema?: any;
}

export function useAlchemyForm<T extends FieldValues>({
  schema,
  mode = "onTouched",
  ...props
}: UseAlchemyFormProps<T> = {}) {
  return useForm<T>({
    resolver: schema ? (zodResolver(schema) as Resolver<T>) : undefined,
    mode,
    ...props,
  });
}
