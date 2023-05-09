import { Plugin } from 'obsidian'
import { ListView, VIEW_TYPE } from './view'
import { writeData } from './utils/data'

// Remember to rename these classes and interfaces!


export default class MyPlugin extends Plugin {
	async onload() {
		console.log('loading')
		await writeData()

		this.registerView(
			VIEW_TYPE,
			(leaf) => new ListView(leaf)
		)

		this.addRibbonIcon('checkbox-glyph', 'Open Obsidian Chef list', () => {
			this.addListView()
		})

		this.addCommand({
			id: "open-view",
			name: "Open List View",
			callback: () => {
				this.addListView()
			}
		});

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
		// this.app.workspace.detachLeavesOfType(VIEW_TYPE)
	}

	viewExists () {
		return this.app.workspace.getLeavesOfType(VIEW_TYPE).length
	}

	async addListView() {
		if (this.viewExists()) {
			this.app.workspace.revealLeaf(this.app.workspace.getLeavesOfType(VIEW_TYPE)[0])
			return;
		}
		await this.app.workspace.getLeaf(true).setViewState({ 
			type: VIEW_TYPE
		});
		this.app.workspace.revealLeaf(this.app.workspace.getLeavesOfType(VIEW_TYPE)[0])
	}

}
