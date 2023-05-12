import * as React from 'react';


const icons = {
	add: <g><path id="Vector" d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="var(--text-normal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g>,
	drag: <g><path d="M10,6H6V2h4V6z M18,2h-4v4h4V2z M10,10H6v4h4V10z M18,10h-4v4h4V10z M10,18H6v4h4V18z M18,18h-4v4h4V18z"/></g>,
	edit: <g><path id="Vector" d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001" stroke="var(--text-normal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g>,
	delete: <g><path d="M10 11V17" stroke="var(--text-normal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11V17" stroke="var(--text-normal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 7H20" stroke="var(--text-normal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="var(--text-normal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="var(--text-normal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g>,
	tag: <g><path d="M4 6C4 3.79086 5.79086 2 8 2H9C9.55228 2 10 2.44772 10 3C10 3.55228 9.55228 4 9 4H8C6.89543 4 6 4.89543 6 6V20.0568L10.8375 16.6014C11.5329 16.1047 12.4671 16.1047 13.1625 16.6014L18 20.0568V13C18 12.4477 18.4477 12 19 12C19.5523 12 20 12.4477 20 13V20.0568C20 21.6836 18.1613 22.6298 16.8375 21.6843L12 18.2289L7.16248 21.6843C5.83874 22.6298 4 21.6836 4 20.0568V6Z" fill="var(--text-normal)"/> <path d="M17 3C17 2.44772 16.5523 2 16 2C15.4477 2 15 2.44772 15 3V5H13C12.4477 5 12 5.44772 12 6C12 6.55228 12.4477 7 13 7H15V9C15 9.55228 15.4477 10 16 10C16.5523 10 17 9.55228 17 9V7H19C19.5523 7 20 6.55228 20 6C20 5.44772 19.5523 5 19 5H17V3Z" fill="var(--text-normal)"/></g>,
	tick: <g><path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="var(--text-normal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g>,
} as Record<string, JSX.Element>

type IconProps = React.ComponentPropsWithRef<'svg'> & {
	name: keyof typeof icons
	size?: string
}

export const Icon: React.FC<IconProps> = ({
	className,
	name,
	size = '14px',
	...props
}) => {
  return <svg {...props} className={`oc-icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		{icons[name]}
	</svg>
}
