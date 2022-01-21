import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      mainBackgroundColor: string;
      mainTextColor: string;
      secondaryTextColor: string;
      error: string;
    };
    fonts: {
      primaryThin: string;
      primaryMedium: string;
      primaryBold: string;
      secondaryThin: string;
      secondaryMedium: string;
      secondaryBold: string;
    };
    fontSizes: {
      small: string;
      medium: string;
      large: string;
    };
    backgroundUrl: string;
  }
}
