import { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type MemberFormValues } from "@/hooks/useMembers";

interface NameFieldProps {
  control: Control<MemberFormValues>;
}

export function NameField({ control }: NameFieldProps) {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter member name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}