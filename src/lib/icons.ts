/**
 * Centralized icon registry — maps the string icon names used in data.ts
 * to actual Lucide icon components so sections can render dynamically.
 */
import {
  Users,
  Truck,
  Factory,
  Fuel,
  ConciergeBell,
  Tractor,
  Forklift,
  Construction,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Users,
  Truck,
  Factory,
  Fuel,
  ConciergeBell,
  Tractor,
  Forklift,
  Construction,
  Zap,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Users;
}
