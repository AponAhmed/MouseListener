/**
 * MouseListener Utility Library
 * A comprehensive collection of mouse event utilities for web applications
 */

/**
 * MousePosition - Track real-time mouse coordinates
 * @param {HTMLElement} element - Target element (defaults to document)
 * @param {Function} callback - Callback function receiving {x, y} coordinates
 * @returns {Function} Cleanup function to remove listeners
 */
export class MousePosition {
    constructor(element = document, callback) {
        this.element = element;
        this.callback = callback;
        this.position = { x: 0, y: 0 };
        this.handleMove = this.handleMove.bind(this);
        this.start();
    }

    handleMove(event) {
        this.position.x = event.clientX;
        this.position.y = event.clientY;
        if (this.callback) {
            this.callback(this.position);
        }
    }

    start() {
        this.element.addEventListener('mousemove', this.handleMove);
    }

    stop() {
        this.element.removeEventListener('mousemove', this.handleMove);
    }

    getPosition() {
        return this.position;
    }
}

/**
 * ClickDetector - Handle single, double, and right-click events
 * @param {HTMLElement} element - Target element
 * @param {Object} callbacks - Object with onClick, onDoubleClick, onRightClick callbacks
 * @returns {Function} Cleanup function
 */
export class ClickDetector {
    constructor(element, callbacks = {}) {
        this.element = element;
        this.callbacks = callbacks;
        this.handleClick = this.handleClick.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.start();
    }

    handleClick(event) {
        if (this.callbacks.onClick) {
            this.callbacks.onClick(event);
        }
    }

    handleDoubleClick(event) {
        if (this.callbacks.onDoubleClick) {
            this.callbacks.onDoubleClick(event);
        }
    }

    handleContextMenu(event) {
        if (this.callbacks.onRightClick) {
            event.preventDefault();
            this.callbacks.onRightClick(event);
        }
    }

    start() {
        this.element.addEventListener('click', this.handleClick);
        this.element.addEventListener('dblclick', this.handleDoubleClick);
        this.element.addEventListener('contextmenu', this.handleContextMenu);
    }

    stop() {
        this.element.removeEventListener('click', this.handleClick);
        this.element.removeEventListener('dblclick', this.handleDoubleClick);
        this.element.removeEventListener('contextmenu', this.handleContextMenu);
    }
}

/**
 * HoverTracker - Monitor hover states with enter/leave events
 * @param {HTMLElement} element - Target element
 * @param {Object} callbacks - Object with onEnter and onLeave callbacks
 */
export class HoverTracker {
    constructor(element, callbacks = {}) {
        this.element = element;
        this.callbacks = callbacks;
        this.isHovering = false;
        this.handleEnter = this.handleEnter.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.start();
    }

    handleEnter(event) {
        this.isHovering = true;
        if (this.callbacks.onEnter) {
            this.callbacks.onEnter(event);
        }
    }

    handleLeave(event) {
        this.isHovering = false;
        if (this.callbacks.onLeave) {
            this.callbacks.onLeave(event);
        }
    }

    start() {
        this.element.addEventListener('mouseenter', this.handleEnter);
        this.element.addEventListener('mouseleave', this.handleLeave);
    }

    stop() {
        this.element.removeEventListener('mouseenter', this.handleEnter);
        this.element.removeEventListener('mouseleave', this.handleLeave);
    }

    getHoverState() {
        return this.isHovering;
    }
}

/**
 * DragAndDrop - Simplified drag and drop implementation
 * @param {HTMLElement} element - Draggable element
 * @param {Object} callbacks - Object with onStart, onDrag, onEnd callbacks
 */
export class DragAndDrop {
    constructor(element, callbacks = {}) {
        this.element = element;
        this.callbacks = callbacks;
        this.isDragging = false;
        this.startPos = { x: 0, y: 0 };
        this.currentPos = { x: 0, y: 0 };

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.start();
    }

