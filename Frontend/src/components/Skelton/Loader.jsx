import { Loader2 } from 'lucide-react';

export function Loader({ 
  size = 'lg', 
  text = 'Loading more contests...' 
}) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 gap-2">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-[hsl(210,100%,52%)]`} />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}