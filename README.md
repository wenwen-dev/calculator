# calculator

## Summary - lessons learnt

When my code gets cmplicated, esp. a bit unnecessarily complicated, pause, take a step back, regroup to see if there's a simpler logic, before pushing on. (example: me juggling num1 & num2, vs. smart use of display value)

- numButton & decimalBtn: think in terms of strings and string concatenation, instead of numbers, which is much easier and straightforward
- the magic of a simple 'return': if (event.target.textContent === '.' && screenContent.includes('.')) return;
- Not assigning num pressed to num1 or num2, but instead on screen, violates a bit modular concept, but saves lots of if else to decide if we are looking at num1 or num2. We can simply set a logic to reset screen display, and store the value to a num when refreshing.
