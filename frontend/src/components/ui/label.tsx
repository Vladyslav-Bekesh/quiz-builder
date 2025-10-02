import * as React from "react";
import { Label } from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

const LabelWrapper = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> & {
    className?: string;
  }
>(({ className, ...props }, ref) => {
  return (
    <Label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-200",
        className
      )}
      {...props}
    />
  );
});
LabelWrapper.displayName = Label.displayName;

export { LabelWrapper };

