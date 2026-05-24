# Stopwatch & Timer App

A beginner-friendly React app that combines a stopwatch and a timer in one simple interface.

This project uses:

- **React** for building the user interface
- **TypeScript** for safer JavaScript code
- **Vite** for fast development and build tools
- **Tailwind CSS** for styling the UI

---

## What this app does

This app has two main views:

1. **Stopwatch**
   - Start timing
   - Pause timing
   - Reset the stopwatch
   - Save lap times

2. **Timer**
   - Enter a custom countdown duration
   - Start the countdown
   - Pause or reset the timer

The app switches between stopwatch and timer using a tab bar.

---

## How to use the app

### Run the project

Open a terminal in the project folder and run:

```bash
npm install
npm run dev
```

Then open the local address shown in the terminal, usually:

```bash
http://localhost:5173/
```

### Use the stopwatch

- Click **START** to begin timing
- Click **PAUSE** to stop the clock without clearing the time
- Click **RESET** to clear the time back to zero
- Click **LAP** while running to record a lap split

### Use the timer

- Enter the time you want to count down
- Click **START** to begin the countdown
- Click **PAUSE** to stop it temporarily
- Click **RESET** to set the timer back to zero

---

## Project structure explained

This app is organized so beginners can follow the code easily.

```text
src/
 ├── app/
 │   └── App.tsx          # Main application component
 ├── components/          # Reusable UI pieces
 │   ├── stopwatch/        # Stopwatch screen and lap list
 │   ├── timer/            # Timer screen and setup controls
 │   └── ui/               # Shared UI components like buttons and tabs
 ├── hooks/               # Custom React hooks for stopwatch and timer behavior
 ├── styles/              # CSS files and Tailwind setup
 ├── types/               # TypeScript type definitions
 ├── utils/               # Helper code like time formatting
 └── main.tsx             # App entry point
```

### Important files

- `src/main.tsx`
  - This starts the React app and loads the styles.

- `src/app/App.tsx`
  - This is the main screen that chooses between the stopwatch and timer views.

- `src/components/stopwatch/Stopwatch.tsx`
  - The stopwatch interface and controls.

- `src/components/stopwatch/LapList.tsx`
  - Shows saved lap times when the user clicks **LAP**.

- `src/components/timer/Timer.tsx`
  - The timer view with countdown logic.

- `src/components/timer/TimerSetup.tsx`
  - Lets the user enter a custom time.

- `src/components/ui/Button.tsx`
  - A reusable button component used across the app.

- `src/components/ui/TabBar.tsx`
  - The tabs that switch between stopwatch and timer.

- `src/hooks/useStopwatch.ts`
  - Keeps track of time and controls the stopwatch behavior.

- `src/hooks/useTimer.ts`
  - Manages timer countdown and user input.

- `src/utils/time.ts`
  - Converts milliseconds into a readable format like `00:00.00`.

- `src/styles/index.css`
  - Loads the app's CSS and Tailwind styling.

---

## Useful commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies needed to run the app |
| `npm run dev` | Start the app in development mode |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the built app locally |
| `npm run lint` | Check the code style and find problems |

---

## Notes for beginners

- The app code is in the `src` folder.
- Components are small pieces of the interface.
- Hooks are where the timer logic lives.
- If you want to change the design, edit the CSS files under `src/styles`.
- If you want to add a new button or screen, create a new component in `src/components`.

---

## Learning tips

- Open `src/app/App.tsx` first to see how the app is displayed.
- Then read `src/components/stopwatch/Stopwatch.tsx` and `src/hooks/useStopwatch.ts` to understand how the stopwatch works.
- Use the browser console if the app does not appear correctly — it often shows helpful error messages.

---

## License

This project is for learning and practicing React, TypeScript, and Vite.
