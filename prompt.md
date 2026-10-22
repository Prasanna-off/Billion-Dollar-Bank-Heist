# BILLION DOLLAR BANK HEIST — FULL 3D INTERACTIVE GAME
## Master Vibe-Coding Prompt

You are an expert full-stack developer, 3D web-game developer, UI/UX designer, animation designer, audio engineer, and software architect.

Build a complete, polished, responsive, browser-based 3D interactive game called:

# BILLION DOLLAR BANK HEIST
### "Can You Crack the Vault?"

This is NOT a simple quiz, form, Java console application, or static website.

It must feel like a small cinematic 3D game/exhibition experience that school and college students can play interactively.

The application must be fully runnable, testable, responsive, and polished.

---

# 1. CORE OBJECTIVE

Create a cinematic 3D bank-heist experience where the player:

1. Starts outside a bank.
2. Approaches and enters the bank.
3. Moves through the bank interior.
4. Travels through a secure corridor toward the vault.
5. Reaches a giant high-security vault.
6. Interacts with the vault lock terminal.
7. Receives clues for a password.
8. Gets exactly 3 attempts to crack the password.
9. Starts with a prize of ₹1,000,000,000 (1 Billion).
10. Loses half the prize after each incorrect attempt.
11. Wins by entering the correct password.
12. Loses completely after the third incorrect attempt.
13. Gets a cinematic vault-opening sequence if successful.
14. Gets an alarm/explosion/WASTED sequence if unsuccessful.
15. Can restart and receive the next password challenge.
16. Has exactly 3 password challenges that rotate:
    Challenge 1 → Challenge 2 → Challenge 3 → Challenge 1 → ...

The game must feel cinematic, interactive, fun, dramatic, and suitable for an exhibition.

---

# 2. IMPORTANT DEVELOPMENT RULE

Do not merely explain the implementation.

Actually BUILD the application.

You must:

- create the project
- create the source files
- create the components
- create the game state
- create the 3D scenes
- create the UI
- create animations
- create audio handling
- create the admin screen
- create persistence
- run the project
- test it
- fix errors
- verify the complete game flow

Do not stop after creating a basic prototype.

If an asset is unavailable, create a procedural/placeholder version that still looks polished and functional.

---

# 3. RECOMMENDED TECHNOLOGY

Prefer a modern web stack:

- React
- TypeScript
- Vite
- Three.js
- @react-three/fiber
- @react-three/drei
- Framer Motion or GSAP for UI/cinematic transitions
- Howler.js or Web Audio API for audio
- CSS / Tailwind CSS if useful
- localStorage for persistent challenge configuration

You may use another modern stack if it provides a better result, but the final application must:

- run in a browser
- be responsive
- support desktop and laptop interaction
- support keyboard/mouse controls
- have smooth 3D rendering
- be easy to run locally
- be easy to deploy

Do NOT unnecessarily introduce a backend.

For the exhibition version, local persistence is enough.

---

# 4. GAME TITLE

Main title:

BILLION DOLLAR BANK HEIST

Subtitle:

CAN YOU CRACK THE VAULT?

Primary CTA:

START HEIST

Other menu options:

- HOW TO PLAY
- SETTINGS
- ADMIN

Use dramatic cinematic typography.

---

# 5. VISUAL STYLE

The overall visual style should be:

- cinematic
- modern
- premium
- dark
- high-security bank atmosphere
- realistic-looking where possible
- dramatic lighting
- metallic materials
- glowing security lights
- glass
- polished floors
- realistic shadows
- atmospheric fog where appropriate
- subtle particles
- camera animations
- cinematic transitions

Use a fictional bank name.

Do NOT use real bank logos, trademarks, or branding.

Example fictional bank:

NEXUS NATIONAL BANK

The bank can have:

- large glass entrance
- security cameras
- security guards
- teller counters
- ATM
- desks
- bank signage
- ceiling lights
- CCTV monitors
- security doors
- vault corridor
- warning signs

---

# 6. COMPLETE GAME FLOW

The exact flow must be:

START SCREEN
↓
BANK EXTERIOR
↓
ENTER BANK
↓
BANK INTERIOR
↓
SECURITY CORRIDOR
↓
VAULT ROOM
↓
VAULT LOCK TERMINAL
↓
CLUE 1
↓
PASSWORD ATTEMPT 1
↓
IF CORRECT → WIN
↓
IF WRONG → CHANCE LOST
↓
PRIZE BECOMES ₹500,000,000
↓
CLUE 2
↓
PASSWORD ATTEMPT 2
↓
IF CORRECT → WIN
↓
IF WRONG → CHANCE LOST
↓
PRIZE BECOMES ₹250,000,000
↓
CLUE 3
↓
PASSWORD ATTEMPT 3
↓
IF CORRECT → WIN
↓
IF WRONG → LOSS / BLAST SEQUENCE
↓
RESULT
↓
RESTART
↓
NEXT CHALLENGE

---

# 7. START SCREEN

Create a cinematic title screen.

Visuals:

