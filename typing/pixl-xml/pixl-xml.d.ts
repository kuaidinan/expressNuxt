declare module 'pixl-xml' {
	export interface Option {
		lowerCase?: boolean;
		preserveAttributes?: boolean;
	}
	
	function parse(xmlStr: string, option?: Option): any;
	function stringify(obj: any, name: string) : string;
	
	function encodeEntities(xml: string): string;
	function encodeAttribEntities(xml: string): string;
	function decodeEntities(xml: string): string;
	
	function numKeys(key: string): number;
	
	
}