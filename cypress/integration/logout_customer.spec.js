// adding_client.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Logando na aplicação', () => {
  it('Acessando o site e fazendo o teste inicial, de clique para continuar sem  o preenchimento do formulário', () => {
    cy.visit('http://localhost:3000');
  });

  it('Inserindo informações no formulário e testando o envio dos dados', () => {
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

    cy.get('[data-testid="login"]')
      .type('admin');

    cy.get('[data-testid="password"]')
      .type('admin1234');

     cy.get('[data-testid="btnLogin"]').click();

  });

  it('Realizando logout', () => {
    cy.wait(2000)
    cy.get('[data-testid="logoutUser"]').click();
  });
});
