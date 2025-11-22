-- Tabela de usuários 
CREATE TABLE IF NOT EXISTS usuarios (
id serial PRIMARY KEY,
nome text NOT NULL,
email text UNIQUE NOT NULL,
senha text NOT NULL,
data_criacao timestamptz DEFAULT now()
);


-- Tabela produtos
CREATE TABLE IF NOT EXISTS produtos (
id serial PRIMARY KEY,
nome text NOT NULL,
descricao text,
preco numeric(10,2) NOT NULL,
disponivel boolean DEFAULT true,
data_criacao timestamptz DEFAULT now()
);


CREATE TABLE IF NOT EXISTS  pedidos (
    id SERIAL PRIMARY KEY,  
    usuario_id INT NOT NULL,
    produto VARCHAR(100) NOT NULL,
    quantidade INT NOT NULL,
    total NUMERIC(10,2) NOT NULL,
    data_criacao TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);