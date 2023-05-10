import * as React from "react"
import {Icon, IconButton} from '.'
import {Item} from '../types'
import {css} from '../utils/utils'

type ListItemProps = {
	item: Item
	onChange: (newItem: Item) => void
	onDelete: () => void
}

export const ListItem: React.FC<ListItemProps> = ({
	item,
	onChange,
	onDelete,
}) => {

	const [isEditing, setIsEditing] = React.useState(false)

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

		{isEditing ? 
			<input
				type="text"
				value={item.name}
				onChange={(event) => onChange({...item, name: event.target.value})}
			/> : <span className="oc-list-item-name">{item.name}</span>
		}

		{!isEditing && <Icon 
			className="oc-list-item-edit"
			name="edit"
			size="18px"
			onClick={() => setIsEditing(true)}
		/>}

		{isEditing && <IconButton 
			className="oc-list-item-edit"
			name="tick"
			onClick={() => setIsEditing(false)}
		/>}

		{isEditing && <IconButton
			name="delete"
			onClick={onDelete}
		/>}

	</div>
}
