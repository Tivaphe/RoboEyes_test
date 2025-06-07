# RoboEyes Web Configurator - Usage Guide

## 1. Introduction

This tool provides a web-based interface to configure and experiment with eye expressions for the `FluxGarage_RoboEyes` Arduino library. It allows for live preview of eye settings and generates corresponding C++ code that can be easily integrated into your ESP32 or Arduino projects.

## 2. Features

-   **Live Preview:** See changes to eye appearance instantly on the webpage.
-   **Comprehensive Eye Controls:** Adjust parameters like:
    -   Eye size (width, height)
    -   Eye shape (border radius)
    -   Spacing between eyes
    -   Moods (Default, Tired, Angry, Happy)
    -   Eye position (N, NE, E, SE, S, SW, W, NW, Default/Center)
    -   Special modes: Cyclops, Curious, Autoblinker.
-   **Global Settings:** Configure screen dimensions (width, height) and target FPS for the generated code.
-   **Reaction Sequence Builder:**
    -   Create multi-step animation sequences.
    -   Define duration for each step.
    -   Generated code runs the sequence automatically.
-   **ESP32/Arduino Code Generation:** Produces ready-to-use C++ code snippets or full sketches.

## 3. How to Use the Web Interface

The web interface is divided into several sections:

### 3.1. Eye Display Area

-   Located at the top left.
-   This area shows a visual representation of the robo-eyes based on the current settings.
-   It updates in real-time as you change parameters.

### 3.2. Controls Area

-   Located below the Eye Display.
-   **Eye Dimensions & Shape:**
    -   Use sliders or number inputs for `Left Eye Width`, `Left Eye Height`, `Left Eye Border Radius`, and their right eye counterparts.
    -   `Space Between Eyes` controls the gap between the two eyes.
-   **Mood & Position:**
    -   `Mood` dropdown: Select predefined moods (TIRED, ANGRY, HAPPY, DEFAULT) which affect eyelid appearance.
    -   `Position` dropdown: Set the general gaze direction of the eyes on the screen.
-   **Modes:**
    -   `Cyclops Mode`: Check to display only a single eye.
    -   `Curious Mode`: Check to make the outer eye slightly larger when looking left/right.
    -   `Autoblinker`: Check to enable automatic blinking (uses default interval/variation in generated code).

### 3.3. Global Settings

-   Located in the main controls area.
-   `Screen Width (px)`: Set the width of your OLED display.
-   `Screen Height (px)`: Set the height of your OLED display.
-   `Max Frame Rate (FPS)`: Set the target frame rate for `roboEyes.begin()`.

### 3.4. Generated Code Area

-   Located on the right side of the page.
-   This `textarea` displays the generated C++ code based on your current settings (either single state or a full sequence sketch).
-   Click inside the text area and use Ctrl+C (or Cmd+C) to copy the code.

### 3.5. Reaction Sequence Constructor

-   Located below the main controls area.
-   **Define a Step:** Adjust all eye parameters in the "Controls Area" and "Global Settings" to define the desired look for a single step in your sequence.
-   **Step Duration (ms):** Enter the time (in milliseconds) this step should last.
-   **Add Current Settings as Step:** Click this button to add the currently configured eye state and duration to the sequence.
-   **Sequence Steps Display:** Shows a list of all steps added to the sequence, along with a summary and a "Remove" button for each.
-   **Clear Sequence:** Click to remove all steps from the current sequence.
-   **Note:** If a sequence has one or more steps, the "Generated Code Area" will produce a complete C++ sketch to run that sequence. If the sequence is empty, it will generate a code snippet for a single eye state.

## 4. Using the Generated Code

### 4.1. Single State Mode (No Sequence)

If you haven't built a sequence, the generated code will be a C++ function snippet, typically looking like this:

```cpp
// --- RoboEyes Configuration (Single State) ---
// FluxGarage.com - RoboEyes Web Configurator

// Call this function once in your main setup() after roboEyes.begin()
void setupEyes() {
  roboEyes.setWidth(36, 36);
  roboEyes.setHeight(36, 36);
  // ... other settings ...
  roboEyes.setAutoblinker(OFF);
}
```

