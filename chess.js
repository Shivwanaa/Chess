const moveTimeLimit = 10000;
let rotationRight = 0; // Global variable to store rotation from rotateRight
let rotationLeft = 0;  // Global variable to store rotation from rotateLeft
document.addEventListener('DOMContentLoaded', function() {
    const gameOverScreen = document.getElementById('gameOverScreen');
    const replayButton = document.getElementById('replayButton');
})
let currentPlayer = 'r'; // Initialize current player
function insertImage() {
    document.querySelectorAll('.box').forEach((image) => {
        if (image.innerText !== '') {
            const rotation = 0; // Initial rotation angle
            image.innerHTML = `${image.innerText} <img class='allimg' id="${image.innerText}" src="./${image.innerText}.png" alt="" data-rotation="${rotation}">`;
            image.style.cursor = 'pointer';
        }
    });
}


function resetBoxColors() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.style.backgroundColor = 'rgba(240,201,150)';
    });
}
function showPossibleMoves(item) {
    if (item.innerText !== '') {
        const getId = item.id;
        const a = parseInt(getId.slice(1));
        let ay;
        if (item.innerText === 'rcanon' || item.innerText === 'bcanon') {
            ay = [a + 1, a - 1];
        } else {
            ay = [a + 1, a - 1, a + 10, a - 10, a + 11, a + 9, a - 9, a - 11];
        }

        item.style.backgroundColor = 'pink';

        for (let i = 0; i < ay.length; i++) {
            const targetId = 'b' + ay[i];
            const targetElement = document.getElementById(targetId);
            if (targetElement && targetElement.innerText === '') {
                targetElement.style.backgroundColor = 'green';
            }
        }

        if (
            item.innerText === 'rsemi' ||
            item.innerText === 'bsemi' ||
            item.innerText === 'rricochet' ||
            item.innerText === 'bricochet'
        ) {
            document.getElementById('rotate').style.visibility = 'visible';
            const buttonR = document.getElementById('right-turn');
            const buttonL = document.getElementById('left-turn');

             function rotateRight() {
                const img = document.getElementById(item.innerText);
               const currentRotation1 = img.style.transform
                     ? parseInt(img.style.transform.replace('rotate(', '').replace('deg)', ''))
                    : 0;
                console.log("right");
                console.log(currentRotation1);
                console.log("Item inner text:", item.innerText);
                const newRotation = currentRotation1 + 90;
                console.log(newRotation);

                img.style.transform = `rotate(${newRotation}deg)`;
                document.getElementById('rotate').style.visibility = 'hidden';
                resetBoxColors();
                currentPlayer = currentPlayer === 'r' ? 'b' : 'r';
                if(currentPlayer==='b'){
                    placeBullet("red",'r');
                    fireBullet('r');
                }
                else if(currentPlayer==='r'){
                    placeBullet("blue",'b');
                    fireBullet('b');
                }

                buttonR.removeEventListener('click', rotateRight);
                buttonL.removeEventListener('click', rotateLeft);
             }
    function rotateLeft() {
        const img = document.getElementById(item.innerText);
        const currentRotation1 = img.style.transform
            ? parseInt(img.style.transform.replace('rotate(', '').replace('deg)', ''))
            : 0;
        console.log("left");
        console.log(currentRotation1);
        const newRotation = currentRotation1 - 90;
        console.log(newRotation);
        img.style.transform = `rotate(${newRotation}deg)`;
        document.getElementById('rotate').style.visibility = 'hidden';
        resetBoxColors();
    
        currentPlayer = currentPlayer === 'r' ? 'b' : 'r';
        if(currentPlayer==='b'){
            placeBullet("red",'r');
            fireBullet('r');
        }
        else if(currentPlayer==='r'){
            placeBullet("blue",'b');
            fireBullet('b');
        }
        buttonR.removeEventListener('click', rotateRight);
        buttonL.removeEventListener('click', rotateLeft);
    }
    
    buttonR.addEventListener('click', rotateRight);
    buttonL.addEventListener('click', rotateLeft);
}
    }
}
function setupBoxClickListeners() {
    const boxes = document.querySelector('ul');
    currentPlayer = 'r'; // Starting with red player
    

    boxes.addEventListener('click', (e) => {
        const boxName = e.target.tagName === 'IMG' ? e.target.parentNode : e.target;
        const box = document.getElementById(boxName.id);

        if (box.innerText.trim().startsWith(currentPlayer)) {
            resetBoxColors();
            showPossibleMoves(box);
            clickedId = box.id;
            clickedcontent = box.innerHTML;
            resetMoveTimer();
        } else if (e.target.tagName !== 'IMG' && clickedId) {
            const item2 = box;
            const a = parseInt(clickedId.slice(1));
            let ay;

            if (item2.innerText === 'rcanon' || item2.innerText === 'bcanon') {
                ay = [a + 1, a - 1];
            } else {
                ay = [a + 1, a - 1, a + 10, a - 10, a + 11, a + 9, a - 9, a - 11];
            }

            let bool = false;
            for (const num of ay) {
                const targetId = 'b' + num;
                if (item2.id === targetId) {
                    bool = true;
                    document.getElementById(clickedId).innerHTML = '';
                    item2.innerHTML = clickedcontent;
                    if (currentPlayer === 'r') {
                        placeBullet("red", 'r');
                        fireBullet('r');
                    } else if (currentPlayer === 'b') {
                        placeBullet("blue", 'b');
                        fireBullet('b');
                    }
                    resetBoxColors();
                    break;
                }
            }
            if (!bool) resetBoxColors();
        } else {
            resetBoxColors();
        }
    });
}