- dark background
- distant bank silhouette
- moving lights
- subtle fog
- floating particles
- security camera movement
- dramatic lighting
- subtle animated money particles
- cinematic BGM

Display:

BILLION DOLLAR BANK HEIST

"Can You Crack the Vault?"

Button:

START HEIST

Secondary:

HOW TO PLAY
SETTINGS
ADMIN

Add a small instruction:

"You have 3 chances. Crack the vault before the security system catches you."

---

# 8. HOW TO PLAY SCREEN

Explain the game very simply.

Example:

STEP 1
Enter the bank.

STEP 2
Find the vault.

STEP 3
Study the clues.

STEP 4
Crack the password.

STEP 5
Win the money.

Display:

3 CHANCES

Prize progression:

₹1,000,000,000
↓
₹500,000,000
↓
₹250,000,000
↓
GAME OVER

Include:

BACK

---

# 9. BANK EXTERIOR SCENE

Create a 3D bank exterior.

The camera should start at a distance.

Environment:

- large fictional bank building
- glass entrance
- large bank sign
- street
- pavement
- street lights
- security cameras
- entrance doors
- windows
- architectural details
- subtle environmental animation

Camera sequence:

1. Start with a wide establishing shot.
2. Slowly move toward the entrance.
3. Highlight the entrance.
4. Display:

"ENTER THE BANK"

Player interaction:

- Click entrance
OR
- press E
OR
- use a clear ENTER button

Do not make the player confused about where to go.

---

# 10. BANK ENTRY SEQUENCE

When the player enters:

Animate the camera through the glass doors.

The doors should:

- slide/open
- make a mechanical sound
- trigger a subtle transition

Inside:

- lobby
- teller counters
- ATM
- desks
- security guard
- CCTV
- ceiling lights
- polished floor
- fictional branding

Display a small cinematic message:

"Security level: HIGH"

Then guide the player toward the secure corridor.

---

# 11. BANK INTERIOR

Make the interior interactive.

Potential interactive objects:

- ATM
- CCTV camera
- teller counter
- security desk
- security door
- vault direction sign
- computer monitor
- bank lockers

When the player points at or approaches an interactive object:

- highlight it
- show a small tooltip

Example:

"ATM"
"Security Desk"
"SECURITY CORRIDOR →"

Do not make every object interactive.

Only important objects need interaction.

---

# 12. PLAYER MOVEMENT

Support simple controls.

Desktop:

W / A / S / D

Arrow keys

Mouse look where appropriate

E:

Interact

ESC:

Pause

Also provide clickable navigation hotspots so younger students can easily use the game.

If full FPS-style controls become unstable, use a cinematic point-and-click / hotspot movement system instead.

The experience is more important than complicated controls.

---

# 13. SECURITY CORRIDOR

Create a high-security corridor.

Visuals:

- metallic walls
- floor lights
- CCTV cameras
- security doors
- warning signs
- red emergency lights
- cables/panels
- surveillance screens
- heavy doors
- industrial details

Add:

"AUTHORIZED PERSONNEL ONLY"

Camera should guide the player toward the vault.

Security doors can open after interaction.

Add subtle:

- electrical hum
- ventilation sound
- footsteps
- security beeps

---

# 14. VAULT ROOM

The vault room must be visually impressive.

Create:

- huge circular vault door
- multiple locking mechanisms
- bolts
- rotating wheel
- metallic walls
- security cameras
- floor markings
- warning lights
- control terminal
- digital display

The vault should be the visual centerpiece of the game.

Display:

VAULT SECURITY SYSTEM

STATUS:

LOCKED

---

# 15. VAULT APPROACH SEQUENCE

When the player reaches the vault:

Camera should:

1. slowly move toward the vault
2. zoom toward the lock
3. focus on the password terminal
4. activate the terminal
5. play mechanical/electronic sounds

Display:

"VAULT LOCKED"

"PASSWORD REQUIRED"

Then:

"CRACK THE CODE"

---

# 16. PASSWORD SYSTEM

Passwords are NOT digits-only.

Every password must contain:

- a famous/easily recognizable word
- exactly two digits

Examples:

TIGER27
ROCKET42
DRAGON19
PHOENIX73
NINJA51

The admin must be able to change the password.

Password validation should:

- ignore accidental leading/trailing spaces
- preferably be case-insensitive
- require the complete password
- not reveal the correct answer
- prevent accidental submission of empty input

Example:

Correct:

dragon19

Stored:

DRAGON19

This should be accepted.

---

# 17. THREE PASSWORD CHALLENGES

Create exactly 3 challenge configurations.

Challenge 1
Challenge 2
Challenge 3

Each challenge contains:

- password
- famous word
- two digits
- clue 1
- clue 2
- clue 3

Example:

Challenge 1:

Password:
TIGER27

Clue 1:
"My word is a powerful wild animal."

Clue 2:
"My word has five letters."

Clue 3:
"The number ends with 27."

The exact default passwords can be different, but they must follow the required format.

Do not make the clues so difficult that the game becomes frustrating.

