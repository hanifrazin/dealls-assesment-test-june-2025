import { Faker, id_ID } from "@faker-js/faker";

describe(`Register to Dealls as a Mentor`, () => {
    const faker = new Faker({ locale: [id_ID] });
    const input = Cypress.env('dev');
    let lang = Cypress.env('LANGUAGE') || 'idn';
    let dataTalent, userMentor = {};

    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.fixture('data_mentor').then((data) => {
            const fName = faker.person.firstName();
            const lName = faker.person.lastName();
            data.name = `${fName} ${lName}`;
            data.phone = `6285${faker.number.int({min:12222222, max:95557777})}`;
            data.email = faker.internet.email({ firstName: fName.toLowerCase(), lastName: lName.toLowerCase(), provider: 'gmail.com' });
            data.linkedIn = `https://www.linkedin.com/in/${fName.toLowerCase()}${lName.toLowerCase()}/`;
            data.instagram = `https://www.instagram.com/${fName.toLowerCase()}${lName.toLowerCase()}/`;
            dataTalent = data;
        });
        cy.fixture('mentor_user').then((mentor) => {
            userMentor = mentor;
        });
        cy.visit(`${input.url}`);
        cy.get('html').should('have.attr', 'lang').then((language) => {
            cy.log(`${language}`);
            lang = language === 'id' ? 'idn' : 'en';
        });
    });

    it('Onboarding step for new mentor', () => {
        cy.xpath(`//a[normalize-space()='${input[lang].signup}']`).click();
        cy.url().should('include', '/sign-up');
        //click on Job Seeker button
        cy.xpath(`//div[@class="!px-4 mt-6 flex flex-row flex-wrap items-start justify-center gap-4 md:gap-[42px]"]/div[2]//a`).click({ force: true });
        
        //1st step
        cy.url().should('include', '/onboarding?step=1');
        cy.get(`#mentor-onboarding_fullName`).click().type(`${dataTalent.name}`);
        cy.get('#mentor-onboarding_email').click().type(`${dataTalent.email}`);
        cy.get('#mentor-onboarding_whatsapp').click().type(`${dataTalent.phone}`);
        cy.get('#mentor-onboarding_linkedInUrl').click().type(`${dataTalent.linkedIn}`);
        cy.get('#mentor-onboarding_instagramUrl').click().type(`${dataTalent.instagram}`);
        cy.get('button[type="submit"]').click({ force: true });

    });
});