import { services } from "@/lib/data";
import { ServiceDetailClient } from "@/components/sections/service-detail-client";

interface ServiceDetailProps {
  slug: string;
  children?: React.ReactNode;
}

export function ServiceDetail({ slug, children }: ServiceDetailProps) {
  const service = services.find((s) => s.slug === slug);
  if (!service) {
    return (
      <div className="pt-32 pb-20 text-center">
        <p className="text-muted-foreground">Service not found.</p>
      </div>
    );
  }

  return (
    <ServiceDetailClient service={service}>
      {children}
    </ServiceDetailClient>
  );
}
