import * as events from './events';

// -----------------------------------------------------------------------------
// STATE / CONSTANTS
// -----------------------------------------------------------------------------

let _currentContext = 'MENU';

export const CONTEXTS = Object.freeze({
    MENU: 'MENU',
    GAME: 'GAME',
});


// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

export function getContext()
{
    return _currentContext;
}

export function setContext(context)
{
    context = context.toUpperCase();

    // Don't change the context if its already set
    if (context in CONTEXTS && context != _currentContext) {
        events.clear();
        // Change the context
        _currentContext = context;
    }
}
