
import React from 'react';
import { Icon } from './Icon';

export const BackArrowIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <Icon name="ui-chevron-left" className={className} />
);

export const HomeIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <Icon name="deliverable-logo" className={className} /> // Closest geometric match for home/logo in the new system
);

// Semantic Icons for LogoCodex
export const SemioticsIcon: React.FC = () => (
    <Icon name="codex-semiotica" size={48} />
);

export const LayersIcon: React.FC = () => (
    <Icon name="services-autoridad" size={48} /> // Auth icons are layers
);

export const ArchetypeIcon: React.FC = () => (
    <Icon name="codex-arquetipos" size={48} />
);

export const BookIcon: React.FC = () => (
    <Icon name="codex-narrativa" size={48} />
);

export const GridIcon: React.FC = () => (
    <Icon name="deliverable-iconografia" size={48} />
);

export const ChevronLeftIcon: React.FC = () => (
    <Icon name="ui-chevron-left" size={24} />
);

export const ChevronRightIcon: React.FC = () => (
    <Icon name="ui-chevron-right" size={24} />
);

