import { createContext, useContext } from "react";

export type FormFieldContextValue = {
  controlId: string;
  helpId: string;
  errorId: string;
  invalid: boolean;
  disabled: boolean;
  required: boolean;
  describedBy: string | undefined;
};

export const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export function useFormFieldContext(): FormFieldContextValue | null {
  return useContext(FormFieldContext);
}
