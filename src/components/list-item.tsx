import * as React from "react"
import {Item} from '../types'
import {css} from '../utils/utils'

type ListItemProps = {
	item: Item
	onChange: (value: boolean, item: Item) => void
}

export const ListItem: React.FC<ListItemProps> = ({
	item,
	onChange,
}) => {

	const itemCss = css({
		ocListItem: true,
		ocListItemTicked: item.ticked,
	})

	return <div className={itemCss}>
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
