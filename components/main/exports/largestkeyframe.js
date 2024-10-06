const largestKeyframe = (array) => {
    let largest = 0;
    array.forEach(e => {
        e.keyframes.forEach(e => {
            if (e.val > largest) {
                largest = e.val
            }
        })
    });
    return largest
}

export default largestKeyframe