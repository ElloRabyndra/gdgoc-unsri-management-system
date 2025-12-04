"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { type Member } from "@/types";
import { memberSchema, type MemberFormValues } from "@/hooks/useMembersData";
import { NameField } from "./field/NameField";
import { EmailField } from "./field/EmailField";
import { DivisionField } from "./field/DivisionField";
import { RoleStatusFields } from "./field/RoleStatusFields";
import { JoinDateField } from "./field/JoinDateField";

interface MemberFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member?: Member | null;
  onSubmit: (data: MemberFormValues) => void;
  isLoading?: boolean;
}

export function MemberForm({
  open,
  onOpenChange,
  member,
  onSubmit,
  isLoading,
}: MemberFormProps) {
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: member?.name || "",
      email: member?.email || "",
      division: member?.division || "",
      role: member?.role || "",
      status: member?.status || "",
      joinDate: member?.joinDate || new Date(),
    },
  });

  const handleSubmit = (data: MemberFormValues) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] animate-scale-in">
        <DialogHeader>
          <DialogTitle>{member ? "Edit Member" : "Add New Member"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <NameField control={form.control} />
            <EmailField control={form.control} />
            <DivisionField control={form.control} />
            <RoleStatusFields control={form.control} />
            <JoinDateField control={form.control} />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {member ? "Update" : "Add"} Member
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
