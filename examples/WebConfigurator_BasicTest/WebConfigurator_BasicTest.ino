#include <Wire.h> // For I2C communication
#include <Adafruit_GFX.h> // Core graphics library
#include <Adafruit_SSD1306.h> // Hardware-specific library for SSD1306
#include <FluxGarage_RoboEyes.h> // The main RoboEyes library

// Define screen properties
#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels

// Declaration for an SSD1306 display connected to I2C (SDA, SCL pins)
// OLED_RESET = -1 shares Arduino reset pin
#define OLED_RESET -1
// I2C address may vary (0x3C or 0x3D are common for SSD1306)
#define I2C_ADDRESS 0x3C

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
FluxGarage_RoboEyes roboEyes; // Create an instance of the roboEyes class

// Define the target frame rate for eye animations
const int TARGET_FPS = 60;

// +--------------------------------------------------------------------------+
// | PASTE YOUR GENERATED setupEyes() FUNCTION FROM THE WEB CONFIGURATOR HERE |
// |                                                                          |
// | Example of what it might look like:                                      |
// | void setupEyes() {                                                       |
// |   roboEyes.setWidth(36, 36);                                             |
// |   roboEyes.setHeight(36, 36);                                            |
// |   roboEyes.setBorderradius(8, 8);                                        |
// |   roboEyes.setSpacebetween(10);                                          |
// |   roboEyes.setMood(DEFAULT);                                             |
// |   roboEyes.setPosition(DEFAULT);                                         |
// |   roboEyes.setCyclops(OFF);                                              |
// |   roboEyes.setCuriosity(OFF);                                            |
// |   roboEyes.setAutoblinker(ON, 3, 2); // Or setAutoblinker(OFF)           |
// | }                                                                        |
// +--------------------------------------------------------------------------+

void setup() {
  Serial.begin(115200); // Start serial communication for debugging

  // Initialize the OLED display
  if (!display.begin(SSD1306_SWITCHCAPVCC, I2C_ADDRESS)) {
    Serial.println(F("SSD1306 allocation failed"));
    for (;;); // Don't proceed, loop forever
  }
  display.clearDisplay(); // Clear the display buffer
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0,0);
  display.println("RoboEyes Test");
  display.display(); // Actually draw content to screen
  delay(1000); // Pause for a second

  // Initialize the RoboEyes system
  // Provide screen dimensions and desired max frame rate
  roboEyes.begin(SCREEN_WIDTH, SCREEN_HEIGHT, TARGET_FPS);

  // Call the function containing eye configurations from the Web Configurator
  // Make sure you have pasted the setupEyes() function above and uncomment the next line
  // setupEyes();
}

void loop() {
  // IMPORTANT: Call roboEyes.update() in every loop iteration.
  // This function handles drawing the eyes, animations, and frame rate limiting.
  roboEyes.update();
}
