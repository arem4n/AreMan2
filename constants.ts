
import { PortfolioProject } from './types';
import { logoUrl, whiteLogoUrl } from './data/config';
import { aremanProject } from './data/projects/areman';
import { arem4nProject } from './data/projects/arem4n';
import { ostTechProject } from './data/projects/osttech';
import { albornozProject } from './data/projects/albornoz';
import { southSoftProject } from './data/projects/southsoft';
import { bm3Project } from './data/projects/bm3';
import { tommyBoxProject } from './data/projects/tommybox';

// Re-export logos for backward compatibility with components using constants.ts
export { logoUrl, whiteLogoUrl };

// Aggregate projects into the main array.
// El orden es el del carrusel de la portada y el de las pestañas de /portafolio
// (la primera es la que se abre por defecto): primero los clientes externos,
// después los proyectos familiares y al final la marca propia.
export const portfolioProjects: PortfolioProject[] = [
    albornozProject,
    ostTechProject,
    bm3Project,
    tommyBoxProject,
    southSoftProject,
    aremanProject,
    arem4nProject
];
