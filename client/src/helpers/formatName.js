export const formatName = (arr, currentUser) => {
    let formatted;
    // Remove current user from array
    let filteredArr = arr.filter((item) => item._id !== currentUser._id);
    if (filteredArr.length === 2) {
        formatted = filteredArr.map((arrItem) => arrItem.name).join(', ');
    } else if (filteredArr.length > 2) {
        formatted = `${filteredArr[0].name} + ${filteredArr.length - 1}`;
    } else {
        formatted = filteredArr[0].name;
    }
    return formatted;
};
