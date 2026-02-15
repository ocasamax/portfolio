import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, MessageCircle, Send } from "lucide-react";

interface ContactCardProps {
  name?: string;
  role?: string;
  avatarUrl?: string;
  whatsappUrl?: string;
  emailUrl?: string;
  telegramUrl?: string;
  compact?: boolean;
}

export function ContactCard({
  name = "Oscar Mauricio",
  role = "Diseñador gráfico - UX/UI",
  avatarUrl = "/src/img/icono_black.png",
  whatsappUrl = "https://wa.me/",
  emailUrl = "mailto:hello@portfolio.com",
  telegramUrl = "https://t.me/",
  compact = false,
}: ContactCardProps) {
  if (compact) {
    return (
      <div className="flex flex-col items-center gap-3 px-2 py-4 border-t border-border/50">
        <Avatar className="h-12 w-12 ring-2 ring-primary/20">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={name} />
          ) : (
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
              {name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="text-center">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            {name}
          </h2>
          <Badge
            variant="secondary"
            className="mt-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
          >
            {role}
          </Badge>
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
            asChild
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
            asChild
          >
            <a href={emailUrl}>
              <Mail className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
            asChild
          >
            <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
              <Send className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-sm border border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-col items-center gap-4 pb-4">
        <Avatar className="h-24 w-24 ring-2 ring-primary/20">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={name} />
          ) : (
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
              {name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="text-center">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {name}
          </h2>
          <Badge
            variant="secondary"
            className="mt-2 rounded-full px-3 py-1 text-xs font-medium"
          >
            {role}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Button
          variant="outline"
          className="w-full justify-start gap-3 rounded-xl border-border/50 hover:bg-primary hover:text-primary-foreground transition-colors"
          asChild
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" />
            Contactar por WhatsApp
          </a>
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start gap-3 rounded-xl border-border/50 hover:bg-primary hover:text-primary-foreground transition-colors"
          asChild
        >
          <a href={emailUrl}>
            <Mail className="h-4 w-4" />
            Contactar por correo
          </a>
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start gap-3 rounded-xl border-border/50 hover:bg-primary hover:text-primary-foreground transition-colors"
          asChild
        >
          <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
            <Send className="h-4 w-4" />
            Contactar por Telegram
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
