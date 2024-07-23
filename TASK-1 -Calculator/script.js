document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    let currentInput = '';
    let expression = '';

    const buttons = document.querySelectorAll('.row button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === 'CLR') {
               
                currentInput = '';
                expression = '';
                result.textContent = '0';
            } else if (value === 'DEL') {
                handleDelete();
            } else if (value === '=') {
                handleEquals();
            } else if (['+', '-', '*', '/'].includes(value)) {
                handleOperator(value);
            } else if (value === '.') {
                handleDecimal();
            } else {
                handleNumber(value);
            }
        });
    });

    function handleDelete() {
        if (currentInput) {
            
            currentInput = currentInput.slice(0, -1);
        } else if (expression) {
           
            expression = expression.replace(/([+\-*/]?)\d+(\.\d*)?$/, match => {
               
                return match.slice(0, -1);
            });
        }
        result.textContent = expression + currentInput || '0';
    }

    function handleEquals() {
        if (currentInput) {
            expression += currentInput;
        }
        try {
            const calculation = evaluateExpression(expression);
            result.textContent = calculation;
            currentInput = calculation;
            expression = '';
        } catch {
            result.textContent = 'Error';
            currentInput = '';
            expression = '';
        }
    }

    function handleOperator(op) {
        if (currentInput || expression) {
           
            if (expression && ['+', '-', '*', '/'].includes(expression.slice(-1))) {
                expression = expression.slice(0, -1);
            }
            expression += currentInput + op;
            currentInput = '';
            result.textContent = expression;
        }
    }

    function handleDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            result.textContent = expression + currentInput;
        }
    }

    function handleNumber(num) {
        currentInput += num;
        result.textContent = expression + currentInput;
    }

    function evaluateExpression(expr) {
        try {
            const sanitizedExpr = expr.replace(/[^0-9+\-*/().]/g, '');
            return new Function('return ' + sanitizedExpr)();
        } catch {
            return 'Error';
        }
    }
});
