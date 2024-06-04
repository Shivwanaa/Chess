const menu=document.getElementById("menu");
menu.disabled=false;
document.getElementById('toggleSidebarButton').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-300px"; /* Hide the sidebar */
    } else {
        sidebar.style.left = "0px"; /* Show the sidebar */
    }
});

let currentPlayer = 'r';
let glist=[];
let isPaused = false;
let ncp;
var sidebarContent=[];
var singleplayermode=false;
const randombutton = document.getElementById('random');
        randombutton.addEventListener('click', function() {
            document.getElementById("menuscreen").style.display="none";
            console.log("shivu");
            positioned=false;
            removeAllImages();

            placepieces();
            // Call the function to insert images at the set positions
            insertImagesAtSetPositions();
            set.clear();
        });
        function removeAllImages() {
            document.querySelectorAll('.allimg').forEach((img) => {
                const parent = img.parentElement;
                if (parent) {
                    // Remove the image element

                    img.remove();
                    
                    // Restore the original text if needed
                    parent.innerHTML = '';
                    // parent.innerText;
                }
            });
        }
        
document.addEventListener('DOMContentLoaded', function() {
         const gameOverScreen = document.getElementById('gameOverScreen');
         const replayButton = document.getElementById('replayButton');
     })
    function showGameOverScreen(winner) {
        var winnerc = '';
        const gameOverScreen = document.getElementById('gameOverScreen');
        const winnerMessage = document.getElementById('WinnerMessage');
        if (winner === 'r') {
            winnerc = "Red";
        } else {
            winnerc = "Blue";
        }
        winnerMessage.textContent = `${winnerc} won the game!`; // Correct string interpolation
        gameOverScreen.style.display = 'flex';
    }
    
    

function insertImage() {
        document.querySelectorAll('.box').forEach((image) => {
            if (image.innerText !== '') {
                image.innerHTML = `${image.innerText} <img class='allimg' id="${image.innerText}" src="./${image.innerText}.png" alt="">`;
                image.style.cursor = 'pointer';
            }
        });
    }

function resetBoxColors() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.style.backgroundColor = 'rgba(186, 201, 239)';
    });
}
let clickedcontent;
let clickedId;
var state = true;
const handleBoxclick = (e) => { };

var swapped=false;
let swap_arr=[];




function setupBoxClickListeners() {
    const boxes = document.querySelector('ul');
    currentPlayer = 'b'; 
    const bullet = document.getElementById('bullet');
    bullet.style.visibility = "hidden";
    bullet.className = '';
    const sbutton = document.getElementById('swap-button');

    boxes.addEventListener('click', (e) => {
        if (!singleplayermode || (singleplayermode && currentPlayer === 'b')) { 
        const boxName = e.target.tagName === 'IMG' ? e.target.parentNode : e.target;
        if (boxName) { 
            const box = document.getElementById(`${boxName.id}`);
            if (box) { 
                const m = box.id;
                if (state) {
                    if (box.innerText.trim().startsWith(currentPlayer) ) {
                        // console.log(computer);
                        console.log("shivu");
                        resetBoxColors();
                        console.log(box);
                        showPossibleMoves(box);
                        clickedId = box.id;
                        clickedcontent = box.innerHTML;
                        if (e.target.tagName === 'IMG') state = false;
                    }
                } else if (swapped && clickedId) {
                    console.log("shivu");
                    const item2 = box;
                    let bool = false;
                    for (const num of swap_arr) {
                        if (item2.id === num) {
                            console.log(item2.id);
                            console.log(clickedId);
                            bool = true;
                            let store = document.getElementById(clickedId).innerHTML;
                            document.getElementById(clickedId).innerHTML = item2.innerHTML;
                            item2.innerHTML = store;
                            resetBoxColors();
                            state = true;
                            swapped = false;
                            if (currentPlayer === 'r') {
                                newcp = currentPlayer;
                                currentPlayer = " ";
                                console.log(item2.id);
                                appendIdToList(clickedId, glist, newcp, item2.id);
                                placeBullet("red", "r");
                                fireBullet("r");
                                currentPlayer = newcp;
                            } else if (currentPlayer === 'b') {
                                newcp = currentPlayer;
                                currentPlayer = " ";
                                console.log(item2.id);
                                appendIdToList(clickedId, glist, newcp, item2.id);
                                placeBullet("blue", "b");
                                fireBullet("b");
                                currentPlayer = newcp;
                            }
                            // if (singleplayermode === false) {
                                console.log("shivu");
                                currentPlayer = currentPlayer === 'r' ? 'b' : 'r';
                                state = true;
                                break;
                            // }
                        }
                    }
                    if (!bool) {
                        resetBoxColors();
                        state = true;
                    }
                } else if (e.target.tagName !== 'IMG' && clickedId) {
                    const item2 = box;
                    const a = parseInt(clickedId.slice(1));
                    let ay;
                    if (document.getElementById(clickedId).innerText==='rcanon'||document.getElementById(clickedId).innerText==='bcanon') {
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
                            appendIdToList(m, glist, currentPlayer, clickedId);
                            resetBoxColors();
                            state = true;
                            if (currentPlayer === 'r') {
                                newcp = currentPlayer;
                                currentPlayer = " ";
                                placeBullet("red", "r");
                                fireBullet("r");
                                currentPlayer = newcp;
                                // if(singleplayermode === true) {
                                //     robotMove(); // Call robotMove after human move
                                // }
                            } else if (currentPlayer === 'b') {
                                newcp = currentPlayer;
                                currentPlayer = " ";
                                placeBullet("blue", "b");
                                fireBullet("b");
                                currentPlayer = newcp;
                            }
                            // if (singleplayermode === false) {
                                currentPlayer = currentPlayer === 'r' ? 'b' : 'r'; 
                                break;
                            // } else {
                            //     smc = true;
                            // }
                            // break;
                        }
                    }
                    if (!bool) resetBoxColors();
                    state = true;
                }
            } else {
                resetBoxColors();
            }
        
    }
}
    });
    
}


