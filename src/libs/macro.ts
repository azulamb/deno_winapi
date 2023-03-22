import { Converter } from '../win_types.ts';

export const macro = {
	MAKELANGID: (p: WORD, s: WORD): LANGID => {
		return Converter.LANGID((s << 10) | p);
	},
};
