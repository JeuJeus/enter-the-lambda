# λ Enter the Lambda 

"_Enter the Lambda_", is a **fully text-based**, **single button controlled** video game.  
It aims to provide a classic arcade experience through its visuals.

![Enter the Lambda Screenshot](./doc/gameplay.gif)

# Documentation

## Screenshots
<div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
    <img src="./doc/screenshots/boot.png" alt="Enter the Lambda Screenshot" width="49%" style="margin-bottom: 10px;">
    <img src="./doc/screenshots/terminal.png" alt="Enter the Lambda Screenshot" width="49%" style="margin-bottom: 10px;">
    <img src="./doc/screenshots/start-screen.png" alt="Enter the Lambda Screenshot" width="49%" style="margin-bottom: 10px;">
    <img src="./doc/screenshots/gameplay.png" alt="Enter the Lambda Screenshot" width="49%" style="margin-bottom: 10px;">
    <img src="./doc/screenshots/game-over-screen.png" alt="Enter the Lambda Screenshot" width="49%" style="margin-bottom: 10px;">
</div>

## Constraints
- Fully text-based, using only Unicode characters, HTML, CSS for visuals.
- Built using only vanilla JavaScript, HTML, and CSS
  - No libraries or frameworks
- Controls are limited to a single key: _spacebar_
- Colors are limited to black and green (shades allowed)

## Style
- Retro style, reminiscent of early arcade games.
- Monospaced font to enhance the retro aesthetic.
- Essentially only two colors: _black_ and _green_
- Additional atmospheric elements are included:
  - CRT monitor
    - Scan-lines, Flickering, Glare, Chromatic aberration, Vignetting etc.
  - Bootup sequence
  - Preface Terminal
  - Authentic Stickers
  - Several popcultural Easter Eggs

## Description / Gameplay
- The game is controlled by pressing "Space" to jump.
- The objective is to avoid obstacles
- The player automatically 
  - ...climbs "the hills"
  - ...falls down "the hills"
- The game ends when the player hits an obstacle

## Difficulty
- Initially not being able to jump whilst falling came into the game as a bug, but now its a feature that adds to the difficulty.
- The game difficulty can be configured through `game-config.json`

# Open Tasks
- [ ] Make the game responsive / mobile-friendly