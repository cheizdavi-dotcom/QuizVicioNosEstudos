import React from 'react';

const IconExausto = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M3 7C3 5.89543 3.89543 5 5 5H17C18.1046 5 19 5.89543 19 7V17C19 18.1046 18.1046 19 17 19H5C3.89543 19 3 18.1046 3 17V7Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M22 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="6" y="8" width="4" height="8" rx="1" fill="currentColor" fillOpacity="0.3" stroke="currentColor"/>
        <path d="M13 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
    </svg>
);

export default IconExausto;