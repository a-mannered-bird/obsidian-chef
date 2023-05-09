import * as React from "react"
import {Item} from '../types'
import {css} from '../utils/utils'

type ListItemProps = {
	item: Item
	onChange: (newItem: Item) => void
}

export const ListItem: React.FC<ListItemProps> = ({
	item,
	onChange,
}) => {

	const itemCss = css({
		ocListItem: true,
		ocListItemTicked: item.ticked,
	})

	const onTickItem = () => {
		onChange({...item, ticked: !item.ticked})
	}

	const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const quantity = parseInt(event.target.value)
		onChange({...item, quantity})
	}

	const onQuantityIncrement = (isPositive: boolean) => {
		onChange({...item, quantity: item.quantity + (isPositive ? 1 : -1)})
	}

	return <div className={itemCss}>
		<input
			className="oc-list-item-checkbox"
			type="checkbox"
			checked={item.ticked}
			onChange={onTickItem}
		/>
		<span className="oc-list-item-quantity">
			<button
				className="oc-list-item-decrement"
				disabled={item.quantity <= 1}
				onClick={() => onQuantityIncrement(false)}
			>
				-
			</button>
			<input 
				type="number"
				min={1}
				value={item.quantity} 
				onChange={onQuantityChange}
				className="oc-list-item-quantity-input"
				style={{width: `${item.quantity.toString().length + 2}ch`}}
			/>
			<button
				className="oc-list-item-increment"
				onClick={() => onQuantityIncrement(true)}
			>
				+
			</button>
		</span>
		<span className="oc-list-item-name">{item.name}</span>
	</div>
}