insertImage();
resetBoxColors();
setupBoxClickListeners();
startMoveTimer();

function placeBullet(color, c) {
    const canonBox = document.querySelector(`.box:has(img[id$="${c}canon"])`);
    let bullet = document.getElementById('bullet');

    // Check if canonBox is found
    if (canonBox) {
        console.log("Canon box found");
    } else {
        console.log("Canon box not found");
        return; // Exit the function if the canon box is not found
    }

    // If bullet doesn't exist, create it
    if (!bullet) {
        insertBullet(); 
        bullet=document.getElementById('bullet');

    }
if(canonBox && bullet){
    // Set bullet properties and position
    bullet.style.visibility = "visible";
    bullet.style.backgroundColor = color;

    // Adjust bullet position according to the player
    if (c === 'b') {
        bullet.style.top = ""; // Reset top value for blue bullet
        bullet.style.bottom = '27.5px';
        bullet.style.left = '27.5px'; // Center the bullet horizontally
        console.log("Blue bullet placed");
    } else if (c === 'r') {
        bullet.style.top = '27.5px';
        bullet.style.bottom = ""; // Reset bottom value for red bullet
        bullet.style.left = '27.5px';
        console.log("Red bullet placed");
    }
    console.log(bullet);
    canonBox.appendChild(bullet);
}
}

