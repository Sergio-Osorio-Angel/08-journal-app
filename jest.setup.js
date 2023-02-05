// import "isomorphic-fetch";
import 'whatwg-fetch'; // npm i whatwg-fetch
import 'setimmediate';

require('dotenv').config({
    path: '.env.test'
});

jest.mock('./src/helpers/getEnvironments', ()=> ({
    getEnvironments: () => ({...process.env})
}));