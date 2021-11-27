# Stackeer

![](https://user-images.githubusercontent.com/20091329/143721297-b99c2ceb-7b8b-4047-9f76-156886209df7.png)

## Install & RUN:

1. Make sure you've got all the nedded for DEV environment, if not, please check https://reactnative.dev/docs/environment-setup
2. Clone repo `git clone https://github.com/dsemennyuk/stackeer.git`
3. Install packages `npm i`
4. Install Pods. if you are using npx - `npx pod-install ios` if not - `cd ios && pod install && cd ..`
5. Run project
   IOS: `npx react-native run-ios` or `react-native run-ios`
   Android: open project in android studio and make sure all the gradle properties installed correctly,
   run project using android studio "Run" btn or `npx run-android` from terminal

**NOTICE: for best user experience with smooth animation, I suggest to run project on real device, do not use chrome debugger, it might make aniations slower and sharp
For ios users don't forget to sign profile before running on real device
**

# UI stack

No specific UI libraries was installed.
I had a lot of fun to work with vanilla RN components.

- Layout - common RN's components: View, FlatList, StyleSheet, SafeAreaView
- Animation - react-native-reanimated v2
- Testing - @testing-library/react-hooks, @testing-library/react-native
- Utils: moment-js

# Feature descripton

**Main screen contains:**

1. Change color scheme button - onPress changing color scheme (obvious)
2. About us button - onPress showing 'about us' webView (dont be RickRolled)
3. Search input - animated search input, partiallyinspired by https://dribbble.com/shots/15034871-Search-Animation-Shot. - on icon press, resizing to normal input. If input data is valid (only numbers), user allowed to make a search by pressing seatch icon

**User details screen contains:**

1. User card with name, reputation, badges etc.
2. User's question Flatlist with title, answered or not badge, and link for webView (on link click webView with question appearing)
3. Change color scheme button - onPress changing color scheme (obvious)
4. "OMG WANNA SEE IT AGAIN BTN" - this is if you want to make all the process from the beggining (or be RickRolled again XD)

# MISC:

## Animations:

For animation 'react-native-reanimated-v2' used.
AIl the animations/related calculations (such row 60 for instance)
are computed by UI thread and not affecting JS-thread by using 'worklets'
See more: https://blog.swmansion.com/introducing-reanimated-2-752b913af8b3

## Tests

No specific description here. For testing @react-testing-library was chosen.
Testing Example located in `src/screens/__tests__/MainScreen.test.tsx`

## CI

Just played a bit with GitHub Actions, cool thing, for CI in this project only TS compiler and Test run.

## QA:

Tested on Iphone 12 (Simulator), Iphone 12 Pro Max (real device), Samsung S10 (real device)

## Improvements

Oh, I decided that I will put here this topic, cause otherwise I will just never stop coding XD
So, from POV of MVP - this project is quite good, from Product POV it must me imroved, and there are topics:

1. Error handling - I added just simple error catcher for only one api request. Should more generilzed and improved.
2. UI scale on small devices - some text suppose to be cutted in terms of making UI prettier on small screens
3. Testing - no comments - All components should be covered by UT, also will be good to use "Test project" - https://testproject.io/ or at least Detox for e2e.
4. UX improvements
   e.g. - It will be good to have a "springified" flatlist for questions entities, sticky header for user info, using gesture handler and reanimated.
5. Refactor/Tech debts
