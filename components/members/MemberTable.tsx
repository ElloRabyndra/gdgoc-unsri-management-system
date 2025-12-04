import { format } from 'date-fns';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { type Member } from '@/types';

interface MemberTableProps {
  members: Member[];
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
}

export function MemberTable({ members, onEdit, onDelete }: MemberTableProps) {
  const getStatusVariant = (status: string) => {
    return status === 'Active' ? 'green' : 'red';
  };

  const getRoleVariant = (role: string) => {
    switch (role) {
      case 'Executive':
        return 'default';
      case 'Core Team':
        return 'blue';
      default:
        return 'gray';
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Division</TableHead>
              <TableHead className="font-semibold">Role</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Join Date</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell className="text-muted-foreground">{member.email}</TableCell>
                <TableCell>
                  <Badge variant="blue" className="truncate">{member.division}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getRoleVariant(member.role)} className="whitespace-nowrap">{member.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(member.status)}>{member.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(member.joinDate, 'MMM d, yyyy')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(member)}
                      aria-label="Edit member"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(member)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      aria-label="Delete member"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
