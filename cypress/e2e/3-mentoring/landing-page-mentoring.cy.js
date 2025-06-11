import { stringify } from "flatted";

const input = Cypress.env('dev');
let lang = Cypress.env('LANGUAGE') || 'idn';

describe('Landing Page Mentoring', () => {
    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.visit(`${input.url}/mentoring`);
        cy.get('html').should('have.attr', 'lang').then((language) => {
            cy.log(`${language}`);
            lang = language === 'id' ? 'idn' : 'en';
        });
    });

    context('List Mentoring Karier', () => {
        beforeEach(() => {
            cy.xpath(`//div[@class="flex border-b border-b-neutral-15"]/a[1]`).click();
        });

        it('should display the mentoring landing page at Karier Tab', () => {
            cy.url().should('include', '/mentoring');
        });

        it('should show the list of accounting mentors at Karier tab', () => {
            cy.xpath(`//div[@class="swiper-wrapper"]/div[2]`).click({ multiple: true });
        });

        it('should show the list of art & design mentors at Karier tab', () => {
            cy.xpath(`//div[@class="swiper-wrapper"]/div[3]`).click({ multiple: true });
        });

        it('should show the list of business mentors at Karier tab', () => {
            cy.xpath(`//div[@class="swiper-wrapper"]/div[4]`).click({ multiple: true });
        });

        it('should show the list of data mentors at Karier tab', () => {
            cy.xpath(`//div[@class="swiper-wrapper"]/div[5]`).click({ multiple: true });
        });

        it('should show the list of finance mentors at Karier tab', () => {
            cy.xpath(`//div[@class="swiper-wrapper"]/div[6]`).click({ multiple: true });
        });

        it('should show the list of HR mentors at Karier tab', () => {
            cy.xpath(`//div[@class="swiper-wrapper"]/div[7]`).click({ multiple: true });
        });

        it('should show the list of IT & Eng mentors at Karier tab', () => {
            cy.xpath(`//div[@class="swiper-wrapper"]/div[8]`).click({ multiple: true });
        });

        it('should show the list of Law & Consulting mentors at Karier tab', () => {
            cy.xpath(`//div[@class="swiper-wrapper"]/div[9]`).click({ multiple: true });
        });

        it('should show the list of Product mentors at Karier tab', () => {
            cy.xpath(`//div[@class="swiper-wrapper"]/div[10]`).click({ multiple: true });
        });

        it('should show the list of Sales & Ops mentors at Karier tab', () => {
            cy.xpath(`//div[@class="swiper-wrapper"]/div[11]`).click({ multiple: true });
        });

        afterEach(() => {
            cy.wait(2000);
        });
    });

    context('List Mentoring Akademik', () => {
        beforeEach(() => {
            cy.xpath(`//div[@class="flex border-b border-b-neutral-15"]/a[2]`).click();
        });

        it('should display the mentoring landing page at Akademik Tab', () => {
            cy.url().should('include', '/mentoring?mTab=academics');
        });

        it('should show the list of Beasiswa S1 mentors at Karier tab', () => {
            cy.xpath(`//div[@class="swiper-wrapper"]//a[contains(text(),"Beasiswa S1")]`).click({ multiple: true });
        });

        it('should show the list of Beasiswa S2 mentors at Karier tab', () => {
            cy.xpath(`//div[@class="swiper-wrapper"]//a[contains(text(),"Beasiswa S2")]`).click({ multiple: true });
        });

        it('should show the list of IISMA/ Exchange mentors at Karier tab', () => {
            cy.xpath(`//div[@class="swiper-wrapper"]//a[contains(text(),"SMA")]`).click({ multiple: true });
        });

        it('should show the list of Internship mentors at Karier tab', () => {
            cy.xpath(`//div[@class="swiper-wrapper"]//a[contains(text(),"Internship")]`).click({ multiple: true });
        });

        it('should show the list of Leadership Program mentors at Karier tab', () => {
            cy.xpath(`//div[@class="swiper-wrapper"]//a[contains(text(),"Leadership")]`).click({ multiple: true });
        });

        it('should show the list of Study Abroad mentor at Karier tab', () => {
            cy.xpath(`//div[@class="swiper-wrapper"]//a[contains(text(),"Study Abroad")]`).click({ multiple: true });
        });

        afterEach(() => {
            cy.wait(2000);
        });
    });

    describe('Search, and View Mentors', () => {
        let akademik, karier = {};
        beforeEach(() => {
            cy.fixture("keyword_search").then((data) => {
                karier = data.karier;
                akademik = data.akademik;
            });
        })

        context('Search Mentors at Karier tab',() => {
            it('should be search mentors by name at Karier tab', () => {
                cy.xpath(`//input[@id="searchMentor"]`).click({force:true}).type(`${karier.name}`);
                cy.wait(2000);
                cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a//h4`)
                .should('have.length.greaterThan', 0)
                .then(($el) => {
                        const found = [...$el].some(el => el.innerText.trim().includes(`${karier.name}`));
                        cy.log(`mentor karier found: ${[...$el].map(el => el.innerText.trim()).join(', ')}`);
                        expect(found).to.be.true;
                });
            });

            it('should be search mentors by company at Karier tab', () => {
                cy.xpath(`//input[@id="searchMentor"]`).click({force:true}).type(`${karier.company}`);
                cy.wait(2000);
                cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a/div[2]/div[2]/div[2]/div`)
                .should('have.length.greaterThan', 0)
                .then(($el) => {
                        const found = [...$el].some(el => el.innerText.trim().includes(`${karier.company}`));
                        cy.log(`company found: ${[...$el].map(el => el.innerText.trim()).join(', ')}`);
                        expect(found).to.be.true;
                });
            });

            it('should be search mentors by role at Karier tab', () => {
                cy.xpath(`//input[@id="searchMentor"]`).click({force:true}).type(`${karier.role}`);
                cy.wait(2000);
                cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a/div[2]/div[2]/div[1]/div`)
                .should('have.length.greaterThan', 0)
                .then(($el) => {
                        const found = [...$el].some(el => el.innerText.trim().includes(`${karier.role}`));
                        cy.log(`role found: ${[...$el].map(el => el.innerText.trim()).join(', ')}`);
                        expect(found).to.be.true;
                });
            });

            it('should be search mentors by industries at Karier tab', () => {
                cy.xpath(`//input[@id="searchMentor"]`).click({force:true}).type(`${karier.industry}`);
                cy.wait(2000);
                cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a`)
                .should('have.length.greaterThan', 0)
            });

            it('should be search mentors by university at Karier tab', () => {
                cy.xpath(`//input[@id="searchMentor"]`).click({force:true}).type(`${karier.university}`);
                cy.wait(2000);
                cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a`)
                .should('have.length.greaterThan', 0)
            });

            it('should be search mentors by major / jurusan at Karier tab', () => {
                cy.xpath(`//input[@id="searchMentor"]`).click({force:true}).type(`${karier.jurusan}`);
                cy.wait(2000);
                cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a`)
                .should('have.length.greaterThan', 0)
            });

            it('should be search mentors by topic at Karier tab', () => {
                cy.xpath(`//input[@id="searchMentor"]`).click({force:true}).type(`${karier.topics}`);
                cy.wait(2000);
                cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a//div[@class="rc-overflow"]//p`)
                .should('have.length.greaterThan', 0)
                .then(($el) => {
                        const found = [...$el].some(el => el.innerText.trim().includes(`${karier.topics}`));
                        cy.log(`topic found: ${[...$el].map(el => el.innerText.trim()).join(', ')}`);
                        expect(found).to.be.true;
                });
            });
        });

        context('Search Mentors at Akademik tab',() => {
            beforeEach(() => {
                cy.xpath(`//div[@class="flex border-b border-b-neutral-15"]/a[2]`).click();
            });
            it('should be search mentors by name at Akademik tab', () => {
                cy.xpath(`//input[@id="searchMentor"]`).click({force:true}).type(`${akademik.name}`);
                cy.wait(2000);
                cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a//h4`)
                .should('have.length.greaterThan', 0)
                .then(($el) => {
                        const found = [...$el].every(el => el.innerText.trim().includes(`${akademik.name}`));
                        cy.log(`mentor akademik found: ${[...$el].map(el => el.innerText.trim()).join(', ')}`);
                        expect(found).to.be.true;
                });
            });

            it('should be search mentors by company at Akademik tab', () => {
                cy.xpath(`//input[@id="searchMentor"]`).click({force:true}).type(`${akademik.company}`);
                cy.wait(2000);
                cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a`)
                .should('have.length.greaterThan', 0)
            });

            it('should be search mentors by role at Akademik tab', () => {
                cy.xpath(`//input[@id="searchMentor"]`).click({force:true}).type(`${akademik.role}`);
                cy.wait(2000);
                cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a`)
                .should('have.length.greaterThan', 0)
            });

            it('should be search mentors by industries at Akademik tab', () => {
                cy.xpath(`//input[@id="searchMentor"]`).click({force:true}).type(`${akademik.industry}`);
                cy.wait(2000);
                cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a`)
                .should('have.length.greaterThan', 0)
            });

            it('should be search mentors by university at Akademik tab', () => {
                cy.xpath(`//input[@id="searchMentor"]`).click({force:true}).type(`${akademik.university}`);
                cy.wait(2000);
                cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a/div[2]/div[2]/div[2]/div`)
                .should('have.length.greaterThan', 0)
                .then(($el) => {
                    const found = [...$el].some(el => el.innerText.trim().includes(`${akademik.university}`));
                    expect(found).to.be.true;
                    cy.log(`university found: ${[...$el].map(el => el.innerText.trim()).join(', ')}`);
                });
            });

            it('should be search mentors by major / jurusan at Akademik tab', () => {
                cy.xpath(`//input[@id="searchMentor"]`).click({force:true}).type(`${akademik.jurusan}`);
                cy.wait(2000);
                cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a/div[2]/div[2]/div[1]/div`)
                .should('have.length.greaterThan', 0)
                .then(($el) => {
                    const found = [...$el].some(el => el.innerText.trim().includes(`${akademik.jurusan}`));
                    expect(found).to.be.true;
                    cy.log(`jurusan found: ${[...$el].map(el => el.innerText.trim()).join(', ')}`);
                });
            });

            it('should be search mentors by topic at Akademik tab', () => {
                cy.xpath(`//input[@id="searchMentor"]`).click({force:true}).type(`${akademik.topics}`);
                cy.wait(2000);
                cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a//div[@class="rc-overflow"]//p`)
                .should('have.length.greaterThan', 0)
                .then(($el) => {
                    const found = [...$el].some(el => el.innerText.trim().includes(`${akademik.topics}`));
                    expect(found).to.be.true;
                    cy.log(`topic found: ${[...$el].map(el => el.innerText.trim()).join(', ')}`);
                });
            });
        });

        context('View Mentor Details', () => {
            it('view detail mentor at Karier tab', () => {
                cy.xpath(`//input[@id="searchMentor"]`).click({force:true}).type(`${karier.company}`);
                cy.wait(2000);
                cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a`)
                    .should('have.length.greaterThan', 0)
                    .then(($el) => {
                        const total = $el.length;
                        const randomNumber = Math.floor(Math.random() * total) + 1;

                        cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a[${randomNumber}]`)
                            .should('be.visible')
                            .click();
                        cy.xpath(`//a[contains(text(), "${input[lang].review}")]`).should('be.visible').click({multiple: true});
                    });
            });

            it('view detail mentor at Akademik tab', () => {
                cy.xpath(`//div[@class="flex border-b border-b-neutral-15"]/a[2]`).click();
                cy.xpath(`//input[@id="searchMentor"]`).click({force:true}).type(`${akademik.topics}`);
                cy.wait(2000);
                cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a//h4`)
                    .should('have.length.greaterThan', 0)
                    .then(($el) => {
                        const total = $el.length;
                        const randomNumber = Math.floor(Math.random() * total) + 1;

                        cy.xpath(`//div[@class="mt-4 grid grid-cols-1 gap-y-4 lg:mt-6 lg:grid-cols-4 lg:gap-x-[22px] lg:gap-y-5"]/a[${randomNumber}]`)
                            .should('be.visible')
                            .click();
                        cy.xpath(`//a[contains(text(), "${input[lang].review}")]`).should('be.visible').click({multiple: true});
                    });
            });
        });
    });  
})