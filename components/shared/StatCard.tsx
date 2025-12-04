import { type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconColor?: 'blue' | 'red' | 'green' | 'yellow';
  className?: string;
}

const iconColorClasses = {
  blue: 'bg-primary/10 text-primary',
  red: 'bg-destructive/10 text-destructive',
  green: 'bg-success/10 text-success',
  yellow: 'bg-warning/10 text-warning',
};

export function StatCard({ title, value, icon: Icon, iconColor = 'blue', className }: StatCardProps) {
  return (
    <Card className={cn('animate-fade-in', className)}>
      <CardContent className="flex items-center gap-4 p-6">
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-lg', iconColorClasses[iconColor])}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
