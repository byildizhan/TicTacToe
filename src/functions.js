export function isNull(obj) {
    let arr = []
    Object.entries(obj).map(([keys, values]) => {
        if (values == null) {
            arr.push(keys)
        }
    })
    return arr
}
export function rand(array) {
    return array[Math.floor(Math.random() * (array.length))]
}

export function win(obj) {
    let options = [
        ["0,0", "0,1", "0,2"],
        ["1,0", "1,1", "1,2"],
        ["2,0", "2,1", "2,2"],
        ["0,0", "1,0", "2,0"],
        ["0,1", "1,1", "2,1"],
        ["0,2", "1,2", "2,2"],
        ["0,0", "1,1", "2,2"],
        ["0,2", "1,1", "2,0"],
    ]

    for (let i = 0; i < options.length; i = i + 1) {
        let [a, b, c] = options[i];
        let isequal = (obj[a] === obj[b] && obj[a] === obj[c])
        if (obj[a] !== null && isequal) {
            return obj[a]
        }
    }
    let isfull = null
    for (let i = 0; i < options.length; i = i += 1) {
        for (let j = 0; j < 3; j++) {
            if (obj[options[i][j]] === null) {
                isfull = false
            }
        }
    }
    isfull = isfull === false ? false : true
    if (isfull) {
        return "Draw"
    }
    return null
}




