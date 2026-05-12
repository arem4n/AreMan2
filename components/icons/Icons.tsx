
import React from 'react';
import { Icon, IconName } from './Icon';

export { Icon };
export type { IconName };

interface IconProps {
    className?: string;
    size?: number;
}

export const ChevronLeftIcon: React.FC<IconProps> = ({ className = "h-6 w-6", size = 24 }) => (
    <Icon name="ui-chevron-left" className={className} size={size} />
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className = "h-6 w-6", size = 24 }) => (
    <Icon name="ui-chevron-right" className={className} size={size} />
);

export const CloseIcon: React.FC<IconProps> = ({ className = "h-6 w-6", size = 24 }) => (
    <Icon name="ui-close" className={className} size={size} />
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className = "h-6 w-6", size = 24 }) => (
    <Icon name="ui-arrow-right" className={className} size={size} />
);

// Note: Pause and Play are specific to some interactions, but we've unified UI icons.
// If needed, they can be added to Icon.tsx icons object.

