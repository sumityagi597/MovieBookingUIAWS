describe('MovieBookingApplication', () => {
  it('doing local backend health check', () => {
  
    cy.request({
      url: 'http://localhost:8080/health',
      method: 'GET',
    })
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });

  it('should successfully list all movies', () => {

    cy.visit('http://localhost:3000/');
    cy.get('#allTh').should('have.text', 'Pick your favourite show from below list')
  });


  it('should successfully login user', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[ id="loginId"]').clear().type("ayushtyagi");
    cy.get('input[ id="password"]').clear().type("ayush1234");
    cy.get('button[id="loginButton"]').click()
  });

  it('should successfully logout user', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[ id="loginId"]').clear().type("ayushtyagi");
    cy.get('input[ id="password"]').clear().type("ayush1234");
    cy.get('button[id="loginButton"]').click()
    cy.get('button[id="logoutbtn"]').click()
  });

  it('add new movie', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[ id="loginId"]').clear().type("sumityagi");
    cy.get('input[ id="password"]').clear().type("sumit1234");
    cy.get('button[id="loginButton"]').click()
    cy.get('button[id="addNewMovie"]').click()
    cy.get('input[ id="movieName"]').clear().type("JohnWick");
    cy.get('input[ id="theaterName"]').clear().type("WAVE");
    cy.get('input[ id="availableSeat"]').clear().type(100);
    cy.get("select").select(1)
    cy.get('button[id="addNewMovieBtn"]').click()
  });

  it('edit movie', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[ id="loginId"]').clear().type("sumityagi");
    cy.get('input[ id="password"]').clear().type("sumit1234");
    cy.get('button[id="loginButton"]').click()
    cy.get('button[id="editMovieBtnJohnWick"]').click()
    cy.get('input[ id="noOfTicketsAvailable"]').clear().type("90");
    cy.get('button[id="updateSubmitBtn"]').click()
  });

it('should successfully go to theater list', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button[id="movieListTdJohnWick"]').click()
  });

  it('should successfully go to moviebooking page', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button[id="movieListTdJohnWick"]').click()
    cy.get('button').contains('Book ticket').click()
    cy.get('input[ id="loginId"]').clear().type("ayushtyagi");
    cy.get('input[ id="password"]').clear().type("ayush1234");
    cy.get('button[id="loginButton"]').click()
  });

  it('should successfully book movie ticket', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button[id="movieListTdJohnWick"]').click()
    cy.get('button').contains('Book ticket').click()
    cy.get('input[ id="loginId"]').clear().type("ayushtyagi");
    cy.get('input[ id="password"]').clear().type("ayush1234");
    cy.get('button[id="loginButton"]').click()
    cy.get('input[id="noOfTickets"]').clear().type("1")
    cy.get('input[id="seatNumber"]').clear().type("5")
    cy.get('button[id="submitTicketRequest"]').click()
  });

  it('should successfully go to booked ticket page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[ id="loginId"]').clear().type("ayushtyagi");
    cy.get('input[ id="password"]').clear().type("ayush1234");
    cy.get('button[id="loginButton"]').click()
    cy.get('div[id="bookedTickets"]').click()
  });

  it('edit movie', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[ id="loginId"]').clear().type("sumityagi");
    cy.get('input[ id="password"]').clear().type("sumit1234");
    cy.get('button[id="loginButton"]').click()
    cy.get('button[id="deleteMovieBtnJohnWick"]').click()
    cy.get('button[id="deleteSubmitBtn"]').click()
  });
});