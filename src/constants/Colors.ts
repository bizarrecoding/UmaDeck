/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#16953a';
const tintColorDark = '#528e63';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    panel: '#CCCDCE',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    panel: '#333333',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const tintMap: Record<Stat,string> = {
  "speed": "#34a0f9",
  "stamina": "#ea5c5c",
  "power": "#f09834",
  "guts": "#ea4899",
  "wit": "#089d6b",
  "intelligence":"#089d6b",
  "friend": "#ddc515",
}