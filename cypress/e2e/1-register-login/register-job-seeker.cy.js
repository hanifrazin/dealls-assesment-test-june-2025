import { Faker, id_ID } from "@faker-js/faker";

describe('Register to Dealls as Job Seeker', () => {
    const faker = new Faker({ locale: [id_ID] });
    const base_url = Cypress.env('base_url');
    let lang = Cypress.env('language') || 'idn';
    let input = {};
    let dataTalent, userJob, userMentor = {};

    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();

        // Step 1: Ambil data dan siapkan faker untuk dataTalent
        cy.fixture('data_job_seeker').then((data) => {
            const fName = faker.person.firstName();
            const lName = faker.person.lastName();

            data.name = `${fName} ${lName}`;
            data.phone = `6285${faker.number.int({ min: 11111111, max: 99999999 })}`;
            data.email = faker.internet.email({
            firstName: fName.toLowerCase(),
            lastName: lName.toLowerCase(),
            provider: 'gmail.com'
            });
            data.linkedIn = `https://www.linkedin.com/in/${fName.toLowerCase()}-${lName.toLowerCase()}/`;

            dataTalent = data;
        })

        // Step 2: Ambil user data lainnya (berurutan, chaining pakai then)
        .then(() => cy.fixture('job_seeker_user'))
        .then((user) => {
            userJob = user;
        })

        .then(() => cy.fixture('mentor_user'))
        .then((mentor) => {
            userMentor = mentor;
        })

        .then(() => cy.fixture('label_translation'))
        .then((label) => {
            input = label;
        })

        // Step 3: Kunjungi halaman dan ambil bahasa
        .then(() => cy.visit(base_url))
        .then(() => cy.getLang())
        .then((resLang) => {
            lang = resLang === 'id' ? 'idn' : 'en';
            cy.log(`Lang: ${lang}`);
        });
    });
    
    it('Onboarding step for new user job seeker', () => {
        cy.xpath(`//a[normalize-space()='${input[lang].signup}']`).click();
        cy.url().should('include', '/sign-up');
        //click on Job Seeker button
        cy.xpath(`//div[@class="!px-4 mt-6 flex flex-row flex-wrap items-start justify-center gap-4 md:gap-[42px]"]/div[1]//a`).click({ force: true });
        
        //1st step
        cy.url().should('include','/onboarding');
        cy.get('#fullName').click().type(`${dataTalent.name}`);
        cy.get('button[type="submit"]').click({ force: true });
        
        //2nd step
        cy.url().should('include','/onboarding?step=2');
        cy.get('#jobSearchStatus').click();
        cy.xpath(`(//div[@class="rc-virtual-list-holder-inner"])[1]/div`)
            .should('have.length', 3)
            .then((elements) => {
                const randomIndex = Math.floor(Math.random() * elements.length) + 1;
                cy.xpath(`//div[@class="rc-virtual-list-holder-inner"]/div[${randomIndex}]`).click();
            });
        cy.get('#whatsapp').click().type(`${dataTalent.phone}`);
        cy.get('#email').click().type(`${dataTalent.email}`);
        cy.get('#linkedInUrl').click().type(`${dataTalent.linkedIn}`);
        cy.get('#campus').click().type(`${dataTalent.lastEducation}`);
        cy.get(`button[type="button"]`).then((elements) => {
            const index = [...elements].findIndex((el) => el.innerText.trim().includes(dataTalent.lastEducation))
            cy.log(`${index}`);
            cy.xpath(`(//button[@type="button"])[${index + 1}]`).click({ force: true });
            cy.xpath(`//span[@class="ant-select-selection-item" and @title="${dataTalent.lastEducation}"]`)
                .should('be.visible')
                .and('contain.text', dataTalent.lastEducation);
        });
        cy.get('#eligibility').click({multiple: true});
        cy.xpath(`(//div[@class="rc-virtual-list-holder-inner"])[2]/div`)
            .should('have.length.greaterThan', 4)
            .then((elements) => {
                const randomIndex = Math.floor(Math.random() * elements.length) + 1;
                cy.xpath(`(//div[@class="rc-virtual-list-holder-inner"])[2]/div[${randomIndex}]`).click({force: true});
            });
        cy.xpath(`//button[@type="submit"]`)
            .should('not.be.disabled')
            .and('have.text', input[lang].nextbtn)
            .click({ force: true });
        cy.wait(1000);

        //3rd step
        cy.url().should('include','/onboarding?step=3');
        cy.xpath("//button[p[contains(text(),'Skip for now, my CV is not ready')] and p[contains(text(),'Fill in your experience directly')]]").click({multiple: true});
        cy.xpath(`//button[@type="submit"]`)
            .should('not.be.disabled')
            .and('have.text', input[lang].nextbtn)
            .click({ force: true });
        cy.wait(1000);

        //4th step
        cy.url().should('include','/onboarding?step=4');
        // tab kerja
        cy.xpath(`//button[span[contains(text(),"${input[lang].work}")]]`).click({ force: true });
        cy.get(`#companyName`).click().type(`${dataTalent.work_exp.company}`);
        cy.get(`button[type="button"]`).then((elements) => {
            const index = [...elements].findIndex((el) => el.innerText.trim().includes(dataTalent.work_exp.company))
            cy.log(`${index}`);
            cy.xpath(`(//button[@type="button"])[${index + 1}]`).click({ force: true });
            cy.xpath(`//span[@class="ant-select-selection-item" and @title="${dataTalent.work_exp.company}"]`)
        });
        cy.get(`#roleLevel`).click().type(`${dataTalent.work_exp.level}`);
        cy.get(`button[type="button"]`).then((elements) => {
            const index = [...elements].findIndex((el) => el.innerText.trim().includes(dataTalent.work_exp.level))
            cy.log(`${index}`);
            cy.xpath(`(//button[@type="button"])[${index + 1}]`).click({ force: true });
            cy.xpath(`//span[@class="ant-select-selection-item" and @title="${dataTalent.work_exp.level}"]`)
        });
        cy.get(`#roleName`).click().type(`${dataTalent.work_exp.role}`);
        cy.get(`button[type="button"]`).then((elements) => {
            const index = [...elements].findIndex((el) => el.innerText.trim().includes(dataTalent.work_exp.role))
            cy.log(`${index}`);
            cy.xpath(`(//button[@type="button"])[${index + 1}]`).click({ force: true });
            cy.xpath(`//span[@class="ant-select-selection-item" and @title="${dataTalent.work_exp.role}"]`)
        });
        cy.get(`#startDate`).click().type(`${dataTalent.work_exp.dateStart}`);
        cy.get(`#endDate`).click().type(`${dataTalent.work_exp.dateEnd}`);
        cy.xpath(`//button[@type="submit"]`)
            .should('not.be.disabled')
            .and('have.text', input[lang].nextbtn)
            .click({ force: true });
        cy.wait(1000);

        //5th step
        cy.url().should('include','/onboarding?step=5');
        cy.xpath(`//button[@type="submit"]`)
            .should('not.be.disabled')
            .and('have.text', input[lang].nextbtn)
            .click({ force: true });
        cy.wait(1000);

        //6th step
        cy.url().should('include','/onboarding?step=6');
        cy.get(`#password`).click().type('password');
        cy.get(`#passwordConfirmation`).type('password');
        cy.get(`#checkPrivacyPolicy`).check();
        cy.then(() => {
            const user = {
                username: dataTalent.email,
                password: 'password',
            }

            cy.writeFile('cypress/fixtures/job_seeker_user.json', user);
        });
        cy.get(`#dealls-onboarding-finish`)
            .should('not.be.disabled')
            .and('have.text', input[lang].finishbtn)
            .click({ force: true });

        //welcome user
        cy.url().should('include', '/?welcome=true');
        cy.xpath(`//button[@type="button" and @aria-label="Close"]`).click({force:true});
    });

    it('Login with Job Seeker account', () => {
        cy.xpath(`//a[normalize-space()='${input[lang].login}']`).click();
        cy.url().should('include', '/sign-in');
        cy.get(`#basic_email`).click().type(`${userJob.username}`);
        cy.get(`#basic_password`).click().type(`${userJob.password}`);
        cy.xpath(`//button[@type="submit"]`).click({ force: true });
    });

    afterEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });
});