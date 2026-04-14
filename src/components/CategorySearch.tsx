import { ChangeEvent, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface CategorySearchProps {
  value: string;
  onValueChange: (nextValue: string) => void;
  categoryTitle: string;
  showDesktop?: boolean;
  showMobile?: boolean;
  mobileButtonClassName?: string;
}

export function CategorySearch({
  value,
  onValueChange,
  categoryTitle,
  showDesktop = true,
  showMobile = true,
  mobileButtonClassName,
}: CategorySearchProps) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const placeholder = `Buscar en ${categoryTitle}`;

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  };

  return (
    <div className={cn("w-full md:w-auto", !showDesktop && "w-auto md:w-auto")}>
      {showDesktop && (
        <div className="relative hidden md:block md:w-[320px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={value}
            onChange={handleSearchChange}
            placeholder={placeholder}
            className="pl-9"
            aria-label={`Buscar proyectos en ${categoryTitle}`}
          />
        </div>
      )}

      {showMobile && (
        <Dialog open={isMobileSearchOpen} onOpenChange={setIsMobileSearchOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className={cn("ml-auto flex md:hidden", mobileButtonClassName)}
              aria-label="Abrir buscador"
            >
              <Search className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[92vw] max-w-sm rounded-xl p-4">
            <DialogHeader className="space-y-1 text-left">
              <DialogTitle className="text-base">Buscar proyectos</DialogTitle>
              <DialogDescription className="text-xs">Filtra resultados dentro de {categoryTitle}.</DialogDescription>
            </DialogHeader>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                autoFocus
                value={value}
                onChange={handleSearchChange}
                placeholder={placeholder}
                className="pl-9"
                aria-label={`Buscar proyectos en ${categoryTitle}`}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
