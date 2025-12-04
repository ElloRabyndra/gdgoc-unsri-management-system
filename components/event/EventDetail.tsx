import { format } from 'date-fns';
import { Calendar, Users, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { type Event, type Member } from '@/types';

interface EventDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: Event | null;
  members: Member[];
  onEdit: () => void;
  onDelete: () => void;
}

export function EventDetail({ open, onOpenChange, event, members, onEdit, onDelete }: EventDetailProps) {
  if (!event) return null;

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Done':
        return 'success';
      case 'On Going':
        return 'blue';
      case 'Pending':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const getTypeVariant = (type: string) => {
    return type === 'Online' ? 'blue' : 'green';
  };

  const committeeMembers = members.filter((m) => event.committee.includes(m.id));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl">{event.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant={getTypeVariant(event.type)}>{event.type}</Badge>
            <Badge variant={getStatusVariant(event.status)}>{event.status}</Badge>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(event.date, 'EEEE, MMMM d, yyyy')}</span>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">{event.description}</p>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-4 w-4" />
              <h4 className="font-medium">Committee ({committeeMembers.length})</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {committeeMembers.map((member) => (
                <Badge key={member.id} variant="gray">
                  {member.name}
                </Badge>
              ))}
              {committeeMembers.length === 0 && (
                <span className="text-sm text-muted-foreground">No committee members assigned</span>
              )}
            </div>
          </div>

          <Separator />

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
