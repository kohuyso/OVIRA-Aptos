import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

export const FarmingIcon: React.FC<IconProps> = ({ ...props }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M2 8H4L10.2622 10.7397C11.2241 11.1605 11.6664 12.2784 11.2528 13.2434V13.2434C10.837 14.2136 9.71355 14.663 8.74342 14.2472L7 13.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M2.33541 16.3292C1.96493 16.1439 1.51442 16.2941 1.32918 16.6646C1.14394 17.0351 1.29411 17.4856 1.66459 17.6708L2 17L2.33541 16.3292ZM11.3354 13.3292L10.6646 12.9938L9.99377 14.3354L10.6646 14.6708L11 14L11.3354 13.3292ZM13.7331 15.3666L13.3977 16.0374L13.7331 15.3666ZM16.4164 16V16.75H18V16V15.25H16.4164V16ZM18 20V19.25H9.88854V20V20.75H18V20ZM6.31083 19.1554L6.64625 18.4846L2.33541 16.3292L2 17L1.66459 17.6708L5.97542 19.8262L6.31083 19.1554ZM13.7331 15.3666L14.0685 14.6957L11.3354 13.3292L11 14L10.6646 14.6708L13.3977 16.0374L13.7331 15.3666ZM9.88854 20V19.25C8.76302 19.25 7.65295 18.9879 6.64625 18.4846L6.31083 19.1554L5.97542 19.8262C7.19041 20.4337 8.53015 20.75 9.88854 20.75V20ZM20 18H19.25C19.25 18.6904 18.6904 19.25 18 19.25V20V20.75C19.5188 20.75 20.75 19.5188 20.75 18H20ZM18 16V16.75C18.6904 16.75 19.25 17.3096 19.25 18H20H20.75C20.75 16.4812 19.5188 15.25 18 15.25V16ZM16.4164 16V15.25C15.6014 15.25 14.7975 15.0602 14.0685 14.6957L13.7331 15.3666L13.3977 16.0374C14.335 16.506 15.3685 16.75 16.4164 16.75V16Z"
            fill="currentColor"
        />
        <circle cx="18" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

export const PersonalVaultIcon: React.FC<IconProps> = ({ ...props }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
            <path
                d="M18 9V8C18 6.89543 17.1046 6 16 6H8C6.89543 6 6 6.89543 6 8V16C6 17.1046 6.89543 18 8 18H16C17.1046 18 18 17.1046 18 16V15"
                stroke="currentColor"
                strokeWidth="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5C12.8284 13.5 13.5 12.8284 13.5 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path d="M13.5 12H18" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </svg>
);