**Integration:**
1.  Ensure you have the `FluxGarage_RoboEyes.h` library, `Adafruit_GFX.h`, and `Adafruit_SSD1306.h` (or equivalent for your display) in your Arduino project.
2.  In your main `.ino` sketch:
    -   Include necessary headers.
    -   Instantiate `Adafruit_SSD1306 display` and `roboEyes roboEyes;`.
    -   In your `setup()` function:
        -   Initialize your display (`display.begin(...)`).
        -   Initialize RoboEyes: `roboEyes.begin(SCREEN_WIDTH, SCREEN_HEIGHT, FPS);` (using your screen dimensions and desired FPS).
        -   **Paste the generated `setupEyes()` function into your sketch.**
        -   **Call `setupEyes();`**
    -   In your `loop()` function, you **must** call `roboEyes.update();` continuously.

    See `examples/WebConfigurator_BasicTest/WebConfigurator_BasicTest.ino` for an example.

### 4.2. Sequence Mode

If you have added steps to the sequence, the generated code is a **complete, runnable C++ sketch**.
-   Simply copy the entire content from the "Generated Code Area".
-   Paste it into a new sketch in your Arduino IDE or PlatformIO project.
-   Upload it to your ESP32/Arduino.
-   The sketch includes all necessary setup and a `loop()` function that automatically plays the defined sequence.
-   The sequence uses a non-blocking delay mechanism, so eye animations (like blinking, if enabled per step) remain smooth during each step's duration.

## 5. Hardware & Software Requirements

### 5.1. Hardware

-   An ESP32, ESP8266, or Arduino board (Uno, Nano, etc.) compatible with the Adafruit GFX library.
-   An I2C OLED display based on SSD1306 or SH1106 chips (e.g., 128x64 or 128x32 pixels).
-   Jumper wires for connecting the display to your microcontroller (VCC, GND, SDA, SCL).

### 5.2. Software

-   Arduino IDE or PlatformIO.
-   **Required Libraries:**
    -   `FluxGarage_RoboEyes`: The core library for the robo-eyes.
    -   `Adafruit GFX Library`: Graphics primitives library.
    -   `Adafruit SSD1306`: Driver for SSD1306 displays. (If using an SH1106/SH1107 display, you'll need `Adafruit_SH110X`).
-   Install these libraries via the Arduino Library Manager or by adding them to your PlatformIO project.

## 6. Basic Example Sketch Structure (for Single State Code)

```cpp
#include <Wire.h> // For I2C
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <FluxGarage_RoboEyes.h> // Main library

// OLED Display Settings (adjust to your display)
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1 // Reset pin # (or -1 if sharing Arduino reset pin)
#define I2C_ADDRESS 0x3C // Or 0x3D for some displays

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
FluxGarage_RoboEyes roboEyes; // Create RoboEyes instance

const int TARGET_FPS = 60; // Target Frame Rate

// --- Paste your generated setupEyes() function from the Web Configurator here ---
// void setupEyes() {
//   // Example:
//   // roboEyes.setWidth(40, 40);
//   // roboEyes.setHeight(30, 30);
//   // ... etc. ...
// }
// --- End of pasted function ---

void setup() {
  Serial.begin(115200);

  // Initialize OLED display
  if (!display.begin(SSD1306_SWITCHCAPVCC, I2C_ADDRESS)) {
    Serial.println(F("SSD1306 allocation failed"));
    for (;;); // Don't proceed, loop forever
  }
  display.clearDisplay();
  display.display();

  // Initialize RoboEyes
  roboEyes.begin(SCREEN_WIDTH, SCREEN_HEIGHT, TARGET_FPS);

  // Call the function with settings from the Web Configurator
  // setupEyes(); // << UNCOMMENT AND PASTE YOUR FUNCTION ABOVE
}

void loop() {
  roboEyes.update(); // IMPORTANT: Call this continuously to draw and animate eyes
}
```

This guide should help you get started with the RoboEyes Web Configurator!