function moveupBulletRed() {
    var n=0;
    let bullet = document.getElementById('bullet');
    if (!bullet) {
        insertBullet();
        bullet=document.getElementById('bullet');
        bullet.style.visibility="visible";
        bullet.style.backgroundColor="red";
        placeBullet("red",'r');
    }
    console.log(bullet);
    // if(bullet===null){
    //     insertBullet();
    //     bullet=document.getElementById('bullet');
    // }
    const canonBox = bullet.parentElement;
    const canonid = canonBox.id;
    const canon_row = parseInt(canonid.slice(1, 2));
    let stopid;
    const col = parseInt(canonid.slice(2));
    const a = document.querySelector('.box img[id="btitan"]').parentElement.id;
    const b=document.querySelector('.box img[id="btank"]').parentElement.id;
    // var b=document.querySelector('box img[id="btank"]').parentElement.id;

    for (var i = canon_row - 1; i > 0; i--) {
        const pathid = "b" + i + col;
        const path = document.getElementById(pathid);
        if (path.innerText !== "") {
            stopid = pathid;
            break;
        }
    }
    const dist = (8 - i) * 75 + 35;
    if (bullet) {
        let top = parseInt(window.getComputedStyle(bullet).getPropertyValue("top"));
        if (top < dist) {
            bullet.style.top = (top + 6) + "px"; // Move the bullet up
            requestAnimationFrame(moveupBulletRed); // Continue moving
        } else {
            bullet.style.backgroundColor = "white";
            if(stopid===a){
                console.log("gameover");
                bullet.style.visibility="hidden";
                n=10;
                if(n===10){
                    currentPlayer=" ";
                    console.log("Removing btitan image");
                    console.log(a);
                    removeTitanImage(a);
                    showGameOverScreen()
            }
        
            } 
            else if(stopid===b){
                n=9;
                bullet.style.visibility="hidden";
                currentPlayer='b';

            }
            else{
            currentPlayer='b';
            }
            
}
    }
} 

function moveupBulletBlue() {
    var n=0;
    
    let bullet = document.getElementById('bullet');
    if (!bullet) {
        insertBullet();
        bullet=document.getElementById('bullet'); // Ensure bullet is created
        bullet.style.visibility="visible";
        bullet.style.backgroundColor="blue";
        placeBullet("blue",'b');
    }
    // if(bullet===null){
    //     insertBullet();
    //     bullet=document.getElementById('bullet');
    // }
    console.log(bullet.style.backgroundColor);
    const canonBox = bullet.parentElement;
    const canonid = canonBox.id;
    console.log(canonid);
    const canon_row = parseInt(canonid.slice(1, 2));
    const col = parseInt(canonid.slice(2));
    let stopid;
    const ca = document.querySelector('.box img[id="rtitan"]').parentElement.id;
    const cb=document.querySelector('.box img[id="rtank"]').parentElement.id;
    const cc=document.querySelector('.box img[id="rsemi"]').parentElement.id;

    let i;
    for (i = canon_row + 1; i <= 8; i++) {
        const pathid = "b" + i + col;
        // console.log(`Checking path: ${pathid}`);
        const path = document.getElementById(pathid);
        // console.log(`Path inner text: ${path.innerText}`);
        const a = document.querySelector('.box img[id="rtitan"]').parentElement.id;
        if (path.innerText !== "") {
            stopid = pathid;
            // console.log(`Found stop at: ${stopid}`);
            break;
        }
    }

    const dist = ((i - 1) * 75) + 35; // Adjust distance calculation for the blue bullet
    // console.log(`Calculated distance (dist): ${dist}`);

    if (bullet) {
        // console.log("Bullet found");
        let bottom = parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom"));
        // console.log(`Current bottom: ${bottom}`);
        if (bottom < dist) {
            // console.log(`Moving bullet up to: ${bottom + 6}px`);
            bullet.style.bottom = (bottom + 6) + "px"; // Move the bullet up
            // console.log(`New bottom: ${bullet.style.bottom}`);
            requestAnimationFrame(moveupBulletBlue); // Continue moving
        } else {
            bullet.style.backgroundColor = "white"; // Change the bullet color to white
            // console.log("Bullet reached target and changed color");
            if(stopid===ca){
                // console.log("gameover");
                bullet.style.visibility="hidden";
                n=10;
                if(n===10){
                    currentPlayer=" ";
                    // console.log(ca);
                    removeTitanImage(ca);
                    showGameOverScreen();
                    
                }
        
            } 
            else if(stopid===cb){
                n=9;
                bullet.style.visibility="hidden";
                currentPlayer='r';
            }
            // else if(stopid===cc) {
            //     console.log(cc);
            //     getCurrentRotation(cc);
            //     currentPlayer = 'r';
            // }
            else if (stopid === cc) {
                console.log(cc);
                bullet.style.backgroundColor="blue";
                bullet.style.visibility="visible";
                let currentRotation = parseInt(rsemi.style.transform.replace('rotate(', '').replace('deg)', ''));
                if(currentRotation===NaN){
                    currentRotation=0;
                }
                console.log(currentRotation);
                if(currentRotation>360 ){
                    currentRotation=currentRotation%360;
                }
                if(currentRotation<-360){
                    currentRotation=-currentRotation;
                    currentRotation=currentRotation%360;
                    currentRotation=-currentRotation;
                }
                console.log(currentRotation);
                if(currentRotation===0 || currentRotation===-360){
                    console.log("deflect left");
                    moveLeftBullet(bullet,stopid,"blue");
                }
                if(currentRotation===-90 || currentRotation===270){
                    console.log("deflect right");
                    moveRightBullet(bullet,stopid,"blue");
                }
                if(currentRotation===90 || currentRotation===180){
                    console.log("no deflection");
                    bullet.style.visibility="hidden";
                    currentPlayer='r';

                }
                // const currentRotation = getCurrentRotation(cc); // Get the current rotation angle
                // console.log("Current rotation:", currentRotation);
                currentPlayer = 'r'; // Set currentPlayer to 'r'
                // calculateCounterClockwiseRotation(currentRotation); // Calculate counter-clockwise rotation
            }
            
            else{
            currentPlayer='r';
            }
            
}
        
    }
}
// function moveRightBullet(bullet, stopid, color) {
//     bullet.style.backgroundColor = color;
//     let stopRow = parseInt(stopid.slice(1, 2));
//     let stopCol = parseInt(stopid.slice(2));
//     let newCol = stopCol + 1;

