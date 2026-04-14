import type { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { ProjectImage } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

interface GalleryProps {
  images: ProjectImage[];
  categorySlug: string;
}

export function Gallery({ images, categorySlug }: GalleryProps) {
  const navigate = useNavigate();

  const openProject = (imageId: string) => {
    navigate(`/${categorySlug}/${imageId}`);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>, imageId: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(imageId);
    }
  };

  return (
    <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(140px,1fr))] sm:gap-4 sm:[grid-template-columns:repeat(auto-fit,minmax(160px,1fr))] lg:[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
      {images.map((image) => (
        <div
          key={image.id}
          role="button"
          tabIndex={0}
          onClick={() => openProject(image.id)}
          onKeyDown={(event) => handleCardKeyDown(event, image.id)}
          aria-label={`Ver proyecto ${image.caption || image.alt}`}
          className="group cursor-pointer rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div className="relative w-full overflow-hidden rounded-xl border border-border bg-muted aspect-[4/3] transition-shadow duration-200 group-hover:[box-shadow:0_0_50px_-10px_rgba(0,0,0,0.15)]">
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />

            <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="mb-3 rounded-full px-5 shadow-sm pointer-events-none"
                tabIndex={-1}
                aria-hidden="true"
              >
                Solicitar
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
