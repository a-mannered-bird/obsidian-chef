import * as React from "react"
import {EditableInput, Icon} from '.'
import {Item, DnDTypes} from '../types'
import {css} from '../utils/utils'
import { useDrag, useDrop } from 'react-dnd'

type ListItemProps = {
	item: Item
	canDrag: boolean
	dropOnItem: (droppedItem: Item) => void
	onChange: (newItem: Item) => void
	onDelete: () => void
}

export const ListItem: React.FC<ListItemProps> = ({
	item,
	canDrag,
	dropOnItem,
	onChange,
	onDelete,
}) => {

	const [{isDragging}, drag] = useDrag(
		() => ({
			canDrag,
			type: DnDTypes.ITEM,
			item,
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
		}),
		[item, canDrag, dropOnItem],
	)

	const [{isOver, categoryIsDragging}, drop] = useDrop(
		() => ({
			accept: DnDTypes.ITEM,
			drop: (droppedItem: Item) => {
				if (canDrag) {
					dropOnItem(droppedItem)
				}
			},
			collect: (monitor) => ({
				categoryIsDragging: !!monitor.getItem() && monitor.getItemType() === DnDTypes.CATEGORY,
				isOver: !!monitor.isOver(),
			}),
		}),
		[item, canDrag, dropOnItem],
	)

	const itemCss = css({
		ocListItem: true,
		ocListItemTicked: item.ticked,
		ocListItemCanDrag: canDrag,
		ocListItemIsOver: canDrag && isOver && !isDragging,
		ocListItemIsDragging: canDrag && isDragging,
		ocListItemIsInvisible: categoryIsDragging,
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
