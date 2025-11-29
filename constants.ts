
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

// Aggregate projects into the main array
export const portfolioProjects: PortfolioProject[] = [
    aremanProject,
    arem4nProject,
    ostTechProject,
    albornozProject,
    southSoftProject,
    bm3Project,
    tommyBoxProject
];
