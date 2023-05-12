import * as React from "react"
import {EditableInput, Icon} from '.'
import {Item, DnDTypes} from '../types'
import {css} from '../utils/utils'
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

	const [{isDragging}, drag] = useDrag(
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

	const [{isOver}, drop] = useDrop(
		() => ({
			accept: DnDTypes.ITEM,
			hover(draggedItem: Item) {
				if (draggedItem.id !== item.id) {
					console.log('hover', draggedItem.name, item.name);
					// moveCard(draggedItem)
				}
			},
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
			}),
		}),
		[moveCard],
	)

	const itemCss = css({
		ocListItem: true,
		ocListItemTicked: item.ticked,
		ocListItemIsOver: isOver && !isDragging,
		ocListItemIsDragging: isDragging,
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
		ref={(node) => drag(drop(node))}
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
			<EditableInput
				onValidate={(name) => onChange({...item, name})}
				onDelete={onDelete}
				value={item.name}
			>
				<span className="oc-list-item-name">{item.name}</span>
			</EditableInput>
		</div>

	</div>
}
