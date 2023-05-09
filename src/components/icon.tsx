import * as React from 'react';

type IconProps = React.ComponentPropsWithRef<svg> & {
	name: string
	size?: string
}

const icons = {
	edit: <g><path id="Vector" d="M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g>,
	delete: <g><path d="M10 11V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> <path d="M4 7H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g>,
} as Record<string, JSX.Element>

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
