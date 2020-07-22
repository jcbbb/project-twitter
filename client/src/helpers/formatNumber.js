export const formatNumber = (num) => {
    if (isNaN(num)) return;
    let formattedNum;

    if (num >= 1000) {
        formattedNum = (num / 1000).toFixed(num === 1000 ? 0 : 1) + 'K';
    } else if (num >= 1000000) {
        formattedNum = (num / 1000000).toFixed(num === 1000000 ? 0 : 1) + 'M';
    } else if (num >= 1000000000) {
        formattedNum = (num / 1000000000).toFixed(num === 1000000000 ? 0 : 1) + 'B';
    } else {
        return num;
    }

    return formattedNum;
};
