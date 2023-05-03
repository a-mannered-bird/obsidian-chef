import { MarkdownPostProcessorContext, Plugin } from 'obsidian';

// Remember to rename these classes and interfaces!


export default class MyPlugin extends Plugin {
	async onload() {
		console.log('loading');
		this.registerMarkdownPostProcessor(this.processButton.bind(this));
		this.registerMarkdownCodeBlockProcessor(
      "ingredient",
      async (source, el, ctx) => {
				const buttonHtml = '<button class="my-button">Add to list</button>';
        el.innerHTML = buttonHtml;
      }
    );
	}

	async processButton(el: HTMLElement, ctx: MarkdownPostProcessorContext) {
		console.log('processButton', el);
		const regex = /my-special-button`/g;
		const buttonHtml = '<button class="my-button">Add to list</button>';

		el.querySelectorAll('*').forEach((paragraph) => {
			const innerHtml = paragraph.innerHTML;
			if (innerHtml.match(regex)) {
				const newHtml = innerHtml.replace(regex, buttonHtml);
				paragraph.innerHTML = newHtml;
			}
		});
	}

	onunload() {
		console.log('Unloading');
	}

}
