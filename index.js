const Bard = require("ai-bard");

const __Secure_3PSIDCC = "ABTWhQFrLj2lLzOrXUABNhmzpdhukjEzLbZJrAB--V5VCeC1i46IkVNedJwJGX3dkNblQHvmTA4"
const __Secure_1PSID = "dQixM5NlPcd-0jlxYda4UYHUiKTBEm8RWaGYSECzGqVqWEvyIOA89elnR8Z45RrpVjuNDw.";
const __Secure_1PSIDTS = "sidts-CjIBPVxjSkdY6M72fAuwfUIlc10vVgZKnbSgrGa1wjNiaLusvMlGagStx42slhA0O0tS8RAA";
const cookie = `__Secure-1PSIDTS=${__Secure_1PSIDTS};__Secure-1PSID=${__Secure_1PSID}`;
const myBard = new Bard(cookie);

myBard.ask("Hello!")
.then(console.log)