---

# 18. CHALLENGE ROTATION

This is extremely important.

The game has three password challenges.

Every time the game is restarted after completing a game:

Challenge 1
→ Challenge 2
→ Challenge 3
→ Challenge 1
→ Challenge 2
→ Challenge 3
...

Do NOT randomly select a challenge.

Do NOT remain on Challenge 1 forever.

Persist the next challenge index using localStorage.

Example:

First game:
Challenge 1

After restart:
Challenge 2

After restart:
Challenge 3

After restart:
Challenge 1

Continue indefinitely.

---

# 19. THREE CHANCES SYSTEM

At the beginning:

Remaining chances = 3

Prize:

₹1,000,000,000

Attempt 1:

Prize:
₹1,000,000,000

If incorrect:

Remaining chances = 2

Prize becomes:

₹500,000,000

Attempt 2:

If incorrect:

Remaining chances = 1

Prize becomes:

₹250,000,000

Attempt 3:

If correct:

Win ₹250,000,000

If incorrect:

LOSE

Prize:

₹0

---

# 20. CLUE SYSTEM

Before each attempt, show the appropriate clue.

Attempt 1:

CLUE 1

Attempt 2:

CLUE 2

Attempt 3:

CLUE 3

Do NOT reveal the complete password through the clue.

The clue should help but still require thinking.

Example:

CLUE 1:
"The word is something you might see in the sky."

CLUE 2:
"The word has seven letters."

CLUE 3:
"The two digits are 42."

Only show the next clue after the previous attempt is wrong.

---

# 21. PASSWORD TERMINAL UI

Create a futuristic vault terminal.

Visual elements:

- dark metallic panel
- glowing display
- password input
- blinking cursor
- keypad-like visual
- ENTER button
- current prize
- remaining chances
- current clue

Display:

VAULT ACCESS TERMINAL

CURRENT PRIZE
₹1,000,000,000

CHANCES
❤️ ❤️ ❤️

CLUE
"My word is..."

PASSWORD
[________________]

[UNLOCK VAULT]

The terminal should feel like part of the 3D environment.

---

# 22. CORRECT PASSWORD SEQUENCE

When the password is correct:

Immediately:

- disable further input
- play success sound
- show:

ACCESS GRANTED

Then begin cinematic sequence.

Sequence:

1. Terminal turns green.
2. Green lights activate.
3. Mechanical locks begin rotating.
4. Vault bolts retract.
5. Large circular mechanism rotates.
6. Heavy vault door slowly opens.
7. Camera moves toward the opening.
8. Bright light appears from inside.
9. Money is revealed.
10. Money particles/confetti appear.
11. Cinematic camera movement.
12. Celebration music starts.

Show:

VAULT OPENED!

CONGRATULATIONS!

YOU CRACKED THE VAULT!

PRIZE WON:

₹1,000,000,000

or:

₹500,000,000

or:

₹250,000,000

depending on the successful attempt.

---

# 23. WINNING EXPERIENCE

The winning sequence should feel rewarding.

Add:

- gold/money particle effects
- floating currency visuals
- celebration lights
- camera movement
- subtle screen effects
- success animation
- large congratulations text

Optional:

"HEIST SUCCESSFUL"

"YOU BEAT THE SECURITY SYSTEM"

Then show:

[PLAY AGAIN]

When PLAY AGAIN is clicked:

- reset the game
- move to the next challenge
- Challenge 1 → 2 → 3 → 1

---

# 24. CUSTOM WIN AUDIO

Create an audio slot for a custom victory sound.

File:

/public/assets/audio/win-custom.mp3

The game should play this file if available.

IMPORTANT:

Do not package copyrighted WWE/John Cena audio without proper authorization.

If the user supplies an authorized audio file, allow it to be placed in the audio folder and played during the win sequence.

Also provide a fallback original celebration sound.

---

# 25. INCORRECT PASSWORD SEQUENCE

If password is incorrect:

Show:

ACCESS DENIED

Use:

- red terminal flash
- terminal shake
- error beep
- red warning light
- subtle camera shake

Then show:

WRONG PASSWORD

ONE CHANCE LOST

If this is attempt 1:

CHANCES LEFT:
❤️ ❤️

NEXT PRIZE:
₹500,000,000

Then transition to Clue 2.

If this is attempt 2:

CHANCES LEFT:
❤️

NEXT PRIZE:
₹250,000,000

Then transition to Clue 3.

---

# 26. LAST ATTEMPT

Before attempt 3, create dramatic tension.

Display:

FINAL CHANCE

ONE LAST TRY

PRIZE:

₹250,000,000

Use:

- heartbeat
- warning lights
- slow BGM
- subtle camera movement

Then show:

CLUE 3

PASSWORD TERMINAL

---

# 27. LOSS SEQUENCE

If attempt 3 is incorrect:

Show:

ACCESS DENIED

Then immediately begin the cinematic failure sequence.

Sequence:

