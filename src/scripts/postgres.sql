--criar tabela
DROP TABLE IF EXISTS TB_HEROES;
CREATE TABLE TB_HEROES (
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
  NOME TEXT NOT NULL,
  PODER TEXT NOT NULL
)

--insert
INSERT INTO TB_HEROES (NOME, PODER)
VALUES
  ('Flash', 'Velocidade'),
  ('Aquaman', 'Falar com os animais'),
  ('Batman', 'Dinheiro')

--read
SELECT * FROM tb_heroes;

SELECT * FROM tb_heroes WHERE NOME = 'Flash';

SELECT nome FROM tb_heroes WHERE NOME = 'Flash';

--update
UPDATE TB_HEROES
SET NOME = 'Goku', PODER = 'Deus'
WHERE ID = 1;

--delete
DELETE FROM TB_HEROES WHERE ID = 2;