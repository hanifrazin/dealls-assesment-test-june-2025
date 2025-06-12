import { Faker, id_ID } from "@faker-js/faker";

describe(`Register to Dealls as a Mentor`, () => {
    const faker = new Faker({ locale: [id_ID] });
    const base_url = Cypress.env('base_url');
    let lang = Cypress.env('language') || 'idn';
    let input, dataMentor, userMentor, aboutMe = {};

    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.fixture('master-user/mentor/data_mentor').then((data) => {
            const fName = faker.person.firstName();
            const lName = faker.person.lastName();
            data.name = `${fName} ${lName} Mentortest`;
            data.phone = `6285${faker.number.int({min:12222222, max:95557777})}`;
            data.email = faker.internet.email({ firstName: fName.toLowerCase(), lastName: `${lName.toLowerCase()}-mentortest`, provider: 'gmail.com' });
            data.linkedIn = `https://www.linkedin.com/in/${fName.toLowerCase()}${lName.toLowerCase()}/`;
            data.instagram = `https://www.instagram.com/${fName.toLowerCase()}${lName.toLowerCase()}/`;
            dataMentor = data;

            aboutMe = dataMentor.aboutMe
                        .replace('{{name}}', dataMentor.name)
                        .replace('{{institution}}', dataMentor.edu.institution)
                        .replace('{{major}}', dataMentor.edu.major)
                        .replace('{{company}}',dataMentor.work_exp.company)
                        .replace('{{level}}', dataMentor.work_exp.level)
                        .replace('{{role}}', dataMentor.work_exp.role);
        }).then(() => cy.fixture('master-user/mentor/mentor_account'))
          .then(mentor => userMentor = mentor)
          .then(() => cy.visit(`${base_url}`))
          .then(() => cy.getLang())
          .then(resLang => lang = resLang === 'id' ? 'idn' : 'en')
          .then(() => cy.fixture('label_translation'))
          .then(data => input = data);
    });

    it('Onboarding step for new mentor', () => {
        cy.xpath(`//a[normalize-space()='${input[lang].signup}']`).click();
        cy.url().should('include', '/sign-up');
        //click on Job Seeker button
        cy.xpath(`//div[@class="!px-4 mt-6 flex flex-row flex-wrap items-start justify-center gap-4 md:gap-[42px]"]/div[2]//a`).click({ force: true });
        
        //1st step
        cy.url().should('include', '/onboarding?step=1');
        cy.get(`#mentor-onboarding_fullName`).click().type(`${dataMentor.name}`);
        cy.get('#mentor-onboarding_email').click().type(`${dataMentor.email}`);
        cy.get('#mentor-onboarding_whatsapp').click().type(`${dataMentor.phone}`);
        cy.get('#mentor-onboarding_linkedInUrl').click().type(`${dataMentor.linkedIn}`);
        cy.get('#mentor-onboarding_instagramUrl').click().type(`${dataMentor.instagram}`);
        cy.get('button[type="submit"]').click({ force: true });

        //2nd step
        cy.url().should('include', '/onboarding?step=2');
        cy.xpath(`//button//h1[normalize-space()="${input[lang].careerbtn}"]`).should('be.visible').click({multiple:true});
        cy.get(`#expertise-list-form_careerPanels_0_category`).click().then(() => {
            cy.get('.ant-select-dropdown').should('not.have.class', 'ant-select-dropdown-hidden');
            cy.xpath(`//div[@class="rc-virtual-list"]//div[@title="IT & Engineering"]`).should('be.visible').click({multiple:true}).then(() => {
                cy.xpath(`//div[@class="space-y-[3px]"]//span[text()="QA / Test Engineer"]`)
                    .scrollIntoView()
                    .should('be.visible')
                    .click({multiple:true});
            });
        });
        cy.xpath(`//button//span[text()="${input[lang].nextbtn}"]`).click({force:true})

        //3rd step
        cy.url().should('include', '/onboarding?step=3');
        cy.get(`#companyName`).click().type(`${dataMentor.work_exp.company}`).then(() => {
            cy.get(`button[type="button"]`).then((elements) => {
                const index = [...elements].findIndex((el) => el.innerText.trim().includes(dataMentor.work_exp.company))
                cy.log(`${index}`);
                cy.xpath(`(//button[@type="button"])[${index + 1}]`).click({ force: true });
                cy.xpath(`//span[@class="ant-select-selection-item" and @title="${dataMentor.work_exp.company}"]`)
            });
        });
        cy.xpath(`(//span[@class="ant-select-selection-search"])[2]/input`).click().type(`${dataMentor.work_exp.industry}`).then(() => {
            cy.get(`button[type="button"]`).then((elements) => {
                const index = [...elements].findIndex((el) => el.innerText.trim().includes(dataMentor.work_exp.industry))
                cy.log(`${index}`);
                cy.xpath(`(//button[@type="button"])[${index + 1}]`).click({ force: true });
                cy.xpath(`//span[@class="ant-select-selection-item" and @title="${dataMentor.work_exp.industry}"]`)
            });
        });
        cy.get(`#roleLevel`).click().type(`${dataMentor.work_exp.level}`).then(() => {
            cy.get(`button[type="button"]`).then((elements) => {
                const index = [...elements].findIndex((el) => el.innerText.trim().includes(dataMentor.work_exp.level))
                cy.log(`${index}`);
                cy.xpath(`(//button[@type="button"])[${index + 1}]`).click({ force: true });
                cy.xpath(`//span[@class="ant-select-selection-item" and @title="${dataMentor.work_exp.level}"]`)
            });
        });
        cy.get(`#roleName`).click().type(`${dataMentor.work_exp.role}`).then(() => {
            cy.get(`button[type="button"]`).then((elements) => {
                const index = [...elements].findIndex((el) => el.innerText.trim().includes(dataMentor.work_exp.role))
                cy.log(`${index}`);
                cy.xpath(`(//button[@type="button"])[${index + 1}]`).click({ force: true });
                cy.xpath(`//span[@class="ant-select-selection-item" and @title="${dataMentor.work_exp.role}"]`)
            });
        })
        cy.get(`#startDate`).click().type(`${dataMentor.work_exp.dateStart}`)
        cy.xpath(`//div[@id="currentlyOccupied"]//input`).check();
        cy.xpath(`//button//span[text()="${input[lang].nextbtn}"]`).click({force:true});

        //4th step
        cy.url().should('include','/onboarding?step=4');
        cy.get(`#institution`).click().type(`${dataMentor.edu.insitution}`).then(() => {
            cy.get(`button[type="button"]`).then((elements) => {
                const index = [...elements].findIndex((el) => el.innerText.trim().includes(dataMentor.edu.insitution))
                cy.log(`${index}`);
                cy.xpath(`(//button[@type="button"])[${index + 1}]`).click({ force: true });
                cy.xpath(`//span[@class="ant-select-selection-item" and @title="${dataMentor.edu.insitution}"]`)
            });
        });
        cy.get(`#major`).click().type(`${dataMentor.edu.major}`);
        cy.get(`#startDate`).click().type(`${dataMentor.edu.startDate}`);
        cy.get(`#endDate`).click().type(`${dataMentor.edu.endDate}`);
        cy.xpath(`//button//span[text()="${input[lang].nextbtn}"]`).click({force:true});

        //5th step
        cy.url().should('include','/onboarding?step=5');
        cy.get(`#aboutMe`).type(`${aboutMe}`);
        cy.xpath(`//button//span[text()="${input[lang].nextbtn}"]`).click({force:true});

        //6th step
        cy.url().should('include','/onboarding?step=6');
        cy.xpath(`//div[@id="linkedInChoices"]//input`).click({multiple:true});
        cy.xpath(`//button//span[text()="Next"]`).click({force:true});

        //7th step
        cy.url().should('include','/onboarding?step=7');
        cy.get('#password').click().type('M3nTorP@ss')
        cy.get('#confirmPassword').click().type('M3nTorP@ss')
        cy.get('#checkPrivacyPolicy').check({force:true}).then(() => {
            const mentor = {
                name: dataMentor.name,
                username: dataMentor.email,
                password: 'M3nTorP@ss',
            }

            cy.writeFile('cypress/fixtures/master-user/mentor/mentor_account.json', mentor);
        })
        cy.get(`#mentoring-onboarding-finish-btn`)
            .should('not.be.disabled')
            .and('have.text', 'Selesai')
            .click({ force: true });

        //welcome user
        cy.url().should('include', '/mentoring');
        cy.xpath(`//button[@type="button" and @aria-label="Close"]`).click({force:true});
    });

    it('Login with Mentor account', () => {
        cy.xpath(`//a[normalize-space()='${input[lang].login}']`).click();
        cy.url().should('include', '/sign-in');
        cy.get(`#basic_email`).click().type(`${userMentor.username}`);
        cy.get(`#basic_password`).click().type(`${userMentor.password}`);
        cy.xpath(`//button[@type="submit"]`).click({ force: true });
        cy.contains("Cari Lowongan Kerja Pakai Dealls ").should('be.visible');
    });

    afterEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });
});