//     function moveRight() {
//         if (newCol <= 8) {
//             let newId = "b" + stopRow + newCol;
//             let targetElement = document.getElementById(newId);
//             if (targetElement && !targetElement.hasChildNodes()) {
//                 // Calculate the new position of the bullet
//                 let newPositionX = parseInt(bullet.style.left || 0) + 75; // Adjust for cell width
//                 let newPositionY = (stopRow - 1) * 75+32; // Assuming fixed row height of 75px

//                 // Update the bullet's position
//                 bullet.style.left = newPositionX + 'px';
//                 bullet.style.bottom = newPositionY + 'px'; // Adjust for blue bullet moving up

//                 newCol += 1;
//                 // requestAnimationFrame(moveRight);
//                 function moveRightBullet(bullet, stopid, color) {
//                     bullet.style.backgroundColor = color;
//                     let stopRow = parseInt(stopid.slice(1, 2));
//                     let stopCol = parseInt(stopid.slice(2));
//                     let newCol = stopCol + 1;
                
//                     function moveRight() {
//                         if (newCol <= 8) {
//                             let newId = "b" + stopRow + newCol;
//                             let targetElement = document.getElementById(newId);
//                             if (targetElement && !targetElement.hasChildNodes()) {
//                                 // Calculate the new position of the bullet
//                                 let newPositionX = parseInt(bullet.style.left || 0) + 75; // Adjust for cell width
//                                 let newPositionY = (stopRow - 1) * 75+32; // Assuming fixed row height of 75px
                
//                                 // Update the bullet's position
//                                 bullet.style.left = newPositionX + 'px';
//                                 bullet.style.bottom = newPositionY + 'px'; // Adjust for blue bullet moving up
                
//                                 newCol += 1;
//                                 requestAnimationFrame(moveRight);
//                             } else {
//                                 // Stop if it hits an obstacle or reaches the end of the board
//                                 if (color === 'red') {
//                                     currentPlayer = 'b';
//                                 } else {
//                                     currentPlayer = 'r';
//                                 }
//                             }
//                         } else {
//                             // Stop if it reaches the end of the board
//                             if (color === 'red') {
//                                 currentPlayer = 'b';
//                             } else {
//                                 currentPlayer = 'r';
//                             }
//                         }
//                     }
                
//                     // Start the movement
//                     moveRight();
//                 }
                
