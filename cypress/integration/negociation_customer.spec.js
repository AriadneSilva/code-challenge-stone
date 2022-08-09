// adding_client.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Realizando negociação', () => {
  it('Acessando o site e fazendo o teste inicial, de clique para continuar sem  o preenchimento do formulário', () => {
    cy.visit('http://localhost:3000');
  });

  it('Logando na aplicação', () => {
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
          {
            op: "credito",
            desc: "Saldo inicial em 1 bitcoin",
            data: "01/01/2000",
            moeda: "bitcoin",
          },
          {
            op: "credito",
            desc: "Saldo inicial em 1 busd",
            data: "01/01/2000",
            moeda: "busd",
          },
        ],
        balanceTotal: 500000.0,
        balanceBitcoin: 1,
        quantBitcoin: 1,
        balanceBusd: 1,
        quantBusd: 1,
      },
    ];


    window.localStorage.setItem("usersData", JSON.stringify(initialState))

    cy.get('[data-testid="login"]')
      .type('admin');
      cy.wait(2000)

    cy.get('[data-testid="password"]')
      .type('admin1234');
      cy.wait(2000)

     cy.get('[data-testid="btnLogin"]').click();
     cy.wait(2000)
  });

  it('Acessando a página de negociação', () => {
     cy.get('[data-testid="Negociação (Criptomoedas)"]').click();
     cy.wait(2000)

  });


  it('Comprando bitcoin usando Busd', () => {

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
        quantBusd: 5000000.0,
      },
    ];


    window.localStorage.setItem("usersData", JSON.stringify(initialState))


    cy.get('[data-testid="quantNegociation"]')
      .type('1');
      cy.wait(2000)

      cy.get('[data-testid="buyNegociation"]').click();
      cy.wait(2000)

 });

 it('Consultando extratos apos compra de bitcoin', () => {
  cy.get('[data-testid="Extrato Detalhado"]').click();
     cy.wait(2000)

  cy.get('[data-testid="extratoBitcoin"]').click();
  cy.wait(2000)

});

it('Comprando busd usando Bitcoin', () => {

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
      quantBitcoin: 1,
      balanceBusd: 0,
      quantBusd: 0,
    },
  ];


  window.localStorage.setItem("usersData", JSON.stringify(initialState))


  cy.get('[data-testid="Negociação (Criptomoedas)"]').click();
  cy.wait(2000)

  cy.get('[data-testid="changeRelationDiv"]').click();
    cy.wait(2000)

  cy.get('[data-testid="quantNegociation"]')
    .type('1');
    cy.wait(2000)

    cy.get('[data-testid="buyNegociation"]').click();
    cy.wait(2000)

});

it('Consultando extratos após compra de busd', () => {
  cy.get('[data-testid="Extrato Detalhado"]').click();
     cy.wait(2000)


  cy.get('[data-testid="extratoBusd"]').click();
  cy.wait(2000)

});

it('Vendendo bitcoin recebendo em Busd', () => {

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
      quantBitcoin: 1,
      balanceBusd: 0,
      quantBusd: 0,
    },
  ];


  window.localStorage.setItem("usersData", JSON.stringify(initialState))

  cy.get('[data-testid="Negociação (Criptomoedas)"]').click();
  cy.wait(2000)

  cy.get('[data-testid="quantNegociation"]')
    .type('1');
    cy.wait(2000)

    cy.get('[data-testid="sellNegociation"]').click();
    cy.wait(2000)

});

it('Consultando extratos apos venda de bitcoin', () => {
  cy.get('[data-testid="Extrato Detalhado"]').click();
     cy.wait(2000)

  cy.get('[data-testid="extratoBitcoin"]').click();
  cy.wait(2000)

});

it('Vendendo busd recebendo em Bitcoin', () => {

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
      quantBusd: 1,
    },
  ];


  window.localStorage.setItem("usersData", JSON.stringify(initialState))


  cy.get('[data-testid="Negociação (Criptomoedas)"]').click();
  cy.wait(2000)

  cy.get('[data-testid="changeRelationDiv"]').click();
    cy.wait(2000)

  cy.get('[data-testid="quantNegociation"]')
    .type('1');
    cy.wait(2000)

    cy.get('[data-testid="sellNegociation"]').click();
    cy.wait(2000)

});


it('Consultando extratos apos venda de busd', () => {
  cy.get('[data-testid="Extrato Detalhado"]').click();
     cy.wait(2000)

  cy.get('[data-testid="extratoBusd"]').click();
  cy.wait(2000)

});

});
