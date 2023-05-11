import * as React from "react"
import {Icon, IconButton} from '.'
import {Item, DnDTypes} from '../types'
import {calculateStringCh, css} from '../utils/utils'
import { useDrag, useDrop } from 'react-dnd'

type ListItemProps = {
	item: Item
	onChange: (newItem: Item) => void
	onDelete: () => void
	moveCard: (item: Item) => void
}

export const ListItem: React.FC<ListItemProps> = ({
	item,
	moveCard,
	onChange,
	onDelete,
}) => {

	const [isEditing, setIsEditing] = React.useState(false)
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: DnDTypes.ITEM,
			item,
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
			// end: (item, monitor) => {
			// 	console.log('end', item, monitor);
			// 	const didDrop = monitor.didDrop()
			// 	if (!didDrop) {
			// 		moveCard(item)
			// 	}
			// },
		}),
		[item, moveCard],
	)

	// const [, drop] = useDrop(
	// 	() => ({
	// 		accept: DnDTypes.ITEM,
	// 		hover(draggedItem: Item) {
	// 			console.log('hover', draggedItem.name, item.name);
	// 			if (draggedItem.id !== item.id) {
	// 				moveCard(draggedItem)
	// 			}
	// 		},
	// 	}),
	// 	[moveCard],
	// )

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

	return <div
		className={itemCss}
		ref={(node) => drag(node)}
		style={{ opacity: isDragging ? 0 : 1 }}
	>
		<Icon 
			className="oc-list-item-drag-icon"
			name="drag"
			size="16px"
		/>

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
				style={{width: `${item.quantity.toString().length + 2.25}ch`}}
			/>
			<button
				className="oc-list-item-increment"
				onClick={() => onQuantityIncrement(true)}
			>
				+
			</button>
		</span>

		<div className="oc-list-item-name-wrapper">
			{isEditing ? 
				<input
					className="oc-list-item-name-editable"
					type="text"
					value={item.name}
					style={{width: `${calculateStringCh(item.name) + 1.5}ch`}}
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

	</div>
}
