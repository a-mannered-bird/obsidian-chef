import * as React from "react"
import {Item} from '../types'

type ListItemProps = {
	item: Item
	onChange: (value: boolean, item: Item) => void
}

export const ListItem: React.FC<ListItemProps> = ({
	item,
	onChange,
}) => {
	return <div className="oc-list-item">
		<input
			className="oc-list-item-checkbox"
			type="checkbox"
			checked={item.ticked}
			onChange={() => onChange(!item.ticked, item)}
		/>
		<span className="oc-list-item-quantity">{item.quantity}</span>
		<span className="oc-list-item-name">{item.name}</span>
	</div>
}
