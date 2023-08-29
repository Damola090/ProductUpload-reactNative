
const FontConstants: {
  familyRegular: string;
  sizeTitle: number;
  sizeRegular: number;
  sizeMedium: number;
  sizeBig: number;
  weightBold:
  | 'bold'
  | 'normal'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
} = {
  familyRegular: 'sans-serif',
  sizeTitle: 18,
  sizeRegular: 14,
  sizeMedium: 18,
  sizeBig: 22,
  weightBold: 'bold',
};


const ColorConstants: {
  backgroundDeepPalette: string;
  backgroundLightPalette: string;
  backgroundMedium: string;
  lightFont: string;
  darkFont: string;
} = {
  backgroundDeepPalette: 'green',
  backgroundLightPalette: '#C7EECE',
  backgroundMedium: '#9FD3A8',
  lightFont: '#FFFFFF',
  darkFont: '#000000',
};

  const SizeConstants: {
    paddingSmall: number;
    paddingRegular: number;
    paddingLarge: number;
    borderRadius: number;
  } = {
    paddingSmall: 2,
    paddingRegular: 8,
    paddingLarge: 16,
    borderRadius: 8,
};

export { FontConstants, ColorConstants, SizeConstants }