function showPossibleMoves(item) {
    if (item.innerText !== '') {
        var getId = item.id;
        var a = parseInt(getId.slice(1));
        var ay;
        if (item.innerText === 'rcanon' || item.innerText === 'bcanon') {
            ay = [a + 1, a - 1];
        } else {
            ay = [a + 1, a - 1, a + 10, a - 10, a + 11, a + 9, a - 9, a - 11];
        }

        item.style.backgroundColor = 'pink';

        for (let i = 0; i < ay.length; i++) {
            var targetId = 'b' + ay[i];
            var targetElement = document.getElementById(targetId);
            if (targetElement && targetElement.innerText === '') {
                targetElement.style.backgroundColor = 'green';
            }
        }
        if(item.innerText==='rricochet'||item.innerText==='bricochet'){
            console.log("shivu");
            document.getElementById('rotate').style.visibility = 'visible';
            const swapbutton=document.getElementById('swap-button');
            const buttonR = document.getElementById('right-turn');
            const buttonL = document.getElementById('left-turn');
            // resetBoxColors();
            function swap(){
                swapbutton.removeEventListener('clcik',swap);
                // buttonR.removeEventListener('click', rotateRight);
                // buttonL.removeEventListener('click', rotateLeft);
                console.log("shivu");
                swapped=true;
                state=false;
                document.querySelectorAll('.box').forEach((image)=>{
                    if(image.innerHTML!==' '){
                        if(image.innerHTML!=item.innerHTML && image.innerText!=='rtitan' && image.innerText!=='btitan' && image.innerText!=='rcanon' && image.innerText!=='bcanon'){
                            swap_arr.push(image.id);

                        }
                    }
                })
                // currentPlayer = currentPlayer=== 'r' ? 'b' : 'r';
                // state=true;

            }
            // buttonR.addEventListener('click', rotateRight);
            // buttonL.addEventListener('click', rotateLeft);
            swapbutton.addEventListener('click',swap);
            console.log(item);

        }

        console.log(item.innerText);
        if (
            item.innerText === 'rsemi' ||
            item.innerText === 'bsemi' ||
            item.innerText === 'rricochet' ||
            item.innerText === 'bricochet' ||
            item.innerText === 'rsemi1' ||
            item.innerText === 'bsemi1'
        ) {
            document.getElementById('rotate').style.visibility = 'visible';
            const buttonR = document.getElementById('right-turn');
            const buttonL = document.getElementById('left-turn');
            
            function rotateRight() {
                const img = document.getElementById(item.innerText);
                const currentRotation = img.style.transform
                    ? parseInt(img.style.transform.replace('rotate(', '').replace('deg)', ''))
                    : 0;
                const newRotation = currentRotation + 90;

                img.style.transform = `rotate(${newRotation}deg)`;
                document.getElementById('rotate').style.visibility = 'hidden';
                resetBoxColors();
                buttonR.removeEventListener('click', rotateRight);
                buttonL.removeEventListener('click', rotateLeft);
                if (currentPlayer === 'r') {
                    let dr = 'right';
                    appendIdToList(item.id, glist, currentPlayer, item.id, dr, currentRotation);
                    newcp = currentPlayer;
                    currentPlayer = " ";
                    placeBullet("red", "r");
                    fireBullet("r");
                } else if (currentPlayer === 'b') {
                    let dr = 'right';
                    appendIdToList(item.id, glist, currentPlayer, item.id, dr, currentRotation);
                    newcp = currentPlayer;
                    currentPlayer = " ";
                    placeBullet("blue", "b");
                    fireBullet("b");
                    // currentPlayer = newcp;
                }
                currentPlayer = newcp=== 'r' ? 'b' : 'r';
                console.log(currentPlayer);
                state=true;
            }

            function rotateLeft() {
                const img = document.getElementById(item.innerText);
                const currentRotation = img.style.transform
                    ? parseInt(img.style.transform.replace('rotate(', '').replace('deg)', ''))
                    : 0;
                const newRotation = currentRotation - 90;

                img.style.transform = `rotate(${newRotation}deg)`;
                document.getElementById('rotate').style.visibility = 'hidden';
                resetBoxColors();
                buttonR.removeEventListener('click', rotateRight);
                buttonL.removeEventListener('click', rotateLeft);
                if (currentPlayer === 'r') {
                    let dr = 'left';
                    appendIdToList(item.id, glist, currentPlayer, item.id, dr, currentRotation);
                    newcp = currentPlayer;
                    currentPlayer = " ";
                    placeBullet("red", "r");
                    fireBullet("r");
                    currentPlayer = newcp;
                } else if (currentPlayer === 'b') {
                    let dr = 'left';
                    appendIdToList(item.id, glist, currentPlayer, item.id, dr, currentRotation);
                    newcp = currentPlayer;
                    currentPlayer = " ";
                    placeBullet("blue", "b");
                    fireBullet("b");
                    currentPlayer = newcp;
                }
                currentPlayer = newcp === 'r' ? 'b' : 'r';
                state=true;
            }

            buttonR.addEventListener('click', rotateRight);
            buttonL.addEventListener('click', rotateLeft);
        }
    }
}
insertImage();
resetBoxColors();
setupBoxClickListeners();

function placeBullet(color, c) {
    
    var canonBox = document.querySelector(`.box:has(img[id$="${c}canon"])`);
    let bullet = document.getElementById('bullet');
    if (!bullet) {
                bullet = document.createElement('div');
                bullet.id = 'bullet';
                bullet.style.width = '20px'; 
                bullet.style.height = '20px'; // Set the bullet height
                bullet.style.backgroundColor = 'white'; // Set the bullet color
                bullet.style.position = 'absolute'; // Set the bullet position
                bullet.style.visibility = "visible";
                document.body.appendChild(bullet); // Append the bullet to the document
                bullet = document.getElementById('bullet');
                console.log('Bullet created:', bullet);
            }
    bullet.style.visibility = "visible";
    console.log(bullet.style.visibility);
    bullet.style.backgroundColor = color;
    console.log("placingg");
    console.log(bullet.style.backgroundColor);
    if (canonBox && bullet) {
        canonBox.appendChild(bullet); // Append the bullet to the canon box
        if (c === "r") {
            bullet.style.top = '27.5px'; // Adjust this value if necessary
            bullet.style.bottom = "";
        }
        else if (c === "b") {
            bullet.style.bottom = '27.5px'; // Adjust this value if necessary
            bullet.style.top = "";
        }
        bullet.style.left = '27.5px'; // Center the bullet horizontally
    } else {
        console.error("Canon box or bullet element not found.");
    }
}
let newcp;

