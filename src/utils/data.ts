import { accessSync, writeFileSync, readFileSync } from 'fs'
import defaultData from './default-db'
import {PluginData, Category, Settings, Item} from '../types'

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

export const setItems = async (data: PluginData, items: (Item | Category)[], type: 'items' | 'categories') => {
	items.forEach((item) => {
		const index = data.list[type].findIndex(i => i.id === item.id)
		if (index === -1) {
			data.list[`${type}Count`]++
			item.id = item.order = data.list[`${type}Count`]
			data.list[type].push(item as any)
		} else {
			data.list[type][index] = item
		}
	})

	await writeData(data)
	return data
}

export const deleteItem = async (data: PluginData, itemId: number, type: 'items' | 'categories') => {
	const index = data.list[type].findIndex(i => i.id === itemId)
	if (index !== -1) {
		data.list[type].splice(index, 1)
	}

	// Unlink items linked to the deleted category
	if (type === 'categories') {
		data.list.items = data.list.items.map((i) => {
			if (i.categoryId === itemId) return {...i, categoryId: -1}
			return i
		})
	}

	await writeData(data)
	return data
}

export const setSettings = async (data: PluginData, settings: Settings) => {
	data.settings = settings
	await writeData(data)
	return data
}