1. Terminal flashes red.
2. Alarm begins.
3. Red lights start blinking.
4. Emergency siren starts.
5. Camera shakes.
6. Security warning appears.
7. Vault mechanisms react.
8. Vault door begins closing.
9. Camera pulls back.
10. Warning lights intensify.
11. Non-graphic cinematic blast/explosion.
12. Smoke and particles appear.
13. Vault is shown damaged/blasted.
14. Screen transitions to result screen.

Keep the explosion completely non-graphic and suitable for students.

---

# 28. WASTED RESULT SCREEN

Show:

WASTED

BETTER LUCK NEXT TIME

HEIST FAILED

PRIZE WON:

₹0

Then:

[RESTART HEIST]

When restarted:

- move to the next password challenge
- Challenge 1 → 2 → 3 → 1

---

# 29. CUSTOM LOSS AUDIO

Create an audio slot:

/public/assets/audio/loss-custom.mp3

Play it during the loss result sequence if available.

IMPORTANT:

Do not package copyrighted GTA V "WASTED" audio.

The user may provide an authorized audio file.

Provide an original fallback loss sound and display the word:

WASTED

The visual presentation can use the requested wording without copying copyrighted audio.

---

# 30. AUDIO SYSTEM

Create a centralized Audio Manager.

It must support:

- background music
- scene-specific BGM
- button sounds
- footsteps
- door sounds
- vault mechanisms
- lock rotation
- password accepted
- password denied
- alarm
- explosion
- success
- loss
- ambient sounds

Suggested BGM states:

MENU_BGM
BANK_BGM
VAULT_BGM
TENSION_BGM
WIN_BGM
LOSS_BGM

Music should transition smoothly.

Do not abruptly cut music unless intentionally required.

---

# 31. AUDIO SETTINGS

Create:

MUSIC:
ON/OFF

SFX:
ON/OFF

MASTER VOLUME:
slider

MUSIC VOLUME:
slider

SFX VOLUME:
slider

Persist settings in localStorage.

If an audio file is missing:

- do not crash
- gracefully continue
- log a warning in development

---

# 32. ADMIN SCREEN

Create a completely separate ADMIN screen.

Access:

ADMIN

Use a simple admin PIN for exhibition purposes.

Do not build an unnecessarily complex authentication system.

Default development PIN:

1234

Make it easy to change in configuration.

---

# 33. ADMIN DASHBOARD

Admin dashboard must contain:

CHALLENGE 1

CHALLENGE 2

CHALLENGE 3

For each challenge:

- famous word
- two digits
- full password
- clue 1
- clue 2
- clue 3

Example UI:

CHALLENGE 1

Word:
[TIGER]

Digits:
[27]

Full Password:
[TIGER27]

Clue 1:
[________________]

Clue 2:
[________________]

Clue 3:
[________________]

[SAVE CHALLENGE]

Repeat for Challenge 2 and Challenge 3.

---

# 34. ADMIN VALIDATION

Validate:

- word is not empty
- word contains letters
- digits contain exactly two digits
- full password is generated from word + digits
- all three clues are present
- password is not empty

If invalid:

show a clear error.

Example:

"Digits must contain exactly 2 numbers."

Do not allow broken configurations to be saved.

---

# 35. PASSWORD GENERATION

Admin should preferably enter:

WORD:
TIGER

DIGITS:
27

The application automatically creates:

TIGER27

This prevents mismatch between the displayed password and stored password.

The password can still be previewed in the admin panel.

---

# 36. ADMIN PERSISTENCE

Save challenge settings using localStorage.

Key example:

bankHeistChallenges

Also save:

bankHeistNextChallenge

Admin changes must survive page refresh.

When the player starts a new game, the latest saved challenges must be used.

---

# 37. RESET ADMIN DATA

Provide:

RESET DEFAULT CHALLENGES

This should require confirmation.

Example confirmation:

"Are you sure you want to restore the default passwords and clues?"

If confirmed:

restore default Challenge 1/2/3.

---

# 38. ADMIN SECURITY NOTE

This is an exhibition/demo application.

Do NOT pretend localStorage/PIN authentication is production-grade security.

The PIN is only a simple admin gate.

Clearly separate the admin UI from the player experience.

---

# 39. SETTINGS SCREEN

Create:

SETTINGS

Options:

Music
SFX
Master Volume
Graphics Quality
Fullscreen
Control Instructions

Buttons:

SAVE

BACK

Persist user preferences.

---

# 40. FULLSCREEN

Support browser fullscreen.

Add:

ENTER FULLSCREEN

If fullscreen is active:

EXIT FULLSCREEN

This is important for exhibition/demo usage.

---

# 41. RESPONSIVE DESIGN

The application must work on:

- desktop
- laptop
- large exhibition monitor
- tablet where possible

Primary target:

desktop/laptop.

Do not let UI elements overlap.

Text must remain readable.

Buttons must be large enough for exhibition use.

The 3D canvas must resize correctly.

---

# 42. PERFORMANCE

Optimize the application.

Use:

- low/medium-poly models where appropriate
- instancing where useful
- compressed textures
- lazy loading for large assets
- limited dynamic lights
- optimized shadows
- object reuse
- efficient particle systems