    handleMouseDown(event) {
        this.isDragging = true;
        this.startPos = { x: event.clientX, y: event.clientY };
        this.currentPos = { ...this.startPos };

        if (this.callbacks.onStart) {
            this.callbacks.onStart(event, this.startPos);
        }

        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseMove(event) {
        if (!this.isDragging) return;

        this.currentPos = { x: event.clientX, y: event.clientY };
        const delta = {
            x: this.currentPos.x - this.startPos.x,
            y: this.currentPos.y - this.startPos.y
        };

        if (this.callbacks.onDrag) {
            this.callbacks.onDrag(event, this.currentPos, delta);
        }
    }

    handleMouseUp(event) {
        if (!this.isDragging) return;

        this.isDragging = false;
        const delta = {
            x: this.currentPos.x - this.startPos.x,
            y: this.currentPos.y - this.startPos.y
        };

        if (this.callbacks.onEnd) {
            this.callbacks.onEnd(event, this.currentPos, delta);
        }

        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }

    start() {
        this.element.addEventListener('mousedown', this.handleMouseDown);
    }

    stop() {
        this.element.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }
}

/**
 * MouseButtons - Track which mouse buttons are currently pressed
 */
export class MouseButtons {
    constructor() {
        this.buttons = {
            left: false,
            right: false,
            middle: false
        };

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.start();
    }

    handleMouseDown(event) {
        switch (event.button) {
            case 0:
                this.buttons.left = true;
                break;
            case 1:
                this.buttons.middle = true;
                break;
            case 2:
                this.buttons.right = true;
                break;
        }
    }

    handleMouseUp(event) {
        switch (event.button) {
            case 0:
                this.buttons.left = false;
                break;
            case 1:
                this.buttons.middle = false;
                break;
            case 2:
                this.buttons.right = false;
                break;
        }
    }

    start() {
        document.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    stop() {
        document.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }

    getButtonStates() {
        return { ...this.buttons };
    }

    isPressed(button) {
        return this.buttons[button] || false;
    }
}

/**
 * ScrollWheel - Monitor scroll wheel direction and delta
 * @param {HTMLElement} element - Target element (defaults to document)
 * @param {Function} callback - Callback receiving {deltaX, deltaY, direction}
 */
export class ScrollWheel {
    constructor(element = document, callback) {
        this.element = element;
        this.callback = callback;
        this.handleWheel = this.handleWheel.bind(this);
        this.start();
    }

    handleWheel(event) {
        const data = {
            deltaX: event.deltaX,
            deltaY: event.deltaY,
            deltaZ: event.deltaZ || 0,
            direction: event.deltaY > 0 ? 'down' : 'up'
        };

        if (this.callback) {
            this.callback(data, event);
        }
    }

    start() {
        this.element.addEventListener('wheel', this.handleWheel);
    }

    stop() {
        this.element.removeEventListener('wheel', this.handleWheel);
    }
}

/**
 * MovementTracker - Calculate mouse velocity and direction
 * @param {HTMLElement} element - Target element (defaults to document)
 * @param {Function} callback - Callback receiving velocity and direction data
 */
export class MovementTracker {
    constructor(element = document, callback) {
        this.element = element;
        this.callback = callback;
        this.lastPos = { x: 0, y: 0 };
        this.lastTime = Date.now();
        this.velocity = { x: 0, y: 0 };

        this.handleMove = this.handleMove.bind(this);
        this.start();
    }

    handleMove(event) {
        const currentTime = Date.now();
        const deltaTime = currentTime - this.lastTime;

        if (deltaTime > 0) {
            const deltaX = event.clientX - this.lastPos.x;
            const deltaY = event.clientY - this.lastPos.y;

            this.velocity = {
                x: deltaX / deltaTime,
                y: deltaY / deltaTime
            };

            const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

            if (this.callback) {
                this.callback({
                    velocity: this.velocity,
                    speed,
                    angle,
                    position: { x: event.clientX, y: event.clientY }
                });
            }
        }

        this.lastPos = { x: event.clientX, y: event.clientY };
        this.lastTime = currentTime;
    }

    start() {
        this.element.addEventListener('mousemove', this.handleMove);
    }

    stop() {
        this.element.removeEventListener('mousemove', this.handleMove);
    }

