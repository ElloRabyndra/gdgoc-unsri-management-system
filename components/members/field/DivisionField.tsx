import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DIVISIONS } from "@/types";
import { type MemberFormValues } from "@/hooks/useMembers";

interface DivisionFieldProps {
  control: Control<MemberFormValues>;
}

export function DivisionField({ control }: DivisionFieldProps) {
  return (
    <FormField
      control={control}
      name="division"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Division</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select division" />
              </SelectTrigger>
            </FormControl>
            <SelectContent
              position="popper"
              side="bottom"
              className="max-h-[200px]"
            >
              {DIVISIONS.map((division) => (
                <SelectItem key={division} value={division}>
                  {division}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}