Do not destroy performance just to add visual effects.

Target:

smooth gameplay on a normal college laptop.

If graphics quality becomes too heavy:

automatically reduce expensive effects.

---

# 43. GRAPHICS QUALITY MODES

Provide:

LOW
MEDIUM
HIGH

LOW:

- reduced shadows
- reduced particles
- lower rendering resolution

MEDIUM:

- balanced

HIGH:

- higher shadows
- better effects
- more particles

Persist selected quality.

---

# 44. GAME STATE ARCHITECTURE

Create a clear state machine.

Recommended states:

MAIN_MENU
HOW_TO_PLAY
BANK_EXTERIOR
BANK_ENTRY
BANK_INTERIOR
SECURITY_CORRIDOR
VAULT_ROOM
PASSWORD_TERMINAL
CLUE_SCREEN
WIN_SEQUENCE
LOSS_SEQUENCE
RESULT_SCREEN
ADMIN_LOGIN
ADMIN_DASHBOARD
SETTINGS

Game data:

currentScene
currentChallenge
currentAttempt
remainingChances
currentPrize
currentPassword
currentClue
gameStatus
musicEnabled
sfxEnabled
masterVolume
graphicsQuality
adminAuthenticated

Avoid scattered state logic.

Centralize important game state.

---

# 45. PRIZE LOGIC

Use constants.

INITIAL_PRIZE = 1000000000

SECOND_PRIZE = 500000000

THIRD_PRIZE = 250000000

The prize must be determined by the successful attempt.

Attempt 1:
₹1,000,000,000

Attempt 2:
₹500,000,000

Attempt 3:
₹250,000,000

Loss:
₹0

Do not calculate this inconsistently in different components.

---

# 46. CHANCE LOGIC

Initial:

3 chances

After first incorrect:

2 chances

After second incorrect:

1 chance

After third incorrect:

0 chances

The third incorrect answer must always trigger the loss sequence.

Do not allow a fourth attempt.

---

# 47. PASSWORD ATTEMPT LOGIC

On submit:

1. Trim input.
2. Convert to uppercase.
3. Compare against current challenge password.
4. If correct:
   - stop attempts
   - trigger win
5. If incorrect:
   - increment attempt
   - reduce chances
   - update prize
   - show correct clue
6. If attempt reaches 3 and answer is wrong:
   - trigger loss

Disable submit while animations are playing.

Prevent double submission.

---

# 48. CINEMATIC TRANSITIONS

Use smooth transitions between scenes.

Examples:

- fade to black
- camera dolly
- camera zoom
- door animation
- light transition
- blur/focus effect
- screen shake
- cinematic UI overlay

Avoid instant hard cuts except when appropriate.

---

# 49. CAMERA SYSTEM

Create reusable camera transitions.

Examples:

moveCameraTo(position, target, duration)

Use:

- smooth interpolation
- easing
- lookAt transitions
- cinematic timing

Important sequences:

Exterior → Entrance
Entrance → Lobby
Lobby → Corridor
Corridor → Vault
Vault → Terminal
Terminal → Vault opening
Vault → Money reveal
Loss → Explosion

---

# 50. INTERACTIVE HIGHLIGHT SYSTEM

For important interactive objects:

- outline or glow
- subtle hover animation
- tooltip

Examples:

ENTER BANK
SECURITY DOOR
VAULT TERMINAL

Do not highlight everything.

---

# 51. UI DESIGN

Use a premium futuristic UI.

Style:

- dark glass panels
- subtle transparency
- glowing borders
- clean typography
- large numbers
- clear hierarchy

Use animations for:

- buttons
- panels
- clue cards
- prize counter
- chance hearts
- error state
- success state

Avoid clutter.

---

# 52. PRIZE DISPLAY

Always show the current prize when relevant.

Use large typography:

₹1,000,000,000

Animate prize changes.

When prize is reduced:

Use a dramatic counter animation.

Example:

₹1,000,000,000
→
₹500,000,000

Add:

"PRIZE HALVED"

---

# 53. CHANCES DISPLAY

Display:

❤️ ❤️ ❤️

After failure:

❤️ ❤️

After second failure:

❤️

Use a smooth animation when a heart disappears.

---

# 54. ACCESS DENIED ANIMATION

When wrong:

- red screen flash
- terminal shake
- warning icon
- beep
- "ACCESS DENIED"
- "WRONG PASSWORD"

Then transition to the next clue.

Do not immediately jump away before the player understands what happened.

---

# 55. VAULT OPENING ANIMATION

Make this one of the best animations in the game.

Components:

- wheel rotation
- multiple lock bolts
- central mechanism
- door rotation
- light from vault interior
- dust particles
- camera movement
- money reveal

The vault must visually appear to open.

Do not fake it only with a UI message.

---

# 56. VAULT EXPLOSION ANIMATION

Make the failed sequence cinematic.

Use:

- light flash
- particles
- smoke
- debris
- camera shake
- red emergency lights

