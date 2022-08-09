// adding_client.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Realizando transações', () => {
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

  it('Acessando a página de transações', () => {
     cy.get('[data-testid="Transações (R$)"]').click();
     cy.wait(2000)

  });


  it('Comprando bitcoin', () => {

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
            desc: "compra de 1 bitcoin",
            data: "01/01/2000",
            moeda: "bitcoin",
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

    cy.get('[data-testid="tranBitcoin"]').click();
    cy.wait(2000)

    cy.get('[data-testid="quantBitcoin"]')
      .type('1');
      cy.wait(2000)

      cy.get('[data-testid="buyBitcoin"]').click();
      cy.wait(2000)

 });

 it('Comprando busd', () => {

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
          desc: "Compra de 1 bitcoin",
          data: "01/01/2000",
          moeda: "bitcoin",
        },
        {
          op: "credito",
          desc: "Compra de 1 busd",
          data: "01/01/2000",
          moeda: "busd",
        },
      ],
      balanceTotal: 500000.0,
      balanceBitcoin: 1,
      quantBitcoin: 1,
      balanceBusd: 0,
      quantBusd: 0,
    },
  ];


  window.localStorage.setItem("usersData", JSON.stringify(initialState))


  cy.get('[data-testid="tranBusd"]').click();
  cy.wait(2000)

  cy.get('[data-testid="quantBusd"]')
    .type('1');
    cy.wait(2000)

    cy.get('[data-testid="buyBusd"]').click();
    cy.wait(2000)

});

it('Consultando extratos após as compras', () => {
  cy.get('[data-testid="Extrato Detalhado"]').click();
     cy.wait(2000)

  cy.get('[data-testid="extratoBitcoin"]').click();
  cy.wait(2000)

  cy.get('[data-testid="extratoBusd"]').click();
  cy.wait(2000)

  cy.get('[data-testid="extratoReal"]').click();
  cy.wait(2000)

});

it('Vendendo bitcoin', () => {

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
          op: "debito",
          desc: "Venda de 1 bitoin",
          data: "01/01/2000",
          moeda: "bitcoin",
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

  cy.get('[data-testid="Transações (R$)"]').click();
  cy.wait(2000)

  cy.get('[data-testid="tranBitcoin"]').click();
  cy.wait(2000)

  cy.get('[data-testid="quantBitcoin"]')
    .type('1');
    cy.wait(2000)

    cy.get('[data-testid="sellBitcoin"]').click();
    cy.wait(2000)

});

it('Vendendo busd', () => {

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
          op: "debito",
          desc: "Venda de 1 bitoin",
          data: "01/01/2000",
          moeda: "bitcoin",
        },
        {
          op: "debito",
          desc: "Venda de 1 busd",
          data: "01/01/2000",
          moeda: "busd",
        },
      ],
      balanceTotal: 500000.0,
      balanceBitcoin: 0,
      quantBitcoin: 0,
      balanceBusd: 1,
      quantBusd: 1,
    },
  ];


  window.localStorage.setItem("usersData", JSON.stringify(initialState))


  cy.get('[data-testid="tranBusd"]').click();
  cy.wait(2000)

  cy.get('[data-testid="quantBusd"]')
    .type('1');
    cy.wait(2000)

    cy.get('[data-testid="sellBusd"]').click();
    cy.wait(2000)

});

it('Consultando extratos apos as vendas', () => {
  cy.get('[data-testid="Extrato Detalhado"]').click();
     cy.wait(2000)

  cy.get('[data-testid="extratoBitcoin"]').click();
  cy.wait(2000)

  cy.get('[data-testid="extratoBusd"]').click();
  cy.wait(2000)

  cy.get('[data-testid="extratoReal"]').click();
  cy.wait(2000)

});
});
