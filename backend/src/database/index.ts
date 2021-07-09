import {createConnection} from 'typeorm'

// createConnection();

export const connectDb = async () => {
    const conexao = await createConnection();
    console.log(`App conectado ao BD ${conexao.options.name}`);
    

    process.on('SIGINT', () => {
        conexao.close().then(() => console.log('Conexão com o BD fechada'));
    });
};
