import { accessSync, writeFileSync, readFileSync } from 'fs'
import defaultData from './default-db'
import {PluginData} from '../types'

export async function getRoot() {
	return `${(this.app.vault.adapter as any).getBasePath()}/.obsidian/plugins/obsidian-chef/`
}

export async function createDataFile() {
	// console.log(this.app.workspace.getActiveFile()?.parent?.path, this.app.vault.getRoot().vault.adapter.read
	const root = await getRoot()
	try {
		accessSync(`${root}/data.json`)
	} catch (error) {
		if (error.code === 'ENOENT') {
			console.log('File does not exist. Creating file...')
			writeFileSync(`${root}/data.json`, defaultData)
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
