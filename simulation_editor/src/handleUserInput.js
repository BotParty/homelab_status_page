/**
 * Adds event listeners to handle keyboard presses.
 * The resulting input state is an object with booleans that your onExampleUpdate() can read.
 * 
 * @param {Object} inputState - An object with shape:
 *   { forwardPressed: false, backwardPressed: false, leftPressed: false, rightPressed: false, jump: false, crouched: false }
 */
export function handleUserInput(inputState) {
  function onKeyDown(event) {
    console.log('Key down:', event.code);  // Debug: log which key is pressed
    switch (event.code) {
      case 'KeyW':       inputState.forwardPressed  = true;  break;
      case 'KeyS':       inputState.backwardPressed = true;  break;
      case 'KeyA':       inputState.leftPressed     = true;  break;
      case 'KeyD':       inputState.rightPressed    = true;  break;
      case 'Space': {
        event.preventDefault();  // Prevent default scroll behavior
        if (!inputState.jumpPressed) {
          inputState.jumpPressed = true;
          console.log('Jump triggered');
        }
        break;
      }
      case 'ShiftLeft':  inputState.crouched        = true;  break;
      default: break;
    }
  }

  function onKeyUp(event) {
    console.log('Key up:', event.code);  // Debug: log which key is released
    switch (event.code) {
      case 'KeyW':       inputState.forwardPressed  = false; break;
      case 'KeyS':       inputState.backwardPressed = false; break;
      case 'KeyA':       inputState.leftPressed     = false; break;
      case 'KeyD':       inputState.rightPressed    = false; break;
      case 'Space': {
        // You can reset jump here or handle it in your physics loop after you detect a jump was used.
        inputState.jumpPressed = false;
        break;
      }
      case 'ShiftLeft':  inputState.crouched        = false; break;
      default: break;
    }
  }

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
} 