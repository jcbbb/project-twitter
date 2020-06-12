import React from 'react';
import { HANDLE_REGEX, URL_REGEX, HASHTAG_REGEX } from './regexes';
import { CompositeDecorator } from 'draft-js';

const TWEET_LIMIT = 280;

const handleSpan = React.memo(({ children, offsetKey }) => (
    <span data-offset-key={offsetKey} style={{ color: 'rgb(29, 161, 242)' }}>
        {children}
    </span>
));

const hashtagSpan = React.memo(({ children, offsetKey }) => (
    <span data-offset-key={offsetKey} style={{ color: 'rgb(29, 161, 242)' }}>
        {children}
    </span>
));

const urlSpan = React.memo(({ children, offsetKey, decoratedText }) => (
    <a
        data-offset-key={offsetKey}
        className="underlineHover"
        href={decoratedText}
        style={{ color: 'rgb(29, 161, 242)' }}
    >
        {children}
    </a>
));

const overflowSpan = React.memo(({ children }) => <span style={{ background: 'rgb(224, 36, 94)' }}>{children}</span>);

const findWithRegex = (regex, contentBlock, cb) => {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        cb(start, start + matchArr[0].length);
    }
};

const handleStrategy = (contentBlock, cb, contentState) => {
    findWithRegex(HANDLE_REGEX, contentBlock, cb);
};
const hashtagStrategy = (contentBlock, cb, contentState) => {
    findWithRegex(HASHTAG_REGEX, contentBlock, cb);
};
const urlStrategy = (contentBlock, cb, contentState) => {
    findWithRegex(URL_REGEX, contentBlock, cb);
};
const overflowStrategy = (contentBlock, cb) => {
    const textLength = contentBlock.getLength();
    if (textLength > TWEET_LIMIT) cb(TWEET_LIMIT, textLength);
};

export const compositeDecorator = new CompositeDecorator([
    {
        strategy: overflowStrategy,
        component: overflowSpan,
    },
    {
        strategy: handleStrategy,
        component: handleSpan,
    },
    {
        strategy: hashtagStrategy,
        component: hashtagSpan,
    },
    {
        strategy: urlStrategy,
        component: urlSpan,
    },
]);
