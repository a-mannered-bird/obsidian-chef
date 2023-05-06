
export const toKebabCase = (str: string): string => (
	str.replace(/[A-Z_]/g, letter => `-${letter.toLowerCase()}`)
)

type cssParams = Record<string, boolean>
type css = (params: cssParams) => string

export const css: css = (params) => {
	return Object
		.entries(params)
		.reduce((acc, [key, value]) => {
			return value === true ? acc.concat(` ${toKebabCase(key)}`) : acc
		}, ``)
		.trim()
}
