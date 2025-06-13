import { DateTime } from "luxon";

describe(`Booking 1 on 1 Mentoring`, () => {
    let bookingDate = DateTime.now().plus({days:2}).toFormat("cccc LLLL dd 'of' yyyy");
    const base_url = Cypress.env('base_url');
    let lang = Cypress.env('language') || 'idn';
    let input, dataTrainee, mentorAsk = {};

    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        
        cy.fixture('master-user/trainee/trainee_account').then((data) => {
            dataTrainee = data;
        }).then(() => cy.fixture("label_translation"))
          .then(data => input = data)
          .then(() => cy.fixture('master-user/trainee/data_job_seeker'))
          .then(data => mentorAsk = data)
          .then(() => cy.visit(`${base_url}`))
          .then(() => cy.getLang())
          .then((resLang) => {
            lang = resLang === 'id' ? 'idn' : 'en';
            cy.log(`Lang: ${lang}`);
          })  
    });

    it('Login as Trainee and Booking Mentor', () => {
        cy.loginTrainee(input[lang],dataTrainee.username,dataTrainee.password);
        cy.xpath(`//a[text()="Mentoring"]`).should('be.visible').click({force:true});
        cy.url().should('include','/mentoring');
        cy.xpath(`//div[@class="flex border-b border-b-neutral-15"]/a[1]`).click();
        cy.xpath(`//div[@class="swiper-wrapper"]/div[8]`).click({ multiple: true });
        cy.wait(2000)
        cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a//div[text()="Bisa Request"]`)
            .should('be.visible')
            .and('have.length.greaterThan', 0)
            .then(($el) => {
                const total = $el.length;
                const randomNumber = Math.floor(Math.random() * total) + 1;

                cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a[${randomNumber}]`)
                    .should('be.visible')
                    .click();
                cy.wait(2000);
                cy.xpath(`//a[contains(text(), "${input[lang].review}")]`).should('be.visible').click({multiple: true});
            });
        cy.xpath(`//button[text()="Ajukan Jadwal"]`).click({force:true})
        cy.xpath(`(//div[@class="ant-collapse-content-box"])[1]//ul/li`)
            .should('be.visible')
            .and('have.length.greaterThan', 0)
            .then(($el) => {
                const total = $el.length;
                
                if(total === 0){
                    return;
                }else{
                    for(let i=1;i <= total;i++){
                        cy.xpath(`(//div[@class="ant-collapse-content-box"])[1]//ul/li[${i}]/button`).click({multiple:true})
                    }
                }
            });
        cy.xpath(`(//div[@class="ant-collapse-content-box"])[2]//ul/li`)
            .should('be.visible')
            .and('have.length.greaterThan', 0)
            .then(($el) => {
                const total = $el.length;
                
                if(total === 0){
                    return;
                }else{
                    for(let i=1;i <= total;i++){
                        cy.xpath(`(//div[@class="ant-collapse-content-box"])[2]//ul/li[${i}]/button`).click({multiple:true})
                    }
                }
            });
        cy.get(`#mentoring-schedule-topic-request-session-btn`)
            .should('not.be.disabled')
            .and('have.text', input[lang].nextbtn)
            .click({ force: true });
        cy.xpath(`//div[@class="w-full ProposeDateRange_propose_date_range__OxdCX"]//button`).as('propose-date').click().then(() => {
            cy.xpath(`//div[@class="rmdp-day-picker "]//div[contains(@class, 'rmdp-day') and not(contains(@class, 'rmdp-disabled'))]`)
                .should('be.visible')
                .and('have.length.greaterThan', 0)
                .then(($el) => {
                    cy.xpath(`//div[@class="rmdp-day " and @aria-label="Choose ${bookingDate}"]`).click().click();
                    cy.get('@propose-date').click();
                });
        });
        cy.get('#proposedTimes_0_startTime').click().type('20:00');
        cy.get('#proposedTimes_0_endTime').click().type('21:00');
        cy.xpath(`//div[@class="w-full ProposeLocation_propose_location__GN0tO"]//div[@class="ant-select-selector"]`).as('location').click({multiple:true});
        cy.xpath(`//div[@class="rc-virtual-list-holder-inner"]/div`)
            .should('be.visible')
            .and('have.length.greaterThan', 0)
            .then(($el) => {
                const total = $el.length;

                if(total === 0){
                    return;
                }else{
                    for(let i=1;i <= total;i++){
                        cy.xpath(`//div[@class="rc-virtual-list-holder-inner"]/div[${i}]`).click({multiple:true})
                    }
                }  
            });
        cy.get('#notes').click().clear().type(`${mentorAsk.reason}`)
        cy.get('#mentoring-schedule-pick-schedule-request-session-btn').click({force:true});
        cy.xpath(`//div[@id="linkedInChoices"]/div`)
            .should('be.visible')
            .and('have.length.greaterThan', 0)
            .then(($el) => {
                const total = $el.length;

                if(total === 0){
                    return;
                }else{
                    for(let i=1;i <= total;i++){
                        cy.xpath(`//div[@id="linkedInChoices"]/div[${i}]`).click({multiple:true})
                    }
                }  
            });
        cy.get(`#mentoring-schedule-finish-request-session-btn`)
            .should('not.be.disabled')
            .and('have.text', 'Selesai')
            .click({ force: true });    

        cy.contains('Sesi mentoring kamu telah dikirimkan').should('be.visible');
        cy.xpath(`//button[@type="button"]/span[text()="Lihat Detailnya"]`).click({force:true});
        cy.url().should('include','/mentoring/my-session')
        cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-[14px] md:grid-cols-2 lg:mt-6 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-6"]/div`)
            .should('be.visible')
            .and('have.length.greaterThan',0)
    })
});