//             } else {
//                 // Stop if it hits an obstacle or reaches the end of the board
//                 if (color === 'red') {
//                     currentPlayer = 'b';
//                 } else {
//                     currentPlayer = 'r';
//                 }
//             }
//         } else {
//             // Stop if it reaches the end of the board
//             if (color === 'red') {
//                 currentPlayer = 'b';
//             } else {
//                 currentPlayer = 'r';
//             }
//         }
//     }

//     // Start the movement
//     moveRight();
// }

// function moveLeftBullet(bullet, stopid, color) {
//     let stopRow = parseInt(stopid.slice(1, 2));
//     let stopCol = parseInt(stopid.slice(2));
//     let newCol = stopCol - 1;

//     function moveLeft() {
//         if (newCol >= 1) {
//             let newId = "b" + stopRow + newCol;
//             let targetElement = document.getElementById(newId);
//             if (targetElement && !targetElement.hasChildNodes()) {
//                 // Calculate the new position of the bullet
//                 let newPositionX = parseInt(bullet.style.left || 0) - 75; // Adjust for cell width
//                 let newPositionY = (stopRow-1) * 75+32; // Assuming fixed row height of 75px

//                 // Update the bullet's position
//                 bullet.style.left = newPositionX + 'px';
//                 bullet.style.bottom = newPositionY + 'px'; // Adjust for blue bullet moving up

//                 newCol -= 1;
//                 requestAnimationFrame(moveLeft);
//             } else {
//                 // Stop if it hits an obstacle or reaches the end of the board
//                 if (color === 'red') {
//                     currentPlayer = 'b';
//                 } else {
//                     currentPlayer = 'r';
//                 }
//             }
//         } else {
//             // Stop if it reaches the end of the board
//             if (color === 'red') {
//                 currentPlayer = 'b';
//             } else {
//                 currentPlayer = 'r';
//             }
//         }
//     }

//     // Start the movement
//     moveLeft();
// }
function fireBullet(c) {
    const bullet = document.getElementById('bullet');
    console.log(bullet);
    if (bullet) {
        if (c === 'r') {
            moveupBulletRed();
            currentPlayer=" ";
        } else if (c === 'b') {
            moveupBulletBlue();
            currentPlayer=" ";
        }
    }
}
// function moveRightBullet(bullet, stopid, color) {
//     bullet.style.backgroundColor = color;
//     let stopRow = parseInt(stopid.slice(1, 2));
//     let stopCol = parseInt(stopid.slice(2));
//     let newCol = stopCol + 1;

//     function moveRight() {
//         if (newCol <= 8) {
//             let newId = "b" + stopRow + newCol;
//             let targetElement = document.getElementById(newId);
//             if (targetElement && !targetElement.hasChildNodes()) {
//                 // Calculate the new position of the bullet
//                 let newPositionX = parseInt(bullet.style.left || 0) + 75; // Adjust for cell width
//                 let newPositionY = (stopRow - 1) * 75+32; // Assuming fixed row height of 75px

//                 // Update the bullet's position
//                 bullet.style.left = newPositionX + 'px';
//                 bullet.style.bottom = newPositionY + 'px'; // Adjust for blue bullet moving up

//                 newCol += 1;
//                 setTimeout(moveRight, 100);
//             } else {
//                 // Stop if it hits an obstacle or reaches the end of the board
//                 if (color === 'red') {
//                     currentPlayer = 'b';
//                 } else {
//                     currentPlayer = 'r';
//                 }
//             }
//         } else {
//             // Stop if it reaches the end of the board
//             if (color === 'red') {
//                 currentPlayer = 'b';
//             } else {
//                 currentPlayer = 'r';
//             }
//         }
//     }

//     // Start the movement
//     moveRight();
// }
// function moveRightBullet(bullet, stopid, color) {
//     bullet.style.backgroundColor = color;
//     let stopRow = parseInt(stopid.slice(1, 2));
//     let stopCol = parseInt(stopid.slice(2));
//     let newCol = stopCol + 1;

//     // Define the animation duration (in milliseconds) for one step
//     const animationDuration = 1000 / 60; // 60 frames per second

//     let lastTimestamp = null;

//     function moveRight(timestamp) {
//         if (!lastTimestamp) {
//             lastTimestamp = timestamp;
//         }

//         const deltaTime = timestamp - lastTimestamp;

//         if (deltaTime >= animationDuration) {
//             lastTimestamp = timestamp;

//             if (newCol <= 8) {
//                 let newId = "b" + stopRow + newCol;
//                 let targetElement = document.getElementById(newId);
//                 if (targetElement && !targetElement.hasChildNodes()) {
//                     // Calculate the new position of the bullet
//                     let newPositionX = parseInt(bullet.style.left || 0) + 75; // Adjust for cell width
//                     let newPositionY = (stopRow - 1) * 75 + 32; // Assuming fixed row height of 75px

//                     // Update the bullet's position
//                     bullet.style.left = newPositionX + 'px';
//                     bullet.style.bottom = newPositionY + 'px'; // Adjust for blue bullet moving up

//                     newCol += 1;
//                 } else {
//                     // Stop if it hits an obstacle or reaches the end of the board
//                     if (color === 'red') {
//                         currentPlayer = 'b';
//                     } else {
//                         currentPlayer = 'r';
//                     }
//                 }
//             } else {
//                 // Stop if it reaches the end of the board
//                 if (color === 'red') {
//                     currentPlayer = 'b';
//                 } else {
//                     currentPlayer = 'r';
//                 }
//             }
//         }

//         requestAnimationFrame(moveRight);
//     }

//     // Start the movement
//     requestAnimationFrame(moveRight);
// }
function moveRightBullet(bullet, stopid, color) {
    bullet.style.backgroundColor = color;
    let stopRow = parseInt(stopid.slice(1, 2));
    let stopCol = parseInt(stopid.slice(2));
    let newCol = stopCol + 1;

    // Define the distance to move per frame
    const distancePerFrame = 90; // Adjust as needed for smoother movement

    function moveRight() {
        if (newCol <= 8) {
            let newId = "b" + stopRow + newCol;
            let targetElement = document.getElementById(newId);
            if (targetElement && !targetElement.hasChildNodes()) {
                // Calculate the new position of the bullet
                let newPositionX = parseInt(bullet.style.left || 0) + distancePerFrame; // Adjust for cell width
                let newPositionY = (stopRow - 1) * 75 + 32; // Assuming fixed row height of 75px

                // Update the bullet's position
                bullet.style.left = newPositionX + 'px';
                bullet.style.bottom = newPositionY + 'px'; // Adjust for blue bullet moving up

                newCol += 1;

                // Continue the movement in the next frame
                requestAnimationFrame(moveRight);
            } else {
                // Stop if it hits an obstacle or reaches the end of the board
                if (color === 'red') {
                    currentPlayer = 'b';
                } else {
                    currentPlayer = 'r';
                }
            }
        } else {
            // Stop if it reaches the end of the board
            if (color === 'red') {
                currentPlayer = 'b';
            } else {
                currentPlayer = 'r';
            }
        }
    }

    // Start the movement
    moveRight();
}


// function moveLeftBullet(bullet, stopid, color) {
//     let stopRow = parseInt(stopid.slice(1, 2));
//     let stopCol = parseInt(stopid.slice(2));
//     let newCol = stopCol - 1;

//     function moveLeft() {
//         if (newCol >= 1) {
//             let newId = "b" + stopRow + newCol;
//             let targetElement = document.getElementById(newId);
//             if (targetElement && !targetElement.hasChildNodes()) {
//                 // Calculate the new position of the bullet
//                 let newPositionX = parseInt(bullet.style.left || 0) - 75; // Adjust for cell width
//                 let newPositionY = (stopRow - 1) * 75+32; // Assuming fixed row height of 75px

//                 // Update the bullet's position
//                 bullet.style.left = newPositionX + 'px';
//                 bullet.style.bottom = newPositionY + 'px'; // Adjust for blue bullet moving up

//                 newCol -= 1;
//                 requestAnimationFrame(moveLeft);
//             } else {
//                 // Stop if it hits an obstacle or reaches the end of the board
//                 if (color === 'red') {
//                     currentPlayer = 'b';
//                 } else {
//                     currentPlayer = 'r';
//                 }
//             }
//         } else {
//             // Stop if it reaches the end of the board
//             if (color === 'red') {
//                 currentPlayer = 'b';
//             } else {
//                 currentPlayer = 'r';
//             }
//         }
//     }

//     // Start the movement
//     moveLeft();
// }
function moveLeftBullet(bullet, stopid, color) {
    bullet.style.backgroundColor = color;
    let stopRow = parseInt(stopid.slice(1, 2));
    let stopCol = parseInt(stopid.slice(2));
    let newCol = stopCol - 1;

    // Define the distance to move per frame
    const distancePerFrame = 90; // Adjust as needed for smoother movement

    function moveLeft() {
        if (newCol >= 1) {
            let newId = "b" + stopRow + newCol;
            let targetElement = document.getElementById(newId);
            if (targetElement && !targetElement.hasChildNodes()) {
                // Calculate the new position of the bullet
                let newPositionX = parseInt(bullet.style.left || 0) - distancePerFrame; // Adjust for cell width
                let newPositionY = (stopRow - 1) * 75 + 32; // Assuming fixed row height of 75px

                // Update the bullet's position
                bullet.style.left = newPositionX + 'px';
                bullet.style.bottom = newPositionY + 'px'; // Adjust for blue bullet moving up

                newCol -= 1;

                // Continue the movement in the next frame
                requestAnimationFrame(moveLeft);
            } else {
                // Stop if it hits an obstacle or reaches the end of the board
                if (color === 'red') {
                    currentPlayer = 'b';
                } else {
                    currentPlayer = 'r';
                }
            }
        } else {
            // Stop if it reaches the end of the board
            if (color === 'red') {
                currentPlayer = 'b';
            } else {
                currentPlayer = 'r';
            }
        }
    }

    // Start the movement
    moveLeft();
}

function removeTitanImage(boxId) {
    const box = document.getElementById(boxId);
    if (box) {
        const img = box.querySelector('img');
        if (img) {
            img.remove();
            console.log(`Removed titan image from ${boxId}`);
        } else {
            console.log(`No image found in ${boxId}`);
        }
    } else {
        console.log(`No box found with ID ${boxId}`);
    }
}

function showGameOverScreen() {
    const gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style.display = 'flex';
}
function resetGame() {
    console.log("Resetting the game...");
    const gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style.display = 'none';
    currentPlayer = 'r';
    insertImage();
    resetBoxColors();
    setupBoxClickListeners();
    currentPlayer = 'r';
}

document.addEventListener("DOMContentLoaded", function() {
    const replayButton = document.getElementById("replayButton");
    replayButton.addEventListener("click", function() {
        resetGame();
    });
});
function insertBullet() {
    const bullet = document.createElement('div');
    bullet.id = 'bullet';
    bullet.style.width = '20px'; 
    bullet.style.height = '20px'; // Set the bullet height
    bullet.style.backgroundColor = 'white'; // Set the bullet color
    bullet.style.position = 'absolute'; // Set the bullet position
    bullet.style.visibility="hidden";
    const canonBox = document.querySelector('.box:has(img[id$="canon"])');

    // // Ensure the canon box is found before appending the bullet
    if (canonBox) {
    //    if(c==='r'){
        // bullet.style.backgroundColor="red";
        canonBox.appendChild(bullet);
    // //    else if(c==='b'){
    //     bullet.style.backgroundColor="blue";
    //     // canonBox.appendChild(bullet);

    } else {
        console.error('Canon box not found.');
    }
}




