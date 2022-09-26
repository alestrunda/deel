# React Questions

1. **What is the difference between Component and PureComponent? give an example where it might break my app.**

   `PureComponent` has build-in shallow comparation of props to prevent re-render.
   Using `PureComponent` is not dangerous, but it could prevent intentional re-render - for example when an object passed as a prop was mutated - well, but the root cause here would be mutating the object which we should not do in the first place. So as long as we're following best practices, there should not be a problem.
   But that also does not mean that we should write every single component as `PureComponent` - in order for the shallow props comparation to work, we need to memoize props passed by referrence. If we're not doing that, then `PureComponent` is waste and actually could make the app slower.

2. **Context + ShouldComponentUpdate might be dangerous. Can think of why is that?**

   Frankly, I had no knowledge of this, so I did a bit of googling. As I understand the problem would be if a component is connected only to a part of the context, which did not change, then `ShouldComponentUpdate` returns `false`, which causes the whole subtree of that component not to re-render. And that's where the problem is - a component in the subtree might be connected to a different part of the context that actually did change, but the compoment would not re-render.

3. **Describe 3 ways to pass information from a component to its PARENT.**

   1. calling a function passed as a `prop` or via `context`
   2. using state management like `redux`, where the child component makes a change in a store and that change is then passed from the store to the parent
   3. not sure about the third way... maybe using global `window` object - not a react way and not a clean solution, but should work too

4. **Give 2 ways to prevent components from re-rendering.**

   1. if the re-render is caused by changed props, we could use `PureComponent` or `React.memo`
   2. if it's caused by a state change, we could store the state as a referrence (`useRef`)

5. **What is a fragment and why do we need it? Give an example where it might break my app?**

   The render function cannot return an array, so if we want to return multiple elements, we need to wrap them into something. We could simply use `div` or something, but that would create another HTML element in the DOM, while that would not happen with React.Fragment.
   I'm not aware of any issues that could be caused by using fragments. Perhaps only that `key` attribute cannot be used when using the short syntax `<>`.

6. **Give 3 examples of the HOC pattern.**

   For example `React.memo()`, or `connect()` from redux, or since HOC was a way how to share functionality between components before hooks came, it could be for example `withUsers` (convention for HOC names was to start with `with`), while a hook for this would be `useUsers`.

7. **What's the difference in handling exceptions in promises, callbacks and async...await?**

   In promise we use `.catch` block.
   Errors from `await` are regular exceptions, so we need to wrap the call in `try-catch` block.
   With callbacks it depends on the syntax - we might pass two callbacks, one for success, another for error. Or more common is passing only one callback and then having an error passed back as one of the arguments - meaning if the error argument is set then there was an error.

8. **How many arguments does setState take and why is it async?**

   One. It could be either a new state or a function. That function gets the current state as an argument, which is useful if we're doing multiple state updates in a row based on the previous state (otherwise the state would not be up to date due to setState running async).
   It's async in order to improve react's performance - instead of running every state update separately, react could batch those updates.

9. **List the steps needed to migrate a Class to Function Component.**

   - rewrite methods as single functions
   - rewrite state using `useState`
   - rewrite lifecycle methods using `useEffect`
   - remove all `this`
   - remove `render` method and just do `return` instead

10. **List a few ways styles can be used with components.**

    - inline styles
    - separate CSS (or SASS etc.) file
    - CSS in JS - styled components, etc.

11. **How to render an HTML string coming from the server?**
    By using `dangerouslySetInnerHTML`. It should be used alongside some sanitizer as it's vulnerable to XSS.