Do NOT include gore or graphic violence.

The vault itself is the object being damaged.

---

# 57. MONEY REVEAL

Inside the vault:

- stacks of money
- glowing treasure room
- dramatic light
- floating particles
- subtle money movement

Do not use real banknotes or copyrighted currency artwork unnecessarily.

Use stylized fictional money visuals if needed.

---

# 58. 3D ASSET STRATEGY

If external 3D assets are required:

Use assets that are:

- free
- legally usable
- appropriately licensed
- preferably CC0 or permissive licenses

Keep an asset attribution file where required.

Do not scrape copyrighted assets.

If assets cannot be obtained:

create procedural 3D versions using Three.js primitives.

The game must still run without paid assets.

---

# 59. IMAGE / TEXTURE STRATEGY

For walls, screens, signs, etc.:

Use procedural materials or properly licensed textures.

Do not rely on remote URLs that may break during an exhibition.

Prefer local assets.

---

# 60. AUDIO ASSET STRATEGY

Store audio locally.

Recommended:

/public/assets/audio/

Example:

menu-bgm.mp3
bank-ambient.mp3
vault-ambient.mp3
tension-bgm.mp3
win-bgm.mp3
loss-bgm.mp3
door-open.mp3
vault-lock.mp3
access-granted.mp3
access-denied.mp3
alarm.mp3
explosion.mp3
win-custom.mp3
loss-custom.mp3

If any file is missing, the game must continue without crashing.

---

# 61. ACCESSIBILITY

Include:

- readable text
- high contrast
- keyboard controls
- visible focus states
- subtitles/text for important sounds
- audio mute options
- clear instructions

Important gameplay information must not be communicated only through sound.

---

# 62. PAUSE SYSTEM

ESC should open:

PAUSED

Options:

RESUME
SETTINGS
RESTART
MAIN MENU

Do not allow accidental restart without confirmation.

---

# 63. RESTART CONFIRMATION

If restarting during an active game:

"Restart the current heist?"

Buttons:

YES
NO

Do not reset the challenge rotation unless the game has actually completed.

Important:

A normal restart during an unfinished game should not accidentally skip challenges unless the intended game has ended.

After a completed WIN or LOSS and selecting PLAY AGAIN/RESTART HEIST, move to the next challenge.

---

# 64. CHALLENGE INDEX LOGIC

Use:

currentChallengeIndex

Values:

0
1
2

After completed game:

currentChallengeIndex = (currentChallengeIndex + 1) % 3

Persist it.

This guarantees:

0 → 1 → 2 → 0 → 1 → 2...

---

# 65. DEFAULT CHALLENGES

Create three polished default challenges.

Example:

Challenge 1

WORD:
TIGER

DIGITS:
27

PASSWORD:
TIGER27

CLUE 1:
"My word is a powerful wild animal."

CLUE 2:
"My word has five letters."

CLUE 3:
"The two digits are 27."

Challenge 2

WORD:
ROCKET

DIGITS:
42

PASSWORD:
ROCKET42

CLUE 1:
"My word can travel beyond the Earth."

CLUE 2:
"My word has six letters."

CLUE 3:
"The two digits are 42."

Challenge 3

WORD:
DRAGON

DIGITS:
19

PASSWORD:
DRAGON19

CLUE 1:
"My word is a legendary creature."

CLUE 2:
"My word has six letters."

CLUE 3:
"The two digits are 19."

These are default demo values only.

Admin must be able to change them.

---

# 66. DATA MODEL

Use a structure similar to:

Challenge:

{
  id,
  word,
  digits,
  password,
  clues: {
    clue1,
    clue2,
    clue3
  }
}

GameState:

{
  currentScene,
  currentChallengeIndex,
  currentAttempt,
  remainingChances,
  currentPrize,
  gameStatus
}

Settings:

{
  musicEnabled,
  sfxEnabled,
  masterVolume,
  musicVolume,
  sfxVolume,
  graphicsQuality,
  fullscreen
}

---

# 67. PROJECT STRUCTURE

Use a clean structure similar to:

src/
  components/
  scenes/
  game/
  state/
  hooks/
  audio/
  ui/
  admin/
  settings/
  utils/
  assets/

public/
  assets/
    audio/
    textures/
    models/

Keep code modular.

Do not create one giant component.

---

# 68. ERROR HANDLING

The application must not crash because:

- an audio file is missing
- a 3D model fails to load
- localStorage is unavailable
- user enters invalid password
- fullscreen is unavailable
- WebGL has limitations

Provide graceful fallbacks.

---

# 69. LOCAL STORAGE

Use safe helper functions.

Example conceptual utilities:

saveData()
loadData()
removeData()

Handle JSON parse errors.

If stored data is corrupt:

fall back to defaults.

---

# 70. FIRST-RUN INITIALIZATION

On first launch:

1. Load default challenges.
2. Load default settings.
3. Set challenge index to 0.
4. Start at MAIN_MENU.

Do not show the admin screen automatically.

---

# 71. EXHIBITION MODE