    getVelocity() {
        return { ...this.velocity };
    }
}

/**
 * CustomCursor - Utilities for custom cursor implementations
 * @param {HTMLElement} cursorElement - Custom cursor element
 * @param {Object} options - Configuration options
 */
export class CustomCursor {
    constructor(cursorElement, options = {}) {
        this.cursor = cursorElement;
        this.options = {
            smooth: options.smooth !== false,
            offset: options.offset || { x: 0, y: 0 },
            ...options
        };

        this.currentPos = { x: 0, y: 0 };
        this.targetPos = { x: 0, y: 0 };
        this.animationFrame = null;

        this.handleMove = this.handleMove.bind(this);
        this.update = this.update.bind(this);

        this.start();
    }

    handleMove(event) {
        this.targetPos = {
            x: event.clientX + this.options.offset.x,
            y: event.clientY + this.options.offset.y
        };

        if (!this.options.smooth) {
            this.currentPos = { ...this.targetPos };
            this.updateCursor();
        }
    }

    update() {
        if (this.options.smooth) {
            this.currentPos.x += (this.targetPos.x - this.currentPos.x) * 0.3;
            this.currentPos.y += (this.targetPos.y - this.currentPos.y) * 0.3;
            this.updateCursor();
            this.animationFrame = requestAnimationFrame(this.update);
        }
    }

    updateCursor() {
        this.cursor.style.transform = `translate(${this.currentPos.x}px, ${this.currentPos.y}px)`;
    }

    start() {
        document.addEventListener('mousemove', this.handleMove);
        if (this.options.smooth) {
            this.animationFrame = requestAnimationFrame(this.update);
        }
    }

    stop() {
        document.removeEventListener('mousemove', this.handleMove);
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

/**
 * ClickCounter - Count clicks within a customizable time window
 * @param {HTMLElement} element - Target element
 * @param {Object} options - Configuration {timeWindow: ms, callback}
 */
export class ClickCounter {
    constructor(element, options = {}) {
        this.element = element;
        this.timeWindow = options.timeWindow || 2000; // 2 seconds default
        this.callback = options.callback;
        this.clicks = [];

        this.handleClick = this.handleClick.bind(this);
        this.start();
    }

    handleClick(event) {
        const now = Date.now();

        // Remove old clicks outside the time window
        this.clicks = this.clicks.filter(time => now - time < this.timeWindow);

        // Add current click
        this.clicks.push(now);

        if (this.callback) {
            this.callback(this.clicks.length, event);
        }
    }

    start() {
        this.element.addEventListener('click', this.handleClick);
    }

    stop() {
        this.element.removeEventListener('click', this.handleClick);
    }

    getCount() {
        const now = Date.now();
        this.clicks = this.clicks.filter(time => now - time < this.timeWindow);
        return this.clicks.length;
    }

    reset() {
        this.clicks = [];
    }
}

/**
 * MouseEnterLeave - Detect when mouse enters or leaves specific elements
 * @param {HTMLElement} element - Target element
 * @param {Object} callbacks - Object with onEnter and onLeave callbacks
 */
export class MouseEnterLeave {
    constructor(element, callbacks = {}) {
        this.element = element;
        this.callbacks = callbacks;
        this.isInside = false;

        this.handleEnter = this.handleEnter.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.start();
    }

    handleEnter(event) {
        this.isInside = true;
        if (this.callbacks.onEnter) {
            this.callbacks.onEnter(event);
        }
    }

    handleLeave(event) {
        this.isInside = false;
        if (this.callbacks.onLeave) {
            this.callbacks.onLeave(event);
        }
    }

    start() {
        this.element.addEventListener('mouseenter', this.handleEnter);
        this.element.addEventListener('mouseleave', this.handleLeave);
    }

    stop() {
        this.element.removeEventListener('mouseenter', this.handleEnter);
        this.element.removeEventListener('mouseleave', this.handleLeave);
    }

    isMouseInside() {
        return this.isInside;
    }
}

// Export all utilities as default
export default {
    MousePosition,
    ClickDetector,
    HoverTracker,
    DragAndDrop,
    MouseButtons,
    ScrollWheel,
    MovementTracker,
    CustomCursor,
    ClickCounter,
    MouseEnterLeave
};
