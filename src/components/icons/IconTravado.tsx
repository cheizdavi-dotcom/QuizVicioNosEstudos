import React from 'react';

const IconTravado = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="1" fill="currentColor"/>
    <path d="M3 14H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M19 14H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default IconTravado;