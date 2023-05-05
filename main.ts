import {Plugin} from 'obsidian'
import { ListView, VIEW_TYPE } from './view'
import { accessSync, writeFileSync, readdirSync} from 'fs'

// Remember to rename these classes and interfaces!


export default class MyPlugin extends Plugin {
	async onload() {
		console.log('loading')
		await this.createDataFile()

		this.registerView(
			VIEW_TYPE,
			(leaf) => new ListView(leaf)
		)

		this.addCommand({
			id: "open-view",
			name: "Open List View",
			callback: () => {
				if (this.viewExists()) {
					this.addListView();
				} else {
					// TODO -> Diplay the view
					// this.app.workspace.revealLeaf(this.view.leaf);
				}
			}
		});

		this.addListView()

		this.registerMarkdownCodeBlockProcessor(
			'ingredient',
			async (source, el, ctx) => {
				const buttonHtml = '<button class="my-button">Add to list</button>'
				el.innerHTML = buttonHtml
			}
		)

	}

	onunload() {
		console.log('Unloading')
		this.app.workspace.detachLeavesOfType(VIEW_TYPE)
	}

	viewExists () {
		return this.app.workspace.getLeavesOfType(VIEW_TYPE).length
	}

	async addListView() {
		if (this.viewExists()) {
			return;
		}
		await this.app.workspace.getRightLeaf(false).setViewState({
			type: VIEW_TYPE
		});
	}

	async createDataFile() {
		// console.log(this.app.workspace.getActiveFile()?.parent?.path, this.app.vault.getRoot().vault.adapter.read
		const basePath = `${(this.app.vault.adapter as any).getBasePath()}/.obsidian/plugins/obsidian-chef/`
		try {
			await accessSync(`${basePath}/data.json`);
			console.log('File already exists!');
		} catch (error) {
			if (error.code === 'ENOENT') {
				console.log('File does not exist. Creating file...');
				await writeFileSync(`${basePath}/data.json`, '{}');
				console.log('File created!');
			} else {
				throw error
			}
		}
	}
}
