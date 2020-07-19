import {format} from 'date-fns';

export const formatDate = (date) => {
    const fromNow = Math.round((Date.now() - new Date(date)) / 1000 );
    let time;
    if(fromNow < 60) time = `${fromNow}s`;
    else if(fromNow < 3600) time = `${Math.floor(fromNow / 60)}m`;
    else if(fromNow < 86400) time = `${Math.floor(fromNow / 3600)}h`;
    else time = format(new Date(date), 'MMM dd')
    return time;
}
