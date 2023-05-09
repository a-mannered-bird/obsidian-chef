import * as React from "react";
import {ListItem} from './components/list-item'
import {getData, setItem} from './utils'
import {PluginData, Item} from './types'

export const ListApp = () => {
	const [data, setData] = React.useState<PluginData|null>(null)

	React.useEffect(() => {
		getData().then((value) => {
			setData(value)
		})
	}, [])

	const onChangeItem = (newItem: Item) => {
		if (!data) return
		setItem({...data}, newItem).then((newData) => {
			setData(newData)
		})
	}

	const displayItems = (items: Item[]) => {
		return items.map((item) => {
			return <ListItem
				key={`item-${item.id}`}
				item={item}
				onChange={onChangeItem}
			/>
		})
	}

	const items = displayItems(data?.list?.items || [])

	return (<>
		<h4>Obsidian Chef List</h4>
		{items}
	</>)
};
