import {app} from './server';

const server = app.listen(3333, () => {
    console.log('\n 🚀 server running on port 3333 🚀');
 });


/**
 * Ao encerrar o processo, o app é finalizado também
 */
 process.on('SIGINT', () => {
    server.close();
    console.log('\nApp finalizado');
});