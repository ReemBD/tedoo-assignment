import { AppIcon } from '../models/app-icon.model';

export const getIconPath = (name: AppIcon, format?: string): string => {
  return `./assets/icons/${name}.${format || 'svg'}`;
};
