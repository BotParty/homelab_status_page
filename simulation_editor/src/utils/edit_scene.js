import _ from 'underscore'
const editScene = _.once(function(){
    console.log('once');
  
    const sceneObjects = document.getElementById('scene-objects');
    sceneObjects.innerHTML = '';
  
    // Create a table
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
  
    // Table header row
    const headerTr = document.createElement('tr');
    const headerName = document.createElement('th');
    headerName.innerText = 'Object Name';
    headerName.style.border = '1px solid #ccc';
    const headerAction = document.createElement('th');
    headerAction.innerText = 'Action';
    headerAction.style.border = '1px solid #ccc';
  
    headerTr.appendChild(headerName);
    headerTr.appendChild(headerAction);
    table.appendChild(headerTr);
  
    // Create a row for each object in scene.children
    scene.children.forEach((obj, idx) => {
      const tr = document.createElement('tr');
  
      // Object name cell
      const nameTd = document.createElement('td');
      nameTd.innerText = obj.name || `Object_${idx}`;
      nameTd.style.border = '1px solid #ccc';
      nameTd.style.padding = '4px';
  
      // Highlight button cell
      const actionTd = document.createElement('td');
      actionTd.style.border = '1px solid #ccc';
      actionTd.style.padding = '4px';
  
      const highlightButton = document.createElement('button');
      highlightButton.innerText = 'Highlight';
  
      highlightButton.addEventListener('click', () => {
        // Check if this is a Mesh with a material we can change
        if (obj.isMesh && obj.material && obj.material.color) {
          // Store original color if not already stored
          if (!obj.userData.originalColor) {
            obj.userData.originalColor = obj.material.color.getHex();
          }
  
          // Toggle highlight (keep it simple)
          const currentColor = obj.material.color.getHex();
          const highlightColor = 0xffff00; // Yellow
          obj.material.color.setHex(
            currentColor === highlightColor
              ? obj.userData.originalColor
              : highlightColor
          );
        }
      });
  
      actionTd.appendChild(highlightButton);
  
      // Add cells to row
      tr.appendChild(nameTd);
      tr.appendChild(actionTd);
  
      // Add row to table
      table.appendChild(tr);
    });
  
    // Now put the table in the sceneObjects div
    sceneObjects.appendChild(table);
  
    // Keep a reference to scene on the window object
    window.scene = scene;
  });

  export default editScene;