function moveRedBullettUp(bullet, targetTop, onComplete) {
    let top = parseInt(window.getComputedStyle(bullet).getPropertyValue("top"));
    if (top > targetTop) {
        if(!isPaused)
             bullet.style.top = (top - 10) + "px"; // Move the bullet down
        // console.log(bullet.style.top);
        requestAnimationFrame(() => moveRedBullettUp(bullet, targetTop, onComplete));
    } else {
        bullet.style.visibility = 'hidden';
        if (onComplete) onComplete();
    }
}

function moveBullettDown(bullet, targetTop, onComplete) {
    let top = parseInt(window.getComputedStyle(bullet).getPropertyValue("top"));
    if (top < targetTop) {
        if(!isPaused)
             bullet.style.top = (top + 10) + "px"; // Move the bullet down
        // console.log(bullet.style.top);
        requestAnimationFrame(() => moveBullettDown(bullet, targetTop, onComplete));
    
    } else {
        if (onComplete) onComplete();
        
    }
}

function moveBullettUp(bullet, targetBottom, onComplete) {
    let bottom = parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom"));
    if (bottom < targetBottom) {
        if(!isPaused)
             bullet.style.bottom = (bottom + 10) + "px"; // Move the bullet up
        requestAnimationFrame(() => moveBullettUp(bullet, targetBottom, onComplete));
    } else {
        if (onComplete) onComplete();
    }
}

function moveBluebulletDown(bullet, targetBottom, onComplete) {
    let bottom = parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom"));
    if (bottom > targetBottom) {
        if(!isPaused)
           bullet.style.bottom = (bottom - 10) + "px"; // Move the bullet up
        requestAnimationFrame(() => moveBluebulletDown(bullet, targetBottom, onComplete));
    } else {
        if (onComplete) onComplete();
    }
}

function moveBulletLeft(bullet, targetRight, onComplete) {
    let left = parseInt(window.getComputedStyle(bullet).getPropertyValue("left"));
    // targetRight = -(targetRight - 75);
    if (left > targetRight) {
        if(!isPaused)
        bullet.style.left = (left - 10) + "px"; // Move the bullet left
        // console.log(bullet.style.left);
        requestAnimationFrame(() => moveBulletLeft(bullet, targetRight, onComplete));
    } else {
        if (onComplete) onComplete();
    }
}

function moveBulletRight(bullet, targetLeft, onComplete) {
    let left = parseInt(window.getComputedStyle(bullet).getPropertyValue("left"));
    if (left < targetLeft) {
        if(!isPaused)
        bullet.style.left = (left + 10) + "px"; // Move the bullet right
        // console.log(bullet.style.left);
        requestAnimationFrame(() => moveBulletRight(bullet, targetLeft, onComplete));
    } else {
        if (onComplete) onComplete();
    }
}
function calc_dist(bullet, color, posn, canon_posn) {
    row = parseInt(posn.slice(1, 2));
    col = parseInt(posn.slice(2));
    console.log(row);
    console.log(col);
    canon_col = parseInt(canon_posn.slice(2));
    console.log(bullet.className);
    var present = false;
    if (bullet.className == "down" || bullet.className == "up") {
        //var stopid;
        //var stop
        if (bullet.className == 'down') {
            var i = row - 1;
            while (i > 0) {
                var id = 'b' + i + col;
                var newDiv = document.getElementById(id);
                if (newDiv && newDiv.innerHTML !== '') {
                    present = true;
                    console.log(i);
                    break;
                }
                i--;
            }
        }
        else {
            var i = row + 1;
            console.log(i);
            while (i <= 8) {
                var id = 'b' + i + col;
                var newDiv = document.getElementById(id);
                console.log(newDiv.innerText);
                if (newDiv && newDiv.innerHTML !== '') {
                    present = true;
                    console.log(i);
                    break;
                }
                i++;
            }
        }
        console.log(i);
        if (color == 'red') {
            var dist = (8 - i) * 75 + 27.5;
        }
        else if (color == 'blue') {
            var dist = (i - 1) * 75 + 27.5;
            console.log(dist);
        }
    }
    else if (bullet.className == 'left' || bullet.className == 'right') {
        if (bullet.className == 'left') {
            var i = col - 1;
            while (i > 0) {
                var id = 'b' + row + i;
                var newDiv = document.getElementById(id);
                if (newDiv && newDiv.innerHTML !== '') {
                    present = true;
                    break;
                }
                i--;
            }
        }
        else {
            var i = col + 1;
            while (i <= 8) {
                var id = 'b' + row + i;
                var newDiv = document.getElementById(id);
                if (newDiv && newDiv.innerHTML !== '') {
                    present = true;
                    break;
                }
                i++;
            }
        }
        var dist = (Math.abs(canon_col - i)) * 75 + 27.5;
    }
    if (present == true) {
        console.log("element found");
        console.log(newDiv.innerText);
        return [dist, newDiv, id];//distance,stopele,stopid
    }
    else {
        console.log('free path');
        console.log(dist);
        return [dist, false, false];//dist,no element,no id
    }
}

function checkele(bullet, stopele, c) {
    bulletDirection = bullet.classList[0];
    console.log(bulletDirection);
    console.log(stopele.innerText);
    var opp = c == 'r' ? 'b' : 'r';

    if (stopele.innerText == `${opp}titan`) {
        pauseBothTimers();
        removeImage(stopele.id);
        showGameOverScreen(`${c}`);
        return false;
    }

    else if (stopele.innerText == 'rsemi' || stopele.innerText == 'bsemi') {
        var img = document.getElementById(stopele.innerText);
        if(img){

        var rot=img.style.transform
        console.log(rot);
        rot=rot ? parseInt(img.style.transform.replace('rotate(', '').replace('deg)', ''))
            : 0;
        console.log(rot);
        if (rot < 0) {
            rot = Math.abs(rot) + 180;
        }
        var value = (rot / 90) % 4;
        console.log(value);
    }

        let newDirection='false';
        switch (value) {
            case 0:
                switch (bulletDirection) {
                    case 'up':
                    case 'left':
                        newDirection = 'false';
                        break;
                    case 'down':
                        newDirection = 'left';
                        break;
                    case 'right':
                        newDirection = 'up';
                        break;
                }
                break;
            case 1:
                console.log("shivu");
                switch (bulletDirection) {
                    case 'up':
                    case 'right':
                        newDirection = 'false';
                        break;
                    case 'down':
                        newDirection = 'right';
                        break;
                    case 'left':
                        newDirection = 'up';
                        break;
                }
                break;
            case 2:
                switch (bulletDirection) {
                    case 'down':
                    case 'right':
                        newDirection = 'false';
                        break;
                    case 'up':
                        newDirection = 'right';
                        break;
                    case 'left':
                        newDirection = 'down';
                        break;
                }
                break;
            case 3:
                switch (bulletDirection) {
                    case 'left':
                    case 'up':
                        newDirection = 'left';
                        break;
                    case 'down':
                        newDirection = 'false';
                        break;
                    case 'right':
                        newDirection = 'down';
                        break;
                }
                break;
            default:
                newDirection = 'false';
        }
        console.log(newDirection);
    
        if(newDirection==='false'){
            removeImage(stopele.id);
        }
    
        return newDirection;
    }

    else if (stopele.innerText == 'rricochet' || stopele.innerText == 'bricochet') {
        var img = document.getElementById(stopele.innerText);
        var rot = img.style.transform
            ? parseInt(img.style.transform.replace('rotate(', '').replace('deg)', ''))
            : 0;
        if (rot < 0) {
            rot = Math.abs(rot);
        }
        console.log(`rotate1 ${rot}`);

        var value = (rot / 90) % 2;
        console.log(`rotate2 ${value}`);

        let newDirection;
        switch (value) {
            case 0:
                switch (bulletDirection) {
                    case 'up':
                        newDirection = 'right';
                        break;
                    case 'down':
                        newDirection = 'left';
                        break;
                    case 'left':
                        newDirection = 'down';
                        break;
                    case 'right':
                        newDirection = 'up';
                        break;
                    default:
                        newDirection = 'false';
                }
                break;
            case 1:
                switch (bulletDirection) {
                    case 'up':
                        newDirection = 'left';
                        break;
                    case 'down':
                        newDirection = 'right';
                        break;
                    case 'left':
                        newDirection = 'up';
                        break;
                    case 'right':
                        newDirection = 'down';
                        break;
                    default:
                        newDirection = 'false';
                }
                break;
            default:
                newDirection = 'false';
        }
        console.log(newDirection);
        return newDirection;
    }

    else {
        bullet.style.visibility = 'hidden';
        return false;
    }
}


function moveupBulletRed(stopele, c) {
    console.log("red bullet moving");
    var bullet = document.getElementById('bullet');
    var bulletDirection = bullet.classList[0];
    console.log(bulletDirection);
    console.log(stopele);
    var canonBox = bullet.parentElement;
    bullet.style.visibility = "visible";
    var canonid = canonBox.id;
    var color = 'red';

    // Calculate distance to next obstacle
    var movement = calc_dist(bullet, color, stopele, canonid);
    var dist = movement[0];
    var stopele1 = movement[1];
    var stopid = movement[2];
    console.log(movement);
    console.log(dist);
    console.log(stopele1);
    console.log(stopid);


    const handleMovement = () => {
        console.log('handlemovement called !!');
        if (stopele) {
            var newDirection = checkele(bullet, stopele1, 'r');
            if (newDirection && newDirection!=='false') {
                bullet.classList.remove('up', 'down', 'left', 'right');
                bullet.classList.add(newDirection);
                console.log(bullet.className);
                console.log(stopid);
                moveupBulletRed(stopid, c);
                // currentPlayer=newcp; // Recursively move bullet in the new direction
            } else {
                bullet.style.visibility = 'hidden';
                startGameTimer();
                
            }
        } else {
            
            bullet.style.visibility = 'hidden';
            startGameTimer();
            
        }
    };

    switch (bulletDirection) {
        case 'up':
            console.log('red bullet movement initiated up');
            moveRedBullettUp(bullet, dist, handleMovement);
            break;
        case 'down':
            console.log('red bullet movement initiated down');
            moveBullettDown(bullet, dist, handleMovement);
            break;
        case 'left':
            console.log('red bullet movement initiated left');
            dist = -(dist - 75);
            moveBulletLeft(bullet, dist, handleMovement);
            break;
        case 'right':
            console.log('red bullet movement initiated right');
            moveBulletRight(bullet, dist, handleMovement);
            break;
        default:
            bullet.style.visibility = 'hidden';
    }
}


function moveupBulletBlue(stopele, c) {
    console.log("blue bullet moving");
    var bullet = document.getElementById('bullet');
    var bulletDirection = bullet.classList[0];
    console.log(bulletDirection);
    console.log(stopele);
    var canonBox = bullet.parentElement;
    bullet.style.visibility = "visible";
    console.log(bullet.style.visibility);
    var canonid = canonBox.id;
    var color = 'blue';

    // Calculate distance to next obstacle
    var movement = calc_dist(bullet, color, stopele, canonid);
    var dist = movement[0];
    var stopele1 = movement[1];
    var stopid = movement[2];
    console.log(movement);
    console.log(dist);
    console.log(stopele1);

    // Recursive movement handling
    var handleMovement = () => {
        console.log('handlemovement called !!');
        if (stopele) {
            var newDirection = checkele(bullet, stopele1, 'b');
            console.log(newDirection);
            if (newDirection && newDirection!=='false') {
                bullet.classList.remove('up', 'down', 'left', 'right');
                bullet.classList.add(newDirection);
                moveupBulletBlue(stopid, c); // Recursively move bullet in the new direction
            } else {
                bullet.style.visibility = 'hidden';
                console.log("no")
                change();
            }
        } else {
            bullet.style.visibility = 'hidden';
            console.log("no");
            change();
        }
    };

    switch (bulletDirection) {
        case 'up':
            console.log('bullet movement initiated up');
            moveBullettUp(bullet, dist, handleMovement);
            break;
        case 'down':
            console.log('bullet movement initiated down');
            moveBluebulletDown(bullet, dist, handleMovement);
            break;
        case 'left':
            console.log('bullet movement initiated left');
            dist = -(dist - 75);
            moveBulletLeft(bullet, dist, handleMovement);
            break;
        case 'right':
            console.log('bullet movement initiated right');
            moveBulletRight(bullet, dist, handleMovement);
            break;
        default:
            bullet.style.visibility = 'hidden';
    }
}

