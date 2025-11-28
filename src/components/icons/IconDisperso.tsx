import React from 'react';

const IconDisperso = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M22 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 12H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4.92993 4.92993L7.75993 7.75993" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M19.07 4.92993L16.24 7.75993" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7.75993 16.24L4.92993 19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M15 9L18 6M18 6H15M18 6V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeJoin="round"/>
    <path d="M9 15L6 18M6 18H9M6 18V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeJoin="round"/>
  </svg>
);

export default IconDisperso;
