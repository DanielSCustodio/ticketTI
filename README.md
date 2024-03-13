# ticketTI
 <h2>Guia de Instalação</h2>
  <ol>
    <li>Clone este repositório usando o comando   <pre><code> git clone git@github.com:DanielSCustodio/ticketTI.git</code></pre></li>
    <li>Importe o arquivo <code>ticket_ti.sql</code> (que se encontra na raiz projeto) para um banco de dados vazio. Esse arquivo contém a estrutura de tabelas necessárias para o funcionamento do projeto.</li>
    <li>Crie um arquivo chamado  <code>.env.development.local </code> na raiz do projeto e adicione as seguintes informações de conexão do banco de dados, substituindo os valores xxx pelos dados corretos. A variável <code>SECRET</code> é referente a sessão do navegador, fique livre para criar um valor para esta chave:</li>
    <pre><code>DB_PASS=xxx
DB_HOST=localhost
DB_USER=xxxx
DB_NAME=xxxx
PORT=xxx
SECRET =xxxxxxx
    </code></pre>
    <li>Execute o comando <code>npm install</code> para instalar todas as dependências necessárias do projeto.</li>
    <li>Execute o comando <code>sass --watch public/styles/main.sass:public/css/style.css</code> para compilar o SASS em tempo real.</li>
    <li>Finalmente, execute o comando <code>npm start</code> para iniciar o servidor. O aplicativo estará disponível em <code>http://localhost:PORT/</code>, onde <code>PORT</code> é a porta especificada no arquivo <code>.env.development.local</code>.</li>
    <li>Nome de usuário: <code>admin</code></li>
    <li>Senha: <code>123456</code></li>
    <li>Para apagar todos os dados do banco de dados, retire o comentário da linha <code>14</code> até linha <code>20</code> e também o comentário da linha <code>96</code>. Em seguida salve o arquivo.</li>
  </ol>

  <h2>Contribuindo</h2>
  <p>Sinta-se à vontade para contribuir com este projeto. Basta seguir os seguintes passos:</p>
  <ol>
    <li>Faça um fork deste repositório.</li>
    <li>Crie um branch com suas alterações (<code>git checkout -b minha-alteracao</code>).</li>
    <li>Commit suas alterações (<code>git commit -m "Minha alteração"</code>).</li>
    <li>Faça um push para o branch (<code>git push origin minha-alteracao</code>).</li>
    <li>Abra um Pull Request.</li>
  </ol>
</body>
