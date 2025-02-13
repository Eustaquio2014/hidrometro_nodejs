module.exports = async (hbs) => {
    // Registrando funções auxiliares ao Handdlebars (HBS)
    // Conditional Helper - Exemplo de uso:  {{#ifCond var1 '==' var2 }} {{dados}} {{/ifCond}}
    hbs.handlebars.registerHelper('ifCond', (v1, operator, v2, options) => {
        switch (operator) {
        case '==':
            return v1 === v2 ? options.fn(this) : options.inverse(this)

        case '===':
            return v1 === v2 ? options.fn(this) : options.inverse(this)

        case '!=':
            return v1 !== v2 ? options.fn(this) : options.inverse(this)

        case '!==':
            return v1 !== v2 ? options.fn(this) : options.inverse(this)

        case '<':
            return v1 < v2 ? options.fn(this) : options.inverse(this)

        case '<=':
            return v1 <= v2 ? options.fn(this) : options.inverse(this)

        case '>':
            return v1 > v2 ? options.fn(this) : options.inverse(this)

        case '>=':
            return v1 >= v2 ? options.fn(this) : options.inverse(this)

        case '&&':
            return v1 && v2 ? options.fn(this) : options.inverse(this)

        case '||':
            return v1 || v2 ? options.fn(this) : options.inverse(this)

        default:
            return options.inverse(this)
        }
    })
    // JSON Stringify Helper -
    // Exemplo de uso: html <script> myView = new myView({user : {{{json user}}} }); </script>
    hbs.handlebars.registerHelper('json', (context) => JSON.stringify(context))
}
