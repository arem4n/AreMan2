import React from 'react';

export interface CaseStudySection {
    title: string;
    content: (string | React.ReactNode)[];
    table?: {
        headers: string[];
        rows: (string | React.ReactNode)[][];
    };
    subsections?: {
        title: string;
        content: (string | React.ReactNode)[];
    }[];
}

export interface CaseStudyData {
    client: string;
    description: string; // Used for previews
    
    // Detailed content for the case study page
    title?: string; 
    subtitle?: string;
    sections?: CaseStudySection[];
}


export interface PortfolioProject {
    mainImg: string;
    altText: string;
    title: string;
    testimonial: string;
    clientName: string;
    clientRole: string;
    link: string;
    galleryImages: { src: string; alt: string }[];
    slug: string;
    caseStudy: CaseStudyData;
}