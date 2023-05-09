import * as React from 'react';
import {Icon} from '.'

type IconButtonProps = React.ComponentPropsWithRef<`button`> & {
	name: string
}

export const IconButton: React.FC<IconButtonProps> = ({
	className,
	name,
	...props
}) => {
  return <button className={`oc-icon-button ${className || ''}`} {...props}>
    <Icon name={name} size="16px" />
  </button>;
}
