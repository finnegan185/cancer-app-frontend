describe("TestSuite", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("confirms homepage exists and has a title", () => {
    cy.contains("University of Zack");
  });

  it("navigates to all trials", () => {
    cy.get('[data-cy="all-trials"]').click();

    cy.url().should("include", "/all-trials");

    cy.contains("NRCC2201").should("be.visible");
  });

  it("clicks logo to go home", () => {
    cy.visit("http://localhost:3000/all-trials");
    cy.url().should("include", "/all-trials");

    cy.get('[data-cy="logoToHome"]').click();
    cy.contains("University of Zack");
  });

  it("clicks on Find Competing Trial tooltip", () => {
    cy.get('[data-cy="find-trials"]').click();
    cy.get('[data-cy="find-trials-tooltip-icon"]').click();
    cy.get('[data-cy="find-trials-tooltip-text"]').should("be.visible");
  });

  it("finds competing trials for HNSCC, locally advanced & recurrent, second line & needs measurable", () => {
    cy.get('[data-cy="find-trials"]').click();

    cy.get('[data-cy="typeSelector"]').click().should("be.visible", "Head and Neck Squamous Cell Carcinoma").get('ul > li[data-value="Head and Neck Squamous Cell Carcinoma"]').click();
    cy.get(".MuiPopover-root").click("topRight");

    cy.get('[data-cy="stageSelector"]').click().get('ul > li[data-value="Recurrent"]').click().get('ul > li[data-value="Locally Advanced"]').click();
    cy.get(".MuiPopover-root").click("topRight");

    cy.get('[data-cy="lineSelector"]').click().get('ul > li[data-value="Second"]').click();
    cy.get(".MuiPopover-root").click("topRight");

    cy.get('[data-cy="measurable-switch"]').should("be.visible").click();

    cy.contains("2 Competing Trials").should("be.visible");
    cy.contains("NRCC2208").should("be.visible");
    cy.contains("NRCC2209").should("be.visible");
  });

  it("finds nothing", () => {
    cy.get('[data-cy="find-trials"]').click();

    // Select Prostate and Non-Small Cell Lung Cancer from the Disease Type drop down
    cy.get('[data-cy="typeSelector"]').click().should("be.visible", "Non-Small Cell Lung Cancer");
    cy.get('ul > li[data-value="Non-Small Cell Lung Cancer"]').click();
    cy.get('ul > li[data-value="Prostate"]').click();
    cy.get(".MuiPopover-root").click("topRight");
    // Assert what the result should be
    cy.contains("4 Competing Trials").should("be.visible");
    cy.contains("NRCC2223").should("be.visible");

    // Select Metastatic from  the Disease Stage drop down
    cy.get('[data-cy="stageSelector"]').click().should("be.visible", "Metastatic").get('ul > li[data-value="Metastatic"]').click();
    cy.get(".MuiPopover-root").click("topRight");
    // Assert what the result should be
    cy.contains("4 Competing Trials").should("be.visible");
    cy.contains("NRCC2223").should("be.visible");

    // Select Castration Resistant from the Disease Mutation drop down
    cy.get('[data-cy="mutationSelector"]').click().should("be.visible", "Castration Resistant").get('ul > li[data-value="Castration Resistant"]').click();
    cy.get(".MuiPopover-root").click("topRight");
    // Assert what the result should be
    cy.contains("2 Competing Trials").should("be.visible");
    cy.contains("NRCC2238").should("be.visible");
    cy.contains("NRCC2246").should("be.visible");

    // Select No standard of care options from the Line of Therapy drop down
    cy.get('[data-cy="lineSelector"]').click().should("be.visible", "No standard of care options").get('ul > li[data-value="No standard of care options"]').click();
    cy.get(".MuiPopover-root").click("topRight");
    // Assert what the result should be
    cy.contains("Congratulations! No Competing Trials").should("be.visible");

    // Select > 3 Months from the Life Expectancy drop down
    cy.get('[data-cy="expectancySelector"]').click().should("be.visible", "> 3 Months").get('ul > li[data-value="> 3 Months"]').click();
    cy.get(".MuiPopover-root").click("topRight");
    // Assert what the result should be
    cy.contains("Congratulations! No Competing Trials").should("be.visible");
  });
});
