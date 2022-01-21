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
    fonts: array<string>;
    fontSizes: {
      small: string;
      medium: string;
      large: string;
    };
    backgroundUrl: string;
  }
}