The game is intended to be played by many students one after another.

Make it extremely easy to restart.

After result:

PLAY AGAIN

Then:

"Loading next challenge..."

Do not require browser refresh.

---

# 72. DEMO RESET

Add an admin option:

RESET GAME PROGRESS

This resets:

- next challenge index
- saved game settings if appropriate

But do not delete challenge configurations unless the admin explicitly chooses RESET DEFAULT CHALLENGES.

---

# 73. DEBUG MODE

During development, optionally support a debug panel.

It can show:

Current scene
Challenge index
Attempt
Remaining chances
Prize
Game status

Hide debug mode from normal users.

---

# 74. TESTING REQUIREMENTS

You must test all of these.

TEST 1:
Start game.

TEST 2:
Reach vault.

TEST 3:
Correct password on attempt 1.

Expected:
Win ₹1,000,000,000.

TEST 4:
Wrong attempt 1.

Expected:
2 chances remain.
Prize becomes ₹500,000,000.
Clue 2 appears.

TEST 5:
Correct attempt 2.

Expected:
Win ₹500,000,000.

TEST 6:
Wrong attempts 1 and 2.

Expected:
1 chance remains.
Prize becomes ₹250,000,000.
Clue 3 appears.

TEST 7:
Correct attempt 3.

Expected:
Win ₹250,000,000.

TEST 8:
Wrong attempts 1, 2 and 3.

Expected:
Loss sequence.
Alarm.
Red lights.
Vault closing.
Explosion.
WASTED.
Prize ₹0.

TEST 9:
Complete Challenge 1.

Restart.

Expected:
Challenge 2.

TEST 10:
Complete Challenge 2.

Restart.

Expected:
Challenge 3.

TEST 11:
Complete Challenge 3.

Restart.

Expected:
Challenge 1.

TEST 12:
Refresh browser.

Expected:
Challenge rotation remains correct.

TEST 13:
Change admin password.

Refresh.

Expected:
New password persists.

TEST 14:
Change clues.

Refresh.

Expected:
New clues persist.

TEST 15:
Turn music off.

Refresh.

Expected:
Music setting persists.

TEST 16:
Turn SFX off.

Expected:
SFX disabled.

TEST 17:
Missing audio file.

Expected:
Game does not crash.

TEST 18:
Wrong password with lowercase.

Expected:
Case-insensitive comparison works.

TEST 19:
Password with accidental spaces.

Expected:
Input is trimmed.

TEST 20:
Empty password.

Expected:
Validation message.

TEST 21:
Try fourth attempt.

Expected:
Impossible.

TEST 22:
Reload during game.

Expected:
No corrupted state.

---

# 75. SECURITY / SAFETY

This is an educational entertainment game.

It should not connect to real banking systems.

Do not request:

- real bank credentials
- real card details
- real passwords
- personal financial information

Use completely fictional bank content.

---

# 76. NO REAL BANK BRANDING

Do not use:

- SBI
- HDFC
- ICICI
- Axis
- Bank of America
- JPMorgan
- or any real bank branding

Use fictional branding only.

---

# 77. USER EXPERIENCE PRIORITY

The most important thing is:

FUN + CINEMATIC + EASY TO UNDERSTAND

The player should always know:

- where they are
- what to do
- how many chances remain
- how much money they can win
- what clue they received
- what happens after an incorrect answer

Never leave the player stuck.

---

# 78. LOADING SCREEN

Create a cinematic loading screen.

Display:

NEXUS NATIONAL BANK

SECURITY SYSTEM INITIALIZING...

Then:

LOADING HEIST...

Use a progress animation.

If assets load quickly, still show a very short cinematic transition rather than flashing instantly into the game.

---

# 79. ERROR / FALLBACK SCREEN

If a major 3D error occurs:

Show:

"SECURITY SYSTEM TEMPORARILY UNAVAILABLE"

Buttons:

RETRY
MAIN MENU

Do not expose raw developer errors to normal users.

---

# 80. MOBILE / TOUCH SUPPORT

Desktop is the priority.

If practical, add touch controls:

- tap hotspots
- large interaction buttons
- swipe/look support

Do not sacrifice desktop quality just to support mobile.

---

# 81. FINAL POLISH

Before considering the project complete:

Remove:

- console errors
- broken links
- placeholder text
- empty buttons
- dead interactions
- overlapping UI
- missing states
- broken animations
- duplicated logic

Check:

- all buttons work
- all scenes transition
- all sounds work or fail gracefully
- all challenge rotation works
- admin persistence works
- password validation works
- responsive layout works

---

# 82. FINAL DELIVERABLE

At the end, provide:

1. Complete project.
2. Clean project structure.
3. All source code.
4. All required configuration files.
5. Default challenge data.
6. Admin dashboard.
7. Audio manager.
8. 3D scenes.
9. UI.
10. Animations.
11. Game logic.
12. Persistence.
13. Settings.
14. Testing.
15. README.

README must explain:

