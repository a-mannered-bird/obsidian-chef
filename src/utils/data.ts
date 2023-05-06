import { accessSync, writeFileSync, readFileSync } from 'fs'
import defaultData from './default-db'
import {PluginData, Item} from '../types'

export async function getRoot() {
	return `${(this.app.vault.adapter as any).getBasePath()}/.obsidian/plugins/obsidian-chef/`
}

export async function writeData(data?: PluginData) {
	const root = await getRoot()
	try {
		accessSync(`${root}/data.json`)
		if (data) {
			writeFileSync(`${root}/data.json`, JSON.stringify(data))
		}
	} catch (error) {
		if (error.code === 'ENOENT') {
			console.log('File does not exist. Creating file...')
			writeFileSync(`${root}/data.json`, data ? JSON.stringify(data) : defaultData)
			console.log('File created!')
		} else {
			throw error
		}
	}
}

export async function getData(): Promise<PluginData> {
	const root = await getRoot()
	const data = readFileSync(`${root}/data.json`, 'utf8')
	return JSON.parse(data)
}

export const setItem = async (data: PluginData, item: Item) => {
	const index = data.list.items.findIndex(i => i.id === item.id)
	if (index === -1) {
		data.list.itemsCount++
		item.id = data.list.itemsCount
		data.list.items.push(item)
	} else {
		data.list.items[index] = item
	}
	await writeData(data)
	return data
}
