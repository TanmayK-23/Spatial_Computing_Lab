export type ComponentItem = {
  name: string;
  type: string;
  quantity: number;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

export type Circuit = {
  id: string;          // same as slug
  name: string;
  category: string;
  slug: string;
  thumbnail: string;
  model3D?: string;    // path to .glb (optional)
  description: string;
  components: ComponentItem[];
  wiringSteps: string[];
  codeSnippet: string;
  safetyNotes?: string[];
  quiz?: QuizQuestion[];
};

export const circuits: Circuit[] = [
  {
    id: "ohms-law",
    name: "Ohm’s Law – Single Resistor Circuit",
    category: "Basic Electronics",
    slug: "ohms-law",
    thumbnail: "/images/circuits/ohms-law.png",
    model3D: "/models/ohms-law.glb",
    description:
      "This experiment verifies Ohm’s Law by demonstrating the linear relationship between voltage, current, and resistance using a single resistor.",
    components: [
      { name: "Breadboard", type: "hardware", quantity: 1 },
      { name: "Resistor", type: "passive", quantity: 1 },
      { name: "DC Power Supply", type: "source", quantity: 1 },
      { name: "Ammeter", type: "measurement", quantity: 1 },
      { name: "Voltmeter", type: "measurement", quantity: 1 },
      { name: "Jumper Wires", type: "wire", quantity: 4 },
    ],
    wiringSteps: [
      "Place the resistor on the breadboard.",
      "Connect the ammeter in series with the resistor.",
      "Connect the voltmeter across the resistor.",
      "Apply DC voltage and observe readings."
    ],
    codeSnippet: "Not applicable for this experiment.",
    quiz: [
      {
        question: "Ohm’s Law relates which three quantities?",
        options: ["Voltage, Current, Resistance", "Power, Energy, Time", "Charge, Voltage, Energy"],
        answer: "Voltage, Current, Resistance"
      }
    ]
  },

  {
    id: "voltage-divider",
    name: "Voltage Divider Circuit",
    category: "Analog Electronics",
    slug: "voltage-divider",
    thumbnail: "/images/circuits/voltage-divider.png",
    model3D: "/models/voltage-divider.glb",
    description:
      "This experiment demonstrates how an input voltage is divided across two series resistors, producing a lower output voltage at their junction.",
    components: [
      { name: "Breadboard", type: "hardware", quantity: 1 },
      { name: "Resistors", type: "passive", quantity: 2 },
      { name: "DC Power Supply", type: "source", quantity: 1 },
      { name: "Voltmeter", type: "measurement", quantity: 1 },
      { name: "Jumper Wires", type: "wire", quantity: 4 },
    ],
    wiringSteps: [
      "Place two resistors in series on the breadboard.",
      "Apply input voltage across the resistor pair.",
      "Take output voltage from the junction of the resistors.",
      "Measure the output using a voltmeter."
    ],
    codeSnippet: "Not applicable for this experiment.",
  },

  {
    id: "led-current-limiting",
    name: "LED with Current-Limiting Resistor",
    category: "Basic Electronics",
    slug: "led-current-limiting",
    thumbnail: "/images/circuits/led-current-limiting.png",
    model3D: "/models/led-current-limiting.glb",
    description:
      "This experiment demonstrates safe operation of an LED using a series resistor to limit current.",
    components: [
      { name: "Breadboard", type: "hardware", quantity: 1 },
      { name: "LED", type: "active", quantity: 1 },
      { name: "Resistor", type: "passive", quantity: 1 },
      { name: "DC Power Supply", type: "source", quantity: 1 },
      { name: "Jumper Wires", type: "wire", quantity: 4 },
    ],
    wiringSteps: [
      "Connect the resistor in series with the LED.",
      "Ensure correct LED polarity.",
      "Apply DC voltage and observe LED illumination."
    ],
    codeSnippet: "Not applicable for this experiment.",
  },

  {
    id: "series-resistors",
    name: "Series Resistors – Equivalent Resistance",
    category: "Analog Electronics",
    slug: "series-resistors",
    thumbnail: "/images/circuits/series-resistors.png",
    model3D: "/models/series-resistors.glb",
    description:
      "This experiment demonstrates how equivalent resistance increases when resistors are connected in series.",
    components: [
      { name: "Breadboard", type: "hardware", quantity: 1 },
      { name: "Resistors", type: "passive", quantity: 2 },
      { name: "DC Power Supply", type: "source", quantity: 1 },
      { name: "Jumper Wires", type: "wire", quantity: 4 },
    ],
    wiringSteps: [
      "Place two resistors end-to-end on the breadboard.",
      "Connect the series combination to the power supply.",
      "Observe the single current path."
    ],
    codeSnippet: "Not applicable for this experiment.",
  },

  {
    id: "parallel-resistors",
    name: "Parallel Resistors – Current Division",
    category: "Analog Electronics",
    slug: "parallel-resistors",
    thumbnail: "/images/circuits/parallel-resistors.png",
    model3D: "/models/parallel-resistors.glb",
    description:
      "This experiment demonstrates current division when resistors are connected in parallel.",
    components: [
      { name: "Breadboard", type: "hardware", quantity: 1 },
      { name: "Resistors", type: "passive", quantity: 2 },
      { name: "DC Power Supply", type: "source", quantity: 1 },
      { name: "Jumper Wires", type: "wire", quantity: 5 },
    ],
    wiringSteps: [
      "Place resistors in parallel across the power supply.",
      "Ensure both resistors share the same input and output nodes.",
      "Observe multiple current paths."
    ],
    codeSnippet: "Not applicable for this experiment.",
  },

  {
    id: "rc-circuit",
    name: "RC Circuit – Charging and Discharging",
    category: "Analog Electronics",
    slug: "rc-circuit",
    thumbnail: "/images/circuits/rc-circuit.png",
    model3D: "/models/rc-charging-discharging.glb",
    description:
      "This experiment demonstrates the charging and discharging behavior of a capacitor through a resistor.",
    components: [
      { name: "Breadboard", type: "hardware", quantity: 1 },
      { name: "Resistor", type: "passive", quantity: 1 },
      { name: "Capacitor", type: "passive", quantity: 1 },
      { name: "DC Power Supply", type: "source", quantity: 1 },
      { name: "Jumper Wires", type: "wire", quantity: 4 },
    ],
    wiringSteps: [
      "Connect the resistor in series with the capacitor.",
      "Apply DC voltage to charge the capacitor.",
      "Disconnect supply to observe discharge behavior."
    ],
    codeSnippet: "Not applicable for this experiment.",
  },

  {
    id: "transistor-switching",
    name: "Transistor Switching – Logic Level Demonstration",
    category: "Semiconductor Devices",
    slug: "transistor-switching",
    thumbnail: "/images/circuits/transistor-switching.png",
    model3D: "/models/transistor-switching.glb",
    description:
      "This experiment demonstrates transistor operation as a switch, where a small base current controls a larger load current.",
    components: [
      { name: "Breadboard", type: "hardware", quantity: 1 },
      { name: "NPN Transistor", type: "active", quantity: 1 },
      { name: "LED", type: "active", quantity: 1 },
      { name: "Resistor", type: "passive", quantity: 2 },
      { name: "DC Power Supply", type: "source", quantity: 1 },
      { name: "Jumper Wires", type: "wire", quantity: 6 },
    ],
    wiringSteps: [
      "Connect the LED as a load at the collector.",
      "Connect emitter to ground.",
      "Apply base current through a resistor to switch the LED ON and OFF."
    ],
    codeSnippet: "Not applicable for this experiment.",
  },
  {
    id: "traffic-light-esp8266",
    name: "Traffic Light Control using ESP8266",
    category: "Embedded Systems",
    slug: "traffic-light-esp8266",
    thumbnail: "/images/circuits/traffic-light-esp8266.png",
    model3D: "/models/traffic-light-esp8266.glb",
    description:
      "This experiment demonstrates traffic light control using an ESP8266 microcontroller, where GPIO pins are used to drive red, yellow, and green LEDs in a timed sequence.",
  
    components: [
      { name: "ESP8266", type: "microcontroller", quantity: 1 },
      { name: "Traffic Light LED Module", type: "output", quantity: 1 },
      { name: "Breadboard", type: "hardware", quantity: 1 },
      { name: "Jumper Wires", type: "wire", quantity: 5 },
      { name: "USB Power Supply", type: "source", quantity: 1 },
    ],
  
    wiringSteps: [
      "Connect ESP8266 3.3V and GND to the traffic light module.",
      "Connect GPIO pins to Red, Yellow, and Green LED inputs.",
      "Upload control logic to ESP8266.",
      "Observe timed LED switching sequence."
    ],
  
    codeSnippet: 
  `// ESP8266 Traffic Light Logic
  void setup() {
    pinMode(D1, OUTPUT);
    pinMode(D2, OUTPUT);
    pinMode(D3, OUTPUT);
  }
  
  void loop() {
    digitalWrite(D1, HIGH); // Red
    delay(5000);
    digitalWrite(D1, LOW);
  
    digitalWrite(D2, HIGH); // Yellow
    delay(2000);
    digitalWrite(D2, LOW);
  
    digitalWrite(D3, HIGH); // Green
    delay(5000);
    digitalWrite(D3, LOW);
  }`
  }
];