- project name
- technology used
- how to install
- how to run
- how to build
- how to add assets
- how to add audio
- how to change passwords
- admin PIN
- how challenge rotation works
- how to deploy
- known limitations

---

# 83. README COMMANDS

Provide exact commands such as:

npm install

npm run dev

npm run build

npm run preview

Use the actual commands for the selected stack.

---

# 84. IMPORTANT ASSET PLACEHOLDERS

Create clear folders for:

/public/assets/models/
/public/assets/textures/
/public/assets/audio/
/public/assets/images/

If an asset is not available, provide a procedural fallback.

Do not make the application dependent on a remote CDN for essential gameplay.

---

# 85. IMPORTANT AUDIO COPYRIGHT RULE

The game must support user-supplied custom audio files.

Create:

win-custom.mp3
loss-custom.mp3

as optional slots.

Do not download, package, reproduce, or distribute copyrighted John Cena/WWE or GTA V audio.

If the user supplies legally authorized files, the application can play those files.

Otherwise use original fallback sounds.

---

# 86. FINAL GAME FEEL

The final game should feel like:

"Walk into a bank → sneak toward a massive vault → solve a mystery password → risk losing half the prize → crack the vault → become a billionaire."

It should NOT feel like:

- a Google Form
- a normal website
- a multiple-choice quiz
- a Java console program
- a static 3D model
- a simple password page

It must feel like a:

# MINI CINEMATIC 3D GAME

---

# 87. BUILD PRIORITY

Build in this order:

PHASE 1
Project foundation and architecture.

PHASE 2
Main menu and navigation.

PHASE 3
3D bank exterior.

PHASE 4
Bank entrance and lobby.

PHASE 5
Security corridor.

PHASE 6
Vault room.

PHASE 7
Vault terminal.

PHASE 8
Password/clue/game logic.

PHASE 9
Three-chance and prize system.

PHASE 10
Win sequence.

PHASE 11
Loss/explosion sequence.

PHASE 12
Audio manager.

PHASE 13
Challenge rotation.

PHASE 14
Admin dashboard.

PHASE 15
Persistence.

PHASE 16
Settings/fullscreen.

PHASE 17
Responsive UI.

PHASE 18
Optimization.

PHASE 19
Testing.

PHASE 20
Final polish and README.

Do not skip directly to the UI and leave the game logic unfinished.

---

# 88. DEVELOPMENT BEHAVIOR

Whenever you encounter an implementation problem:

1. Diagnose it.
2. Fix it.
3. Test the fix.
4. Continue building.

Do not stop and ask the user unnecessary questions if a reasonable implementation decision can be made.

Use sensible defaults.

If one technology becomes problematic, replace it with a stable alternative.

Prioritize a working polished game over unnecessary technical complexity.

---

# 89. ACCEPTANCE CRITERIA

The project is COMPLETE only if all are true:

[ ] Browser application launches successfully.

[ ] Main menu works.

[ ] 3D bank exterior exists.

[ ] Player can enter bank.

[ ] Bank interior exists.

[ ] Player can reach security corridor.

[ ] Vault room exists.

[ ] Vault terminal exists.

[ ] Clue 1 appears.

[ ] Password attempt 1 works.

[ ] Wrong attempt reduces chance.

[ ] Prize changes from ₹1B to ₹500M.

[ ] Clue 2 appears.

[ ] Second attempt works.

[ ] Prize can be ₹500M.

[ ] Third clue appears after two failures.

[ ] Third attempt works.

[ ] Prize can be ₹250M.

[ ] Third failure triggers loss.

[ ] Alarm works.

[ ] Red lights work.

[ ] Vault closes.

[ ] Explosion sequence works.

[ ] WASTED result works.

[ ] Win sequence works.

[ ] Money reveal works.

[ ] Challenge 1 → 2 → 3 → 1 rotation works.

[ ] Admin screen works.

[ ] Admin can change all three passwords.

[ ] Admin can change clues.

[ ] Password validation works.

[ ] Admin changes persist.

[ ] Challenge index persists.

[ ] Music controls work.

[ ] SFX controls work.

[ ] Fullscreen works where supported.

[ ] Game can restart without browser refresh.

[ ] No fourth password attempt is possible.

[ ] No critical console errors.

[ ] Missing optional audio does not crash the game.

[ ] Application is responsive.

[ ] README exists.

---

# 90. FINAL INSTRUCTION TO THE AI CODING AGENT

Do not return only a plan.

BUILD THE GAME.

Start by inspecting the environment and creating the project.

Then implement the application phase by phase.

After every major phase:

- run the project
- inspect for errors
- fix errors
- continue

At the end:

- run a complete production build
- test the major game paths
- verify challenge rotation
- verify admin persistence
- verify the three-attempt system
- verify win/loss cinematic sequences
- verify audio fallback
- verify responsive UI
- verify there are no blocking errors

The final result must be a complete, polished, playable:

# BILLION DOLLAR BANK HEIST
## Interactive 3D Cinematic Web Game

Do not simplify the project into a quiz or normal form-based application.

Build the actual interactive 3D experience.
