import axios from "axios";

const autoFixServer = import.meta.env.VITE_AUTOFIX_SERVER;
const autoFixPort = import.meta.env.VITE_AUTOFIX_PORT;

console.log(autoFixServer)
console.log(autoFixPort)

export default axios.create({
    baseURL: `http://${autoFixServer}:${autoFixPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});