function fireBullet(c) {
    const bullet = document.getElementById('bullet');
        if (c === "r") {
            bullet.classList.remove('up', 'down', 'left', 'right');
            bullet.classList.add('down');
            var canonBox = bullet.parentElement;
            var canonid = canonBox.id;
            console.log(canonid);
            moveupBulletRed(canonid);
        }
        else if (c === "b") {
            bullet.classList.remove('up', 'down', 'left', 'right');
            bullet.classList.add('up');
            //console.log(bullet.classList[0]);
            var canonBox = bullet.parentElement;
            var canonid = canonBox.id;
            console.log(canonid);
            moveupBulletBlue(canonid);
        }
    }

document.addEventListener("DOMContentLoaded", function() {
    const boxPieceMapping = {
        "b81": "rtitan",
        "b82": "",
        "b83": "rtank",
        "b84": "",
        "b85": "",
        "b86": "",
        "b87": "rcanon",
        "b88": "",
        "b71": "",
        "b72": "",
        "b73": "rsemi",
        "b74": "",
        "b75": "rtank",
        "b76": "",
        "b77": "",
        "b78": "",
        "b61": "",
        "b62": "",
        "b63": "",
        "b64": "",
        "b65": "rricochet",
        "b66": "",
        "b67": "",
        "b68": "",
        "b51": "",
        "b52": "",
        "b53": "",
        "b54": "",
        "b55": "",
        "b56": "",
        "b57": "",
        "b58": "",
        "b41": "",
        "b42": "",
        "b43": "",
        "b44": "",
        "b45": "",
        "b46": "",
        "b47": "",
        "b48": "bsemi",
        "b31": "",
        "b32": "",
        "b33": "",
        "b34": "",
        "b35": "",
        "b36": "bricochet",
        "b37": "",
        "b38": "",
        "b21": "",
        "b22": "",
        "b23": "",
        "b24": "",
        "b25": "",
        "b26": "",
        "b27": "btank",
        "b28": "",
        "b11": "",
        "b12": "btank",
        "b13": "",
        "b14": "btitan",
        "b15": "bcanon",
        "b16": "",
        "b17": "",
        "b18": ""
    };

document.getElementById("pauseButton").addEventListener("click", function() {
    isPaused = true;
    pauseBothTimers();
    ncp=currentPlayer;
    currentPlayer=" ";
    document.getElementById("pausedScreen").style.display = "flex"; // Show the paused screen
});
console.log(isPaused);
document.getElementById("resumeButton").addEventListener("click", function() {
    isPaused = false;
    currentPlayer = ncp;
    if(currentPlayer==='b'){
        startGameTimer();
    }
    if(currentPlayer==='r'){
        change();

    }
    document.getElementById("pausedScreen").style.display = "none"; // Corrected display property value
});
const replayButton = document.getElementById("replayButton");
    replayButton.addEventListener("click", function() {
        resetGame(boxPieceMapping);
    });
    const revideoButton=document.getElementById("revideob");
    revideoButton.addEventListener("click",function(){
        revideoclicked=true;
        resetGame(boxPieceMapping);
    })

    
});
function resetGame(boxPieceMapping) {
    console.log("shivu");
    console.log("Resetting the game...");
    storeSidebarContent();
    resetBothTimers();
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = '';
    const gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style.display = 'none';
    currentPlayer = 'b';
    state = true; // Reset game state
    swapped = false; // Reset swapped state
    swap_arr = []; // Clear swap array

    // Reset all box contents
    Object.keys(boxPieceMapping).forEach(boxId => {
        const piece = boxPieceMapping[boxId];
        const box = document.getElementById(boxId);
        box.textContent = piece; // Set the piece text content
        console.log(box.textContent);
    });

    insertImage(); // Reapply images

    // Remove and reattach event listeners
    if(!revideoclicked){
    document.querySelectorAll('.box').forEach(box => {
        box.replaceWith(box.cloneNode(true)); // Remove event listeners
    });

    setupBoxClickListeners(); // Reattach event listeners
}

    if (revideoclicked) {
        console.log("revideo");
        revideoclicked = false;
        console.log(revideoclicked);
        revideo(sidebarContent); // Replay moves
        console.log("done");
    }
}
function storeSidebarContent() {
    const sidebar = document.getElementById('sidebar');
    const rows = sidebar.getElementsByClassName('row');

    for (let row of rows) {
        sidebarContent.push(row.textContent);
    }
    console.log(sidebarContent);
    if(undosclicked){
        undosclicked=false;
        undos(sidebarContent);
    }
    // Join the sidebar content with newline characters
    const formattedContent = sidebarContent.join('\n');
    console.log(sidebarContent);
    // Store the formatted content in local storage
    localStorage.setItem('sidebarContent', formattedContent);
    // if(revideoclicked){
    //     revideo(sidebarContent);
    // }
    // Log the local storage content
    console.log(localStorage);
}


