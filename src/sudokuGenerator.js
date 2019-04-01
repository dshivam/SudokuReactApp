 export function sudokuGenerator() {
    const mat = [];
    for (let i = 0; i < 9; i += 1) {
        const arr = [];
        for (let j = 0; j < 9; j += 1) {
            arr.push(0);
        }
        mat.push(arr);
    }
        fillDiagonal(mat); 
        fillRemaining(mat, 0, 3);
       return mat;
}

function fillDiagonal(mat) {
    for (let i = 0; i < 9; i = i + 3) {
        fillBox(mat, i, i);
    }
}

function unusedInBox(mat, rowStart, colStart, num) {
    for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 3; j += 1) {
            if (mat[rowStart + i][colStart + j] === num) {
                return false
            }
        }
    }
    return true;
}
function fillBox(mat, a, b) {
    let num;
    for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 3; j += 1) {
            do {
                num = Math.floor((Math.random()*9+1)); 
            } while (!unusedInBox(mat, a, b, num));
            mat[a + i][b + j] = num;
        }
    }
}

function CheckIfSafe(mat, i, j, num) { 
    return (unUsedInRow(mat, i, num) && 
            unUsedInCol(mat, j, num) && 
            unusedInBox(mat, i-i%3, j-j%3, num)); 
} 

function unUsedInRow(mat, i, num) { 
    for (let j = 0; j<9; j++){
       if (mat[i][j] === num) {
            return false; 
       }
    }
    return true; 
} 

function unUsedInCol(mat, j, num) { 
    for (let i = 0; i<9; i++) {
        if (mat[i][j] === num)  {
            return false;
        } 
    }
    return true; 
} 

function fillRemaining(mat, i, j) {
    if (j >= 9 && i < 8) {
        i += 1;
        j = 0;
    }
    if (i >= 9 && j >= 9) {
            return true;
    } 
  
    if (i < 3) { 
            if (j < 3) {
                j = 3; 
            }
        } else if (i < 6) {
            if (j === Math.floor(Math.floor(i/3)*3)) {
                j += 3;
            }
        } else {
            if (j === 6) {
                i += 1;
                j = 0;
                if (i >= 9) {
                    return true;
                }
            }
        }
        for (let num = 1; num <= 9; num += 1) {
            if (CheckIfSafe(mat, i, j, num)) {
                mat[i][j] = num;
                if (fillRemaining(mat, i, j+1)) {
                    return true;
                }
                mat[i][j] = 0;
            }
        }
        return false;
}

export function removeKDigits(unsolvedMat) {
   let count = 20;
   while (count !== 0) {
       let cellId = Math.floor((Math.random()*81+1));
       let i = Math.floor(cellId/9);
       let j = cellId%9;
       if (j !== 0) {
            j -= 1;
       }
       if (unsolvedMat[i][j] !== 0) {
         count -= 1;
         unsolvedMat[i][j] = 0;
       }
   }
   return unsolvedMat;
}
