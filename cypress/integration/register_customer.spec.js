// adding_client.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Criando novo usuátio', () => {
  it('Acessando o site e fazendo o teste inicial, de clique para continuar sem  o preenchimento do formulário', () => {
    cy.visit('http://localhost:3000');
  });

  it('Redirecionando para página de cadastro', () => {
    cy.wait(2000)
    cy.get('[data-testid="linkRegister"]').click();
  });

  it('Validando formulário não preenchido e exibindo mensagens de erro', () => {
    cy.wait(2000)
    cy.get('[data-testid="btnCriarUsuario"]').click();
  });

  it('Preenchendo formulário para criação de novo usuário', () => {
    const initialState = [
      {
        name: "Administrador",
        birthDate: "01/01/2000",
        cpf: "12345678900",
        email: "admin@admin.com.br",
        login: "admin",
        pass: "admin1234",
        extract: [
          {
            op: "credito",
            desc: "Saldo inicial em 5000000,00",
            data: "01/01/2000",
            moeda: "real",
          },
        ],
        balanceTotal: 500000.0,
        balanceBitcoin: 0,
        quantBitcoin: 0,
        balanceBusd: 0,
        quantBusd: 0,
      },
    ];


    window.localStorage.setItem("usersData", JSON.stringify(initialState))

    cy.wait(2000)
    cy.get('[data-testid="name"]')
    .type('Novo Usuario');
    cy.wait(2000)

    cy.get('[data-testid="dataDeNascimento"]')
    .type('01/04/2000');
    cy.wait(2000)

    cy.get('[data-testid="cpf"]')
    .type('11535329726');
    cy.wait(2000)

    cy.get('[data-testid="email"]')
    .type('novousario@teste.com');
    cy.wait(2000)

    cy.get('[data-testid="novoLogin"]')
    .type('novoUsuario');
    cy.wait(2000)

    cy.get('[data-testid="novaSenha"]')
    .type('Novo@014');
    cy.wait(2000)

    cy.get('[data-testid="btnCriarUsuario"]').click();


  });
});