class Timer {
    constructor(startMinutes, displayElement, onComplete) {
        this.startMinutes = startMinutes;
        this.currentTime = startMinutes * 60; // Convert minutes to seconds
        this.displayElement = displayElement;
        this.interval = null;
        this.onComplete = onComplete; // Callback function to execute when timer completes
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    updateDisplay() {
        this.displayElement.textContent = this.formatTime(this.currentTime);
    }

    start() {
        if (this.interval) return; // Prevent multiple intervals
        this.interval = setInterval(() => {
            if (this.currentTime > 0) {
                this.currentTime--;
                if(this.currentTime===0){
                    showGameOverScreen();
                }
                this.updateDisplay();
            } else {
                clearInterval(this.interval);
                this.interval = null;
                if (this.onComplete) this.onComplete(); // Call the onComplete callback
            }
        }, 1000);
    }

    pause() {
        clearInterval(this.interval);
        this.interval = null;
    }

    reset() {
        this.pause();
        this.currentTime = this.startMinutes * 60;
        this.updateDisplay();
    }
}

// Initialize timers for both sides with a callback to switch timers
const blueDisplay = document.getElementById('blue-timer');
const redDisplay = document.getElementById('red-timer');
const redTimer = new Timer(1, redDisplay);
const blueTimer = new Timer(1, blueDisplay, () => {
    blueTimer.pause();
    redTimer.start();
    if(singleplayermode===true){
        robotMove();
    }
});

// Update the displays initially
blueTimer.updateDisplay();
redTimer.updateDisplay();

// Functions to control the timers based on game logic
function startGameTimer() {
    blueTimer.start();
    redTimer.pause();
    document.getElementById('playerTurn').textContent = "Blue's Turn";
    document.getElementById('playerTurn').style.backgroundColor = "blue";

}
function change(){
    blueTimer.pause();
    redTimer.start();
    document.getElementById('playerTurn').textContent = "Red's Turn";
    document.getElementById('playerTurn').style.backgroundColor = "red";
    


    if(singleplayermode===true){
        robotMove();
    }
}

function pauseBothTimers() {
    redTimer.pause();
    blueTimer.pause();
   
}

function resetBothTimers() {
    redTimer.reset();
    blueTimer.reset();
    menu.disabled=false;
}
document.getElementById('pause-both').addEventListener('click', pauseBothTimers);
document.getElementById('reset-both').addEventListener('click', resetBothTimers);

function appendIdToList(itemId, list1, currentPlayer,m,dr,currentRotation) {
    console.log(itemId);
    // if(s===1){
    //     const element1=document.querySelector(`#${itemId}`);
    //     const piecename1=element1.innerText;
    // }
    console.log(m);
    list1.push(currentRotation);
    console.log(currentRotation);
    if(dr!==''){
        list1.push(dr);
        const item3=list1[list1.length-3];
    }
    list1.push(itemId);
    list1.push(m);

    const item1 = list1[list1.length - 1];
    const item2=list1[list1.length-2];
    const item4=list1[list1.length-4];
    console.log(item4);
    appendToSidebar(item1, currentPlayer,item2,dr,item4);
}
function appendToSidebar(item1,currentPlayer,item2,dr,currentRotation){
    const element = document.querySelector(`#${item2}`);
    let piecename=element.innerText;
    console.log(piecename);
    const element1=document.querySelector(`#${item1}`);
    let piecename1=element1.innerText;
    console.log(piecename1);
    // piecename = piecename.substring(1);
    console.log(piecename);
    const sidebar = document.getElementById('sidebar');
    const row = document.createElement('div');
    row.classList.add('row');
    // if(piecename1){
    //     row.textContent=item1+" "+(currentPlayer === 'r' ? 'Red : ' : 'Blue : ') +piecename+" "+ item2+piecename1;

    // }
    if(piecename1 && item1!==item2){
        console.log("pls");
        console.log(piecename1);
        row.textContent = item1+" "+(currentPlayer === 'r' ? 'Red : ' : 'Blue : ') +piecename+" "+"swapped"+" "+ piecename1+" "+" "+item2;
        console.log(row.textContent);;
        console.log(row.textContent);

    }
    else if(dr==='destroyed'){
        row.textContent=item1+" "+dr+piecename1+piecename;
        }
    else if(item1===item2){
        row.textContent = item1+" "+(currentPlayer === 'r' ? 'Red : ' : 'Blue : ') +piecename+" "+ "rotates"+" "+ dr+" "+currentRotation;
    }
    else{
    row.textContent = item1+" "+(currentPlayer === 'r' ? 'Red : ' : 'Blue : ') +piecename+" "+ item2;
    }
    let a=row.textContent;
    console.log(a);
    sidebar.appendChild(row);
}

var dpiece='';
function removeImage(boxId) {
    const box = document.getElementById(boxId);
    let dr='destroyed'
    const element = document.getElementById(boxId);
    if (element) {
        dpiece=element.innerText;
        element.innerText = '';
    } else {
        console.log(`No element found with ID ${boxId}`);
    }
    appendToSidebar(boxId, currentPlayer, boxId,dr);
}
var undosclicked=false;
document.getElementById('undoButton').addEventListener('click', () => {
    undosclicked=true;
    storeSidebarContent();
});

// Redo action
document.getElementById('redoButton').addEventListener('click', () => {
        redos();
});
function revideo(sidebarContent) {
    console.log(sidebarContent);

    // Function to perform a single move
    function performMove(move) {
        const a = document.getElementById(move.from);
        console.log(a);
        console.log(move.to);
        console.log(move.s);
        console.log(move.r);
        if(move.to===undefined){

        }
        
        else if (move.to !== 'rotates' && move.to !== "swapped") {
            const b = document.getElementById(move.to);
            console.log(a);
            console.log(b);
            b.innerHTML = a.innerHTML;
            a.innerHTML = '';
        }
        else if (move.to === "rotates") {
            var img = a.querySelector('img');
            var currentRotation = parseInt(img.getAttribute('data-rotation') || '0');
            if (move.r === 'right') {
                currentRotation += 90;
            } else {
                currentRotation -= 90;
            }
            img.style.transform = `rotate(${currentRotation}deg)`;
            img.setAttribute('data-rotation', currentRotation);
        }
        else if (move.to === 'swapped') {
            const b = document.getElementById(move.s);
            const temp = b.innerHTML;
            b.innerHTML = a.innerHTML;
            a.innerHTML = temp;
        } else {
            console.log(a);
            a.innerHTML = a.innerHTML;
        }
    }

    // Replay moves with a delay
    function replayMoves(sidebarContent) {
        let index = 0;
        let m = 0;
        m = sidebarContent.length;

        function nextMove() {
            if (index < sidebarContent.length) {
                const move = parseMove(sidebarContent[index]);
                performMove(move);

                if (m % 2 === 0) {
                    // currentPlayer='r';
                    placeBullet('red', 'r');
                    fireBullet('r');
                    m++;
                } else {
                    // currentPlayer='b';
                    placeBullet('blue', 'b');
                    fireBullet('b');
                    m++;
                }
                index++;
                setTimeout(nextMove, 3000); // 3000 milliseconds = 3 seconds
            }
        }

        nextMove();
    }

    // Parse move from the sidebarContent entry
    function parseMove(moveString) {
        const parts = moveString.split(" ");
        return {
            from: parts[0],
            to: parts[4],
            s: parts[7],
            r: parts[5] // Only used if the move involves rotation
        };
    }

    // Start replaying moves
    replayMoves(sidebarContent);

    console.log(localStorage);
    const dataFromLocalStorage = localStorage.getItem('keyName');
    const storedData = JSON.parse(dataFromLocalStorage);
    console.log(storedData);
}



let undoneMoves = [];

function undos(sidebarContent) {

    currentPlayer = newcp;
    console.log(sidebarContent);
    if (sidebarContent.length === 0) {
        console.log("No moves to undo.");
        return;
    }
    let prevmovestring = sidebarContent.pop();
    undoneMoves.push(prevmovestring); // Store the undone move in undoneMoves
    console.log(prevmovestring); // Remove the last move from the list
    console.log(prevmovestring);
    let prevmove = prevmovestring.split(" ")[0];
    let currmove = prevmovestring.split(" ")[4];
    let swapmove = prevmovestring.split(" ")[7];
    console.log(swapmove);
    console.log(currmove);

    let rotation = null;
    if (prevmovestring.includes("rotates")) {
        rotation = prevmovestring.split(" ")[6];
    }

    const prevelement = document.querySelector(`#${prevmove}`);
    let currelement = document.querySelector(`#${currmove}`);
    console.log(currelement);

    if (prevelement && currelement === null && currmove !== "swapped" && currmove!==undefined) {
        console.log(rotation);
        if (rotation === 'undefined') {
            console.log("ls");
            rotation = null;
        }
        if (rotation) {
            const img = document.getElementById(prevelement.innerText);
            rotation = rotation - 90;
            img.style.transform = `rotate(${rotation}deg)`;
        } else {
            prevelement.innerText = prevelement.innerText;
            // undos(sidebarContent);
        }
    } else if (currmove === "swapped") {
        
        console.log(swapmove);
        const currElementSwapped = document.querySelector(`#${swapmove}`);
        const temp = currElementSwapped.innerHTML;
        currElementSwapped.innerHTML = prevelement.innerHTML;
        prevelement.innerHTML = temp;
        insertImage();
    } else if (currelement !== null) {
        console.log(currmove);
        if (prevelement && currelement) {
            prevelement.innerHTML = currelement.innerHTML;
            currelement.innerHTML = '';
            console.log(prevelement.innerText);
            // insertImage();
            currentPlayer = newcp;
        } else {
            console.log("Elements not found.");
        }
        insertImage();
    } 
    else if(currmove===undefined){
        console.log("shivwanaa");
        prevelement.innerText=dpiece;
        insertImage();
        undos(sidebarContent);
        currentPlayer=newcp;
    }
    else {
        console.log("Elements not found.");
    }

    insertImage();
    currentPlayer = newcp;
    // sidebarContent.push(undoneMoves);
    // console.log(sidebarContent);
    console.log(prevmove); // Store updated sidebar content
}

function redos() {
    if (undoneMoves.length === 0) {
        console.log("No moves to redo.");
        return;
    }

    let prevmovestring = undoneMoves[undoneMoves.length-1];
    console.log(prevmovestring);

    let prevmove = prevmovestring.split(" ")[0];
    let currmove = prevmovestring.split(" ")[4];
    let swapmove=prevmovestring.split(" ")[7];

    let rotation = null;
    if (prevmovestring.includes("rotates")) {
        rotation = prevmovestring.split(" ")[6];
    }

    const prevelement = document.querySelector(`#${prevmove}`);
    const currelement = document.querySelector(`#${currmove}`);
    console.log(currelement);

    if (prevelement && currelement === null && currmove!=="swapped") {
        console.log(rotation);
        if (rotation === 'undefined') {
            console.log("ls");
            rotation = null;
        }
        if (rotation) {
            const img = document.getElementById(prevelement.innerText);
            rotation = rotation + 90;
            img.style.transform = `rotate(${rotation}deg)`;
        } else {
            prevelement.innerText = prevelement.innerText;
        }
    }
    else if (currmove === "swapped") {
        
        console.log(swapmove);
        const currElementSwapped = document.querySelector(`#${swapmove}`);
        const temp = currElementSwapped.innerHTML;
        currElementSwapped.innerHTML = prevelement.innerHTML;
        prevelement.innerHTML = temp;
        insertImage();
    }
     else if (currelement !== null) {
        console.log(currmove);
        if (prevelement && currelement) {
            currelement.innerText = prevelement.innerText;
            prevelement.innerText = " ";
            console.log(currelement.innerText);
            insertImage();
        } else {
            console.log("Elements not found.");
        }
    } else {
        console.log("Elements not found.");
    }

    insertImage();
    if(newcp==='r'){
        color='red';
    }
    else{
        color='blue';
    }
    placeBullet(color,newcp);
    fireBullet(newcp);

    // Update currentPlayer based on newcp
    currentPlayer = newcp === 'r' ? 'b' : 'r';
}// Declare undoneMoves in the global scope


var set = new Set();
var randomx = 0;
var randomy = 0;

function placepieces() {
    while (set.size < 3) {
        let p = generated();
        console.log(p);
        set.add(p);
    }
    if (set.size === 3) {
        while (set.size < 5) {
            randomx = 8;
            let p = generatey(randomx);
            console.log(p);
            set.add(p);
        }
    }
}

function generated() {
    randomx = generateRandomPosition(Math.floor(Math.random() * 8) + 1);
    randomy = generateRandomPosition(Math.floor(Math.random() * 8) + 1);
    let p = `b${randomx}${randomy}`;
    return p;
}

function generatey(randomx) {
    randomy = generateRandomPosition(Math.floor(Math.random() * 8) + 1);
    let p = `b${randomx}${randomy}`;
    return p;
}

function generateRandomPosition(row) {
    return Math.floor(Math.random() * 8) + 1;
}

const pieces = ['rricochet', 'rsemi', 'rtank', 'rcanon', 'rtitan'];
const pieces1 = ['bricochet', 'bsemi', 'btank', 'bcanon', 'btitan'];

function insertImagesAtSetPositions() {
    let index = 0;
    for (const position of set) {
        insertImages(position, pieces[index]);
        const oppositePosition = getOppositePosition(position);
        insertImages(oppositePosition, pieces1[index]);
        index++;
        
    }
}

function insertImages(positionId, piece) {
    const positionElement = document.getElementById(positionId);
    if (positionElement) {
        positionElement.innerHTML = `${piece} <img class='allimg' id="${piece}" src="./${piece}.png" alt="">`;
        positionElement.style.cursor = 'pointer';
    } else {
        console.error('Element with id', positionId, 'not found.');
    }
}

function getOppositePosition(position) {
    const x = parseInt(position.charAt(1));
    const y = parseInt(position.charAt(2));
    const oppositeX = 9 - x; // Opposite row on an 8x8 board
    const oppositeY = 9 - y; // Opposite column on an 8x8 board
    return `b${oppositeX}${oppositeY}`;
}
document.getElementById("menu").addEventListener("click", function() {
    document.getElementById("menuscreen").style.display = "flex"; // Show the paused screen
});


document.addEventListener('DOMContentLoaded', function() {
    const single = document.getElementById('myButton');
    const optionsDiv = document.getElementById('options');
    const BlueButton = document.getElementById('blue');
  
    single.addEventListener('click', function() {
      // Toggle the visibility of optionsDiv
      if (optionsDiv.style.display === 'none') {
        optionsDiv.style.display = 'block';
      } else {
        optionsDiv.style.display = 'none';
      }
    });
  
    // Add event listeners for option buttons
  
    BlueButton.addEventListener('click', function() {
      // Your code for handling Option 2
      singleplayermode=true;
      console.log('blueOption 2 clicked');
      cplayer('b');
      document.getElementById("menuscreen").style.display="none";
    });
  });
let computer='';
  function cplayer(currentPlayer){
    if(currentPlayer==='b'){
        computer='r';
        console.log(computer);
    }
    else{
        computer='b';
        console.log(computer);
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function robotMove() {
    console.log("computer playing");
    const innerTextsToFind = ["rcanon", "rtitan", "rsemi", "rricochet", "rtank"]; 
    const matchingBoxIds = []; 
    const allBoxes = document.querySelectorAll('.box');
    for (const innerText of innerTextsToFind) {
        for (const box of allBoxes) {
            if (box.innerText === innerText) {
                matchingBoxIds.push(box.id); 
            }
        }
    }

    console.log("Matching box IDs:", matchingBoxIds);
    const randomIndex = Math.floor(Math.random() * matchingBoxIds.length);
    const randomBoxId = matchingBoxIds[randomIndex];
    const randomBox = document.getElementById(randomBoxId);
    showPossibleMoves(randomBox);

    let randomAction;

    if (randomBox.innerText === 'rricochet' || randomBox.innerText === 'rsemi') {
        console.log("right left");
        const possibleActions = [
            { action: 'move', direction: 'right' },
            { action: 'move', direction: 'left' },
            { action: 'move', direction: 'newPosition' }
        ];
        const randomIndex = Math.floor(Math.random() * possibleActions.length);
        randomAction = possibleActions[randomIndex];
        console.log("Randomly selected action:", randomAction);

        // Include logic to randomly select either turn right or left
        const turnDirection = Math.random() >= 0.5 ? 'right' : 'left';
        console.log("Turn direction:", turnDirection);
    } else {
        const possibleActions = [
            { action: 'move', direction: 'newPosition' }
        ];
        randomAction = possibleActions[0];
    }

    // Wait for 2 seconds before proceeding
    await sleep(2000);

    if (randomAction.action === 'move' && randomAction.direction === 'newPosition') {
        let greenBoxes = [];
        document.querySelectorAll('.box').forEach(box => {
            if (box.style.backgroundColor === 'green') {
                greenBoxes.push(box);
            }
        });
        console.log(greenBoxes);
        if (greenBoxes.length > 0) {
            const randomIndex = Math.floor(Math.random() * greenBoxes.length);
            const randomBoxm = greenBoxes[randomIndex];
            randomBoxm.innerText = randomBox.innerText;
            randomBox.innerText='';
            insertImage();
            resetBoxColors();
            placeBullet("red",'r');
            fireBullet('r');
            currentPlayer='b';
        } else {
            console.log('No possible moves available.');
        }
    }
    else if(randomAction.action==='move' && randomAction.direction==='right'){
        const imgElement = document.querySelector(`#${randomBox.innerText}`);
        if (imgElement) {
            // Get the current rotation of the piece
            let currentRotation = parseInt(imgElement.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
            // Update the rotation to turn right (clockwise)
            currentRotation += 90;
            // Apply the new rotation to the piece
            imgElement.style.transform = `rotate(${currentRotation}deg)`;
        }
        resetBoxColors();
        placeBullet("red",'r');
        fireBullet('r');
        currentPlayer='b';
    }
    else if(randomAction.action==='move' && randomAction.direction==='left'){
        console.log('Turning left');
        // Get the image element of the selected piece
        const imgElement = document.querySelector(`#${randomBox.innerText}`);
        if (imgElement) {
            // Get the current rotation of the piece
            let currentRotation = parseInt(imgElement.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
            // Update the rotation to turn left (counter-clockwise)
            currentRotation -= 90;
            // Apply the new rotation to the piece
            imgElement.style.transform = `rotate(${currentRotation}deg)`;

        }
        resetBoxColors();
        placeBullet("red",'r');
        fireBullet('r');
        currentPlayer='b';

    }
};


  


