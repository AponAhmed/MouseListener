# 🖱️ MouseListener Utility

A comprehensive, lightweight JavaScript library for tracking and handling mouse events, positions, and interactions in web applications. Zero dependencies, pure vanilla JavaScript.

## ✨ Features

- **📍 Mouse Position Tracking** - Real-time coordinate monitoring
- **👆 Click Detection** - Single, double, and right-click handlers
- **🎯 Hover Tracking** - Monitor mouse enter/leave states
- **🎨 Drag and Drop** - Simplified drag implementation
- **🔘 Button States** - Track which mouse buttons are pressed
- **🔄 Scroll Wheel** - Monitor scroll direction and delta
- **⚡ Movement Analysis** - Calculate velocity and direction
- **✨ Custom Cursor** - Utilities for custom cursor implementations
- **🔢 Click Counter** - Count rapid clicks within time windows
- **🚪 Enter/Leave Detection** - Element boundary detection

## 📦 Installation

```bash
npm install mouse-listener-utility
```

Or include directly in your HTML:

```html
<script type="module" src="path/to/src/index.js"></script>
```

## 🚀 Quick Start

```javascript
import { MousePosition, ClickDetector } from 'mouse-listener-utility';

// Track mouse position
const posTracker = new MousePosition(document, (pos) => {
  console.log(`Mouse at: ${pos.x}, ${pos.y}`);
});

// Detect clicks
const clickDetector = new ClickDetector(myElement, {
  onClick: (event) => console.log('Clicked!'),
  onDoubleClick: (event) => console.log('Double clicked!'),
  onRightClick: (event) => console.log('Right clicked!')
});
```

## 📚 API Documentation

### MousePosition

Track real-time mouse coordinates.

```javascript
const tracker = new MousePosition(element, callback);
```

**Parameters:**
- `element` (HTMLElement, optional) - Target element (defaults to `document`)
- `callback` (Function) - Callback receiving `{x, y}` coordinates

**Methods:**
- `getPosition()` - Returns current position `{x, y}`
- `start()` - Start tracking (called automatically)
- `stop()` - Stop tracking and cleanup

**Example:**
```javascript
const tracker = new MousePosition(document, (pos) => {
  console.log(`X: ${pos.x}, Y: ${pos.y}`);
});

// Get current position
const currentPos = tracker.getPosition();

// Clean up
tracker.stop();
```

---

### ClickDetector

Handle single, double, and right-click events.

```javascript
const detector = new ClickDetector(element, callbacks);
```

**Parameters:**
- `element` (HTMLElement) - Target element
- `callbacks` (Object) - Object with optional callbacks:
  - `onClick` (Function) - Single click handler
  - `onDoubleClick` (Function) - Double click handler
  - `onRightClick` (Function) - Right click handler

**Methods:**
- `start()` - Start listening (called automatically)
- `stop()` - Stop listening and cleanup

**Example:**
```javascript
const detector = new ClickDetector(myButton, {
  onClick: (event) => console.log('Single click'),
  onDoubleClick: (event) => console.log('Double click'),
  onRightClick: (event) => console.log('Right click')
});
```

---

### HoverTracker

Monitor hover states with enter/leave events.

```javascript
const tracker = new HoverTracker(element, callbacks);
```

**Parameters:**
- `element` (HTMLElement) - Target element
- `callbacks` (Object) - Object with optional callbacks:
  - `onEnter` (Function) - Mouse enter handler
  - `onLeave` (Function) - Mouse leave handler

**Methods:**
- `getHoverState()` - Returns `true` if currently hovering
- `start()` - Start tracking (called automatically)
- `stop()` - Stop tracking and cleanup

**Example:**
```javascript
const tracker = new HoverTracker(myDiv, {
  onEnter: () => console.log('Mouse entered'),
  onLeave: () => console.log('Mouse left')
});

if (tracker.getHoverState()) {
  console.log('Currently hovering');
}
```

---

### DragAndDrop

Simplified drag and drop implementation.

```javascript
const dragger = new DragAndDrop(element, callbacks);
```

**Parameters:**
- `element` (HTMLElement) - Draggable element
- `callbacks` (Object) - Object with optional callbacks:
  - `onStart(event, startPos)` - Drag start handler
  - `onDrag(event, currentPos, delta)` - Drag move handler
  - `onEnd(event, finalPos, delta)` - Drag end handler

**Methods:**
- `start()` - Enable dragging (called automatically)
- `stop()` - Disable dragging and cleanup

**Example:**
```javascript
const dragger = new DragAndDrop(myElement, {
  onStart: (event, pos) => {
    console.log(`Started at ${pos.x}, ${pos.y}`);
  },
  onDrag: (event, pos, delta) => {
    myElement.style.left = delta.x + 'px';
    myElement.style.top = delta.y + 'px';
  },
  onEnd: (event, pos, delta) => {
    console.log(`Moved ${delta.x}px, ${delta.y}px`);
  }
});
```

---

### MouseButtons

Track which mouse buttons are currently pressed.

```javascript
const tracker = new MouseButtons();
```

**Methods:**
- `getButtonStates()` - Returns `{left, right, middle}` object
- `isPressed(button)` - Check if specific button is pressed ('left', 'right', or 'middle')
- `start()` - Start tracking (called automatically)
- `stop()` - Stop tracking and cleanup

**Example:**
```javascript
const tracker = new MouseButtons();

// Check button states
const states = tracker.getButtonStates();
console.log(states.left); // true or false

// Check specific button
if (tracker.isPressed('left')) {
  console.log('Left button is pressed');
}
```

---

### ScrollWheel

Monitor scroll wheel direction and delta.

```javascript
const tracker = new ScrollWheel(element, callback);
```

**Parameters:**
- `element` (HTMLElement, optional) - Target element (defaults to `document`)
- `callback` (Function) - Callback receiving `{deltaX, deltaY, deltaZ, direction}` and event

**Methods:**
- `start()` - Start tracking (called automatically)
- `stop()` - Stop tracking and cleanup

**Example:**
```javascript
const tracker = new ScrollWheel(myScrollableDiv, (data, event) => {
  console.log(`Direction: ${data.direction}`); // 'up' or 'down'
  console.log(`Delta Y: ${data.deltaY}`);
});
```

---

### MovementTracker

Calculate mouse velocity and direction.

```javascript
const tracker = new MovementTracker(element, callback);
```

**Parameters:**
- `element` (HTMLElement, optional) - Target element (defaults to `document`)
- `callback` (Function) - Callback receiving `{velocity, speed, angle, position}`

**Methods:**
- `getVelocity()` - Returns current velocity `{x, y}`
- `start()` - Start tracking (called automatically)
- `stop()` - Stop tracking and cleanup

**Example:**
```javascript
const tracker = new MovementTracker(document, (data) => {
  console.log(`Speed: ${data.speed}`);
  console.log(`Angle: ${data.angle}°`);
  console.log(`Velocity: ${data.velocity.x}, ${data.velocity.y}`);
});
```

---

### CustomCursor

Utilities for custom cursor implementations.

```javascript
const cursor = new CustomCursor(cursorElement, options);
```

**Parameters:**
- `cursorElement` (HTMLElement) - Custom cursor element
- `options` (Object) - Configuration options:
  - `smooth` (Boolean) - Enable smooth following (default: `true`)
  - `offset` (Object) - Offset from mouse `{x, y}` (default: `{x: 0, y: 0}`)

**Methods:**
- `start()` - Start cursor tracking (called automatically)
- `stop()` - Stop cursor tracking and cleanup

**Example:**
```javascript
const cursorEl = document.getElementById('customCursor');
const cursor = new CustomCursor(cursorEl, {
  smooth: true,
  offset: { x: -10, y: -10 }
});
```

---

### ClickCounter

Count clicks within a customizable time window.

```javascript
const counter = new ClickCounter(element, options);
```

**Parameters:**
- `element` (HTMLElement) - Target element
- `options` (Object) - Configuration:
  - `timeWindow` (Number) - Time window in milliseconds (default: 2000)
  - `callback` (Function) - Callback receiving click count and event

**Methods:**
- `getCount()` - Returns current click count within time window
- `reset()` - Reset click counter
- `start()` - Start counting (called automatically)
- `stop()` - Stop counting and cleanup

**Example:**
```javascript
const counter = new ClickCounter(myButton, {
  timeWindow: 2000, // 2 seconds
  callback: (count, event) => {
    console.log(`${count} clicks in 2 seconds`);
  }
});

// Get current count
console.log(counter.getCount());

// Reset counter
counter.reset();
```

---

### MouseEnterLeave

Detect when mouse enters or leaves specific elements.

```javascript
const detector = new MouseEnterLeave(element, callbacks);
```

**Parameters:**
- `element` (HTMLElement) - Target element
- `callbacks` (Object) - Object with optional callbacks:
  - `onEnter` (Function) - Mouse enter handler
  - `onLeave` (Function) - Mouse leave handler

**Methods:**
- `isMouseInside()` - Returns `true` if mouse is currently inside element
- `start()` - Start detection (called automatically)
- `stop()` - Stop detection and cleanup

**Example:**
```javascript
const detector = new MouseEnterLeave(myElement, {
  onEnter: () => console.log('Entered element'),
  onLeave: () => console.log('Left element')
});
```

## 🎨 Live Demo

Check out the interactive demo by opening `example/index.html` in your browser. The demo showcases all utilities with visual feedback and real-time displays.

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Opera (Latest)

Works with all modern browsers supporting ES6 modules.

## 📝 License

MIT License - feel free to use this library in your projects!

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 💡 Use Cases

- **Interactive Visualizations** - Track mouse for data exploration
- **Games** - Handle player input and interactions
- **Custom UI Components** - Build draggable, clickable elements
- **Analytics** - Monitor user mouse behavior
- **Accessibility Tools** - Create custom cursors and inputs
- **Drawing Applications** - Track drawing movements
- **Tooltips & Popovers** - Position elements based on mouse

## 🔧 Development

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the directory
cd MouseListener

# Open the example
# Just open example/index.html in your browser
```

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Made with ❤️ for better mouse interactions

