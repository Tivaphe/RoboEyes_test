document.addEventListener('DOMContentLoaded', () => {
    // Get references to UI elements
    const leftEyeWidthInput = document.getElementById('leftEyeWidth');
    const leftEyeHeightInput = document.getElementById('leftEyeHeight');
    const leftEyeBorderRadiusInput = document.getElementById('leftEyeBorderRadius');
    const rightEyeWidthInput = document.getElementById('rightEyeWidth');
    const rightEyeHeightInput = document.getElementById('rightEyeHeight');
    const rightEyeBorderRadiusInput = document.getElementById('rightEyeBorderRadius');
    const spaceBetweenEyesInput = document.getElementById('spaceBetweenEyes');
    const moodSelect = document.getElementById('mood');
    const positionSelect = document.getElementById('position');
    const cyclopsModeCheckbox = document.getElementById('cyclopsMode');
    const curiousModeCheckbox = document.getElementById('curiousMode');
    const autoblinkerCheckbox = document.getElementById('autoblinker');
    const generatedCodeTextarea = document.getElementById('generated-code');
    const eyeDisplayArea = document.getElementById('eye-display-area');
    const leftEyeDiv = document.getElementById('left-eye');
    const rightEyeDiv = document.getElementById('right-eye');

    // Global Settings UI Elements
    const screenWidthInput = document.getElementById('screenWidth');
    const screenHeightInput = document.getElementById('screenHeight');
    const frameRateInput = document.getElementById('frameRate');

    // Sequence UI Elements
    const stepDurationInput = document.getElementById('step-duration');
    const addStepButton = document.getElementById('add-step-button');
    const sequenceStepsDisplay = document.getElementById('sequence-steps-display');
    const clearSequenceButton = document.getElementById('clear-sequence-button');

// Global variable for sequence
let eyeSequence = [];

// Mappings for C++ defines
const moodToDefine = { 'DEFAULT': 'DEFAULT', 'TIRED': 'TIRED', 'ANGRY': 'ANGRY', 'HAPPY': 'HAPPY' };
const positionToDefine = { 'DEFAULT': 'DEFAULT', 'N': 'N', 'NE': 'NE', 'E': 'E', 'SE': 'SE', 'S': 'S', 'SW': 'SW', 'W': 'W', 'NW': 'NW' };


    /**
     * Updates the eye display based on the current control values.
     */
    function updateEyeDisplay() {
        // Clear previous dynamic styles (margins for spacing) and mood classes
        leftEyeDiv.style.marginLeft = '0px';
        rightEyeDiv.style.marginLeft = '0px';
        leftEyeDiv.style.marginRight = '0px';
        rightEyeDiv.style.marginRight = '0px';
        leftEyeDiv.className = ''; // Clear existing classes
        rightEyeDiv.className = ''; // Clear existing classes


        const lEyeWidthVal = parseInt(leftEyeWidthInput.value);
        const lEyeHeightVal = parseInt(leftEyeHeightInput.value);
        const lEyeBorderRadiusVal = parseInt(leftEyeBorderRadiusInput.value);

        const rEyeWidthVal = parseInt(rightEyeWidthInput.value);
        const rEyeHeightVal = parseInt(rightEyeHeightInput.value);
        const rEyeBorderRadiusVal = parseInt(rightEyeBorderRadiusInput.value);

        const spacingVal = parseInt(spaceBetweenEyesInput.value);
        const currentMood = moodSelect.value;
        const isCyclops = cyclopsModeCheckbox.checked;

        // Apply base styles
        leftEyeDiv.style.width = lEyeWidthVal + 'px';
        leftEyeDiv.style.height = lEyeHeightVal + 'px';
        leftEyeDiv.style.borderRadius = lEyeBorderRadiusVal + 'px';
        leftEyeDiv.style.backgroundColor = 'white';

        if (isCyclops) {
            rightEyeDiv.style.display = 'none';
            leftEyeDiv.style.marginLeft = '0px';
            leftEyeDiv.style.marginRight = '0px';

            // Apply mood class for cyclops
            if (currentMood === "ANGRY") {
                leftEyeDiv.classList.add('cyclops-angry-eye');
            } else if (currentMood !== "DEFAULT") {
                leftEyeDiv.classList.add(currentMood.toLowerCase() + '-eye');
            }
        } else {
            rightEyeDiv.style.display = 'block';
            rightEyeDiv.style.width = rEyeWidthVal + 'px';
            rightEyeDiv.style.height = rEyeHeightVal + 'px';
            rightEyeDiv.style.borderRadius = rEyeBorderRadiusVal + 'px';
            rightEyeDiv.style.backgroundColor = 'white';

            const halfSpacing = spacingVal / 2 + 'px';
            leftEyeDiv.style.marginRight = halfSpacing;
            rightEyeDiv.style.marginLeft = halfSpacing;

            // Apply mood class for two eyes
            if (currentMood !== "DEFAULT") {
                leftEyeDiv.classList.add(currentMood.toLowerCase() + '-eye');
                rightEyeDiv.classList.add(currentMood.toLowerCase() + '-eye');
            }
        }
    }

    /**
     * Generates C++ code based on the current control values.
     */
    function generateEspCode() {
        // Read global settings
        const screenWidth = parseInt(screenWidthInput.value) || 128;
        const screenHeight = parseInt(screenHeightInput.value) || 64;
        const frameRate = parseInt(frameRateInput.value) || 60;

        // Read eye-specific settings
        const lw = parseInt(leftEyeWidthInput.value);
        const lh = parseInt(leftEyeHeightInput.value);
        const lbr = parseInt(leftEyeBorderRadiusInput.value);
        const rw = parseInt(rightEyeWidthInput.value);
        const rh = parseInt(rightEyeHeightInput.value);
        const rbr = parseInt(rightEyeBorderRadiusInput.value);
        const space = parseInt(spaceBetweenEyesInput.value);
        const mood = moodSelect.value;
        const position = positionSelect.value;
        const cyclops = cyclopsModeCheckbox.checked;
        const curious = curiousModeCheckbox.checked;
        const autoblinker = autoblinkerCheckbox.checked;

        let code = `// RoboEyes Configuration by RoboEyes Configurator\n\n`;
        code += `#include "FluxGarage_RoboEyes.h" // RoboEyes Library\n\n`;
        code += `// Screen dimensions (configurable in UI)\n`;
        code += `#define SCREEN_WIDTH ${screenWidth}\n`;
        code += `#define SCREEN_HEIGHT ${screenHeight}\n\n`;
        code += `// Pin for OLED Reset (-1 if sharing Arduino reset pin)\n`;
        code += `#define OLED_RESET -1 \n\n`;
        code += `// Target frame rate (configurable in UI)\n`;
        code += `const int TARGET_FPS = ${frameRate};\n\n`;
        code += `Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);\n`;
        code += `FluxGarage_RoboEyes roboEyes(&display);\n\n`;
        code += `// This function applies the settings configured in the UI\n`;
        code += `void setupEyes() {\n`;
        code += `  // Initialize display\n`;
        code += `  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { // Address 0x3C for 128x64, common for these type of displays\n`;
        code += `    Serial.println(F("SSD1306 allocation failed"));\n`;
        code += `    for(;;); // Don't proceed, loop forever\n`;
        code += `  }\n`;
        code += `  display.clearDisplay();\n\n`;
        code += `  // Initialize RoboEyes\n`;
        code += `  roboEyes.begin(SCREEN_WIDTH, SCREEN_HEIGHT, TARGET_FPS);\n\n`;
        code += `  // Apply eye properties\n`;
        code += `  roboEyes.setWidth(${lw}, ${rw}); // Left and Right eye widths\n`;
        code += `  roboEyes.setHeight(${lh}, ${rh}); // Left and Right eye heights\n`;
        code += `  roboEyes.setBorderradius(${lbr}, ${rbr}); // Left and Right eye border radii\n`;
        code += `  roboEyes.setSpacebetween(${space}); // Space between eyes\n`;
        code += `  roboEyes.setMood(${mood}); // Eye mood (e.g., HAPPY, TIRED, ANGRY)\n`;
        code += `  roboEyes.setPosition(${position}); // Eye position (e.g., N, S, E, W)\n`;
        code += `  roboEyes.setCyclops(${cyclops ? "ON" : "OFF"}); // Cyclops mode (single eye)\n`;
        code += `  roboEyes.setCuriosity(${curious ? "ON" : "OFF"}); // Curiosity mode (eyes follow mouse/target - if implemented)\n`;

        if (autoblinker) {
            code += `  roboEyes.setAutoblinker(ON, 3, 2); // Autoblinker enabled with default parameters\n`;
        } else {
            code += `  roboEyes.setAutoblinker(OFF); // Autoblinker disabled\n`;
        }
        code += `}\n\n`;
        code += `// In your main Arduino sketch:\n`;
        code += `// 1. Include this generated configuration (e.g., #include "robo_eyes_config.h")\n`;
        code += `// 2. Call setupEyes() in your setup() function.\n`;
        code += `// 3. Call roboEyes.update() continuously in your loop() function.\n`;
        generatedCodeTextarea.value = code;
        return; // Exit after generating single-state code
    }

    // --- SEQUENCE MODE CODE GENERATION ---
    // This part generates code for a full .ino sketch for ESP32 sequence playback
    let code = `// RoboEyes ESP32 Sequence Sketch by RoboEyes Configurator\n\n`;
    code += `#include <Adafruit_GFX.h>      // Core graphics library\n`;
    code += `#include <Adafruit_SSD1306.h>  // SSD1306 OLED driver\n`;
    code += `#include "FluxGarage_RoboEyes.h" // RoboEyes Library\n\n`;

    code += `// Screen dimensions (configurable in UI)\n`;
    code += `#define SCREEN_WIDTH ${screenWidth}\n`;
    code += `#define SCREEN_HEIGHT ${screenHeight}\n\n`;
    code += `// Pin for OLED Reset (-1 if sharing Arduino reset pin)\n`;
    code += `#define OLED_RESET -1 \n\n`;
    code += `// Target frame rate (configurable in UI)\n`;
    code += `const int TARGET_FPS = ${frameRate};\n\n`;
    code += `// SSD1306 display object connected to I2C\n`;
    code += `Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);\n`;
    code += `// RoboEyes object, passing the display reference\n`;
    code += `FluxGarage_RoboEyes roboEyes(&display);\n\n`;

    code += `// Structure to define each step in the eye animation sequence\n`;
    code += `struct EyeStep {\n`;
    code += `  int lWidth, rWidth;          // Widths of left and right eyes\n`;
    code += `  int lHeight, rHeight;        // Heights of left and right eyes\n`;
    code += `  int lRadius, rRadius;        // Border radii of left and right eyes\n`;
    code += `  int spaceBetween;            // Space between the eyes\n`;
    code += `  byte mood;                   // Mood of the eyes (e.g., HAPPY, TIRED)\n`;
    code += `  byte position;               // Position/direction eyes are looking (e.g., N, S, E, W)\n`;
    code += `  bool cyclops;                // True for cyclops mode (single eye)\n`;
    code += `  bool curious;                // True for curiosity mode\n`;
    code += `  bool autoblinker;            // True to enable autoblinker for this step\n`;
    code += `  unsigned int duration;       // Duration of this step in milliseconds\n`;
    code += `};\n\n`;

    code += `// Array defining the sequence of eye states\n`;
    const stepInitializers = eyeSequence.map(step => {
        return `  { ${step.leftEyeWidth}, ${step.rightEyeWidth}, ${step.leftEyeHeight}, ${step.rightEyeHeight}, ${step.leftEyeBorderRadius}, ${step.rightEyeBorderRadius}, ${step.spaceBetweenEyes}, ${moodToDefine[step.mood] || 'DEFAULT'}, ${positionToDefine[step.position] || 'DEFAULT'}, ${step.cyclopsMode ? "true" : "false"}, ${step.curiousMode ? "true" : "false"}, ${step.autoblinker ? "true" : "false"}, ${step.duration} } // Mood: ${step.mood}, Pos: ${step.position}`;
    });

    code += `EyeStep sequence[] = {\n${stepInitializers.join(',\n')}\n};\n\n`;
    code += `// Total number of steps in the sequence\n`;
    code += `int numSteps = sizeof(sequence) / sizeof(EyeStep);\n`;
    code += `// Index of the current step in the sequence\n`;
    code += `int currentStep = 0;\n`;
    code += `// Time when the last step was started\n`;
    code += `unsigned long lastStepTime = 0;\n\n`;

    code += `// Arduino setup function - runs once at startup\n`;
    code += `void setup() {\n`;
    code += `  Serial.begin(115200); // Initialize serial communication\n\n`;
    code += `  // Initialize the display\n`;
    code += `  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { // Address 0x3C for 128x64 OLEDs\n`;
    code += `    Serial.println(F("SSD1306 allocation failed"));\n`;
    code += `    for(;;); // Loop forever if display fails\n`;
    code += `  }\n`;
    code += `  display.clearDisplay(); // Clear the display buffer\n\n`;
    code += `  // Initialize RoboEyes with screen dimensions and target FPS\n`;
    code += `  roboEyes.begin(SCREEN_WIDTH, SCREEN_HEIGHT, TARGET_FPS);\n\n`;
    code += `  Serial.println("RoboEyes Sequence Initialized. Starting loop...");\n`;
    code += `  // The first step's settings will be applied at the beginning of the loop\n`;
    code += `}\n\n`;

    code += `// Arduino loop function - runs repeatedly\n`;
    code += `void loop() {\n`;
    code += `  // Check if it's time to move to the next step in the sequence\n`;
    code += `  if (millis() - lastStepTime >= sequence[currentStep].duration) {\n`;
    code += `    lastStepTime = millis(); // Record the time of this step change\n\n`;
    code += `    // Get a reference to the current step's data for easier access\n`;
    code += `    EyeStep &s = sequence[currentStep];\n\n`;
    code += `    Serial.print("Executing Step: "); Serial.println(currentStep);\n\n`;
    code += `    // Apply all settings from the current step to the RoboEyes object\n`;
    code += `    roboEyes.setWidth(s.lWidth, s.rWidth);\n`;
    code += `    roboEyes.setHeight(s.lHeight, s.rHeight);\n`;
    code += `    roboEyes.setBorderradius(s.lRadius, s.rRadius);\n`;
    code += `    roboEyes.setSpacebetween(s.spaceBetween);\n`;
    code += `    roboEyes.setMood(s.mood);\n`;
    code += `    roboEyes.setPosition(s.position);\n`;
    code += `    roboEyes.setCyclops(s.cyclops);\n`;
    code += `    roboEyes.setCuriosity(s.curious);\n\n`;
    code += `    // Configure autoblinker for the current step\n`;
    code += `    if (s.autoblinker) {\n`;
    code += `      roboEyes.setAutoblinker(ON, 3, 2); // Using default blink duration (3 frames) and interval (2 frames)\n`;
    code += `    } else {\n`;
    code += `      roboEyes.setAutoblinker(OFF);\n`;
    code += `    }\n\n`;
    code += `    // Move to the next step, or loop back to the beginning if the sequence is over\n`;
    code += `    currentStep++;\n`;
    code += `    if (currentStep >= numSteps) {\n`;
    code += `      currentStep = 0; // Loop sequence\n`;
    code += `      Serial.println("Sequence completed. Restarting.");\n`;
    code += `    }\n`;
    code += `  }\n\n`;
    code += `  // Update RoboEyes continuously to render animations and eye movements\n`;
    code += `  roboEyes.update();\n`;
    code += `}\n`;

    generatedCodeTextarea.value = code;
}


    /**
     * Adds the current eye settings as a step in the sequence.
     */
    function addStepToSequence() {
        const currentEyeState = {
            leftEyeWidth: parseInt(leftEyeWidthInput.value),
            leftEyeHeight: parseInt(leftEyeHeightInput.value),
            leftEyeBorderRadius: parseInt(leftEyeBorderRadiusInput.value),
            rightEyeWidth: parseInt(rightEyeWidthInput.value),
            rightEyeHeight: parseInt(rightEyeHeightInput.value),
            rightEyeBorderRadius: parseInt(rightEyeBorderRadiusInput.value),
            spaceBetweenEyes: parseInt(spaceBetweenEyesInput.value),
            mood: moodSelect.value,
            position: positionSelect.value,
            cyclopsMode: cyclopsModeCheckbox.checked,
            curiousMode: curiousModeCheckbox.checked,
            autoblinker: autoblinkerCheckbox.checked,
            duration: parseInt(stepDurationInput.value) || 1000
        };
        eyeSequence.push(JSON.parse(JSON.stringify(currentEyeState))); // Deep copy
        updateSequenceDisplay();
        generateEspCode();
    }

    /**
     * Updates the display of sequence steps.
     */
    function updateSequenceDisplay() {
        sequenceStepsDisplay.innerHTML = ''; // Clear current display

        if (eyeSequence.length === 0) {
            const p = document.createElement('p');
            p.textContent = 'No steps in sequence.';
            sequenceStepsDisplay.appendChild(p);
            return;
        }

        eyeSequence.forEach((step, index) => {
            const stepDiv = document.createElement('div');
            stepDiv.classList.add('sequence-step');

            let summaryText = `Step ${index + 1}: `;
            summaryText += `Mood: ${step.mood}, Pos: ${step.position}, `;
            if (step.cyclopsMode) {
                summaryText += `Cyclops (W:${step.leftEyeWidth}, H:${step.leftEyeHeight}, BR:${step.leftEyeBorderRadius}), `;
            } else {
                summaryText += `L(W:${step.leftEyeWidth}, H:${step.leftEyeHeight}, BR:${step.leftEyeBorderRadius}), `;
                summaryText += `R(W:${step.rightEyeWidth}, H:${step.rightEyeHeight}, BR:${step.rightEyeBorderRadius}), `;
                summaryText += `Space: ${step.spaceBetweenEyes}, `;
            }
            summaryText += `Curious: ${step.curiousMode ? 'ON' : 'OFF'}, `;
            summaryText += `Blinker: ${step.autoblinker ? 'ON' : 'OFF'}, `;
            summaryText += `Dur: ${step.duration}ms`;

            const textSpan = document.createElement('span');
            textSpan.textContent = summaryText;
            stepDiv.appendChild(textSpan);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.setAttribute('data-index', index); // Store index for removal
            removeButton.onclick = () => {
                eyeSequence.splice(index, 1);
                updateSequenceDisplay();
                generateEspCode();
            };
            stepDiv.appendChild(removeButton);

            sequenceStepsDisplay.appendChild(stepDiv);
        });
    }

    /**
     * Clears all steps from the sequence.
     */
    function clearSequence() {
        eyeSequence = [];
        updateSequenceDisplay();
        generateEspCode();
    }

    // Attach event listeners to sequence buttons
    addStepButton.addEventListener('click', addStepToSequence);
    clearSequenceButton.addEventListener('click', clearSequence);

    // Attach event listeners to all input/select elements
    const allControls = [
        screenWidthInput, screenHeightInput, frameRateInput, // Global settings
        leftEyeWidthInput, leftEyeHeightInput, leftEyeBorderRadiusInput,
        rightEyeWidthInput, rightEyeHeightInput, rightEyeBorderRadiusInput,
        spaceBetweenEyesInput, moodSelect, positionSelect,
        cyclopsModeCheckbox, curiousModeCheckbox, autoblinkerCheckbox
        // stepDurationInput is not here as it doesn't directly change visual eye state or single ESP code
    ];

    allControls.forEach(control => {
        control.addEventListener('change', () => {
            updateEyeDisplay();
            generateEspCode();
        });
        // Also call them once initially to set the default code
        if (control.type === 'checkbox' || control.tagName === 'SELECT') {
             // For checkboxes and selects, 'change' is appropriate for initial call too
            control.addEventListener('input', () => { // 'input' for more responsive updates on some elements
                updateEyeDisplay();
                generateEspCode();
            });
        } else { // For number inputs, 'input' gives more real-time feedback
            control.addEventListener('input', () => {
                updateEyeDisplay();
                generateEspCode();
            });
        }
    });

    // Initial calls to populate display and code
    updateEyeDisplay();
    updateSequenceDisplay(); // Initial call for sequence display
    generateEspCode();
});
