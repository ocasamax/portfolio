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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <Button
          key={image.id}
          variant="ghost"
          onClick={() => openProject(image.id)}
          className="group h-auto p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl hover:bg-transparent"
        >
          <div className="overflow-hidden rounded-xl bg-muted aspect-[4/3] border border-border transition-shadow duration-200 group-hover:[box-shadow:0_0_50px_-10px_rgba(0,0,0,0.15)] w-full">
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>
        </Button>
      ))}
    </div>
  );
}
