import React from 'react';
import ReactDOM from 'react-dom/client';
import Principal from './views/Principal'
import { FluentProvider } from '@fluentui/react-components';

function Example() {
    return (
        <><Principal/></>
    );
}

export default Example;

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        <React.StrictMode>
            <FluentProvider>
            <Example/>
            </FluentProvider>
        </React.StrictMode>
    )
}