// timerr logic starts here
function startMoveTimer() {
    let timeRemaining = moveTimeLimit / 1000; // Convert milliseconds to seconds
    document.getElementById('timer').innerText = timeRemaining;

    moveTimer = setInterval(() => {
        timeRemaining -= 1;
        document.getElementById('timer').innerText = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(moveTimer);
            showGameOverScreen();
        }
    }, 1000);
}

function resetMoveTimer() {
    clearInterval(moveTimer);
    startMoveTimer();
}
function startMoveTimer(remainingTime) {
    let timeRemaining = remainingTime || moveTimeLimit / 1000; // Convert milliseconds to seconds
    document.getElementById('timer').innerText = timeRemaining;

    moveTimer = setInterval(() => {
        timeRemaining -= 1;
        document.getElementById('timer').innerText = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(moveTimer);
            showGameOverScreen();
        }
    }, 1000);
}

// Function to handle the pause button click event
// document.getElementById("pauseButton").addEventListener("click", function() {
//     isPaused = true;
//     document.getElementById("pausedScreen").style.display = "flex"; // Show the paused screen
// });

// // Function to handle the play button click event
// document.getElementById("playButton").addEventListener("click", function() {
//     isPaused = false;
//     document.getElementById("pausedScreen").style.display = "none"; // Hide the paused screen
// });


// let isPaused = false;
// // let timeRemaining = 10; // Initial time

// document.getElementById("pauseButton").addEventListener("click", function() {
//     isPaused = true;
//     clearInterval(moveTimer); // Pause the timer
//     document.getElementById("pausedScreen").style.display = "flex"; // Show the paused screen
// });
// Function to handle the play button click event on the paused screen
// document.getElementById("playButtonPaused").addEventListener("click", function() {
//     isPaused = false;
//     document.getElementById("pausedScreen").style.display = "none"; // Hide the paused screen
//     document.getElementById("playButton").style.display = "block"; // Show the play button in the main screen
// });



// Function to handle the play button click event
// document.getElementById("playButton").addEventListener("click", function() {
//     isPaused = false;
//      // Resume the timer
//     document.getElementById("pausedScreen").style.display = "none"; // Hide the paused screen
// });
// Function to handle the play button click event on the paused screen
// 
document.getElementById("playButtonPaused").addEventListener("click", function() {
    isPaused = false;
    document.getElementById("pausedScreen").style.display = "none"; // Hide the paused screen

    // Start the move timer again with the remaining time
    const remainingTime = parseInt(document.getElementById('timer').innerText);
    startMoveTimer(remainingTime);
});



// Function to handle the play button click event
document.getElementById("playButton").addEventListener("click", function() {
    document.getElementById("playButton").style.display = "none"; // Hide the play button
    startMoveTimer(); // Start the move timer
});

function startMoveTimer() {
    let timeRemaining = moveTimeLimit / 1000; // Convert milliseconds to seconds
    document.getElementById('timer').innerText = timeRemaining;

    moveTimer = setInterval(() => {
        timeRemaining -= 1;
        document.getElementById('timer').innerText = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(moveTimer);
            showGameOverScreen();
        }
    }, 1000);
}

function resetMoveTimer() {
    clearInterval(moveTimer);
    startMoveTimer();
}

let isPaused = false;

document.getElementById("pauseButton").addEventListener("click", function() {
    isPaused = true;
    clearInterval(moveTimer); // Pause the timer
    document.getElementById("pausedScreen").style.display = "flex"; // Show the paused screen
});

document.getElementById("playButtonPaused").addEventListener("click", function() {
    isPaused = false;
    document.getElementById("pausedScreen").style.display = "none"; // Hide the paused screen
    startMoveTimer(); // Start the move timer again
});

// Function to handle the play button click event on the paused screen
document.getElementById("playButtonPaused").addEventListener("click", function() {
    isPaused = false;
    document.getElementById("pausedScreen").style.display = "none"; // Hide the paused screen
    startMoveTimer(); // Start the move timer again
});

