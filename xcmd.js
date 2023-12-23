const yargs = require('yargs');
const path = require('path')
const { execSync } = require('child_process');
; (async () => {
    const arg = yargs
        .scriptName("xcmd")
        .command("cookie")
        .options("edit", {
            alias: "e",
            boolean: true
        })
        .argv

    if (arg._.includes("cookie")) {
        if (arg.edit) {
            const p = path.join(__dirname, "./src/ast/cookie.json")
            execSync(`nano ${p}`, {stdio: "inherit"})
            return
        }

        yargs.showHelp()
        return
    }

    yargs.showHelp()

})()