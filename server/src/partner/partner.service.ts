import {BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import {ParsePassportsDto} from "./dto/parse-passports.dto";
import {PassportService} from "../passport/passport.service";
import {RequestService} from "../request/request.service";
import {ParsePassportDto} from "./dto/parse-passport.dto";
import {GetPassportsPagesCountDto} from "./dto/get-passports-pages-count.dto";
import {ParseRequestDto} from "./dto/parse-request.dto";
import {CustomerCompanyService} from "../customer-company/customer-company.service";
import {CustomerCompanyMappers} from "../customer-company/mappers/customer-company.mappers";
import {RequestMappers} from "../request/mappers/request.mappers";
import {PassportMappers} from "../passport/mappers/passport.mappers";
import {CustomerUserService} from "../customer-user/customer-user.service";
import {CustomerUserMappers} from "../customer-user/mappers/customer-user.mappers";
import {ParseRequestsDto} from "./dto/parse-requests.dto";
import {GetRequestsPagesCountDto} from "./dto/get-requests-pages-count.dto";
import {Builder, By, until} from "selenium-webdriver";
import {ConfigService} from "@nestjs/config";
import {Options} from "selenium-webdriver/chrome";
const XLSX = require('xlsx');
const JS_XLSX = require('js-xlsx');
const { htmlToText } = require('html-to-text');


@Injectable()
export class PartnerService {
    constructor(
        private readonly passportService: PassportService,
        private readonly requestService: RequestService,
        private readonly customerCompanyService: CustomerCompanyService,
        private readonly customerUserService: CustomerUserService,
        private readonly configService: ConfigService,
    ) {
    }

    async getTokens() {
        const options = new Options()
        options.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage")
        const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
        try {
            await driver.get("https://partner.urfu.ru");
            const loginButton = driver.wait(
                until.elementLocated(By.className('login-btn')),
                5000
            );
            await loginButton.click();
            await driver.findElement(By.id('username')).sendKeys(this.configService.get("LOGIN"));
            await driver.findElement(By.id('password')).sendKeys(this.configService.get("PASSWORD"));
            await driver.findElement(By.id('kc-login')).click();
            await driver.sleep(5000);
            const key = await driver.manage().getCookie('key');
            const session = await driver.manage().getCookie('session-cookie');
            return {
                token: key.value,
                session_cookie: session.value
            }
        } catch (error) {
            console.error('Failed to open website:', error);
        } finally {
            await driver.quit();
        }
    }

    async parseRequests(parseRequestsDto: ParseRequestsDto) {
        let myHeaders = new Headers();
        myHeaders.append("Cookie", "session-cookie=" + parseRequestsDto.session_cookie + ";key=" + parseRequestsDto.token);

        let requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let pagesCount = await this.getRequestsPagesCount({...parseRequestsDto, semester: "2023-1"});
        console.log("Pages count: ", pagesCount)

        for (let i = 1; i < (pagesCount + 1); i++) {
            console.log("Page: ", i)
            try {
                let currentRequestsResponse = await fetch(
                    "https://partner.urfu.ru/learning/request/?mode=requests&semester=2023-1&own=me&page=" + i,
                    requestOptions
                )

                let currentRequests = await currentRequestsResponse.json();

                for (let request of currentRequests.results) {
                    let currentRequest = await this.parseRequest({
                        ...parseRequestsDto,
                        id: request.id
                    })


                    if (!await this.customerCompanyService.isCreate(currentRequest.partner.id)) {
                        // Компании заказчика не существует
                        console.log("Create customer company")
                        await this.customerCompanyService.create(
                            CustomerCompanyMappers.partnerToCreateAndUpdateDto(currentRequest.partner)
                        )
                    } else {
                        console.log("Update customer company")
                        await this.customerCompanyService.update(
                            currentRequest.partner.id,
                            CustomerCompanyMappers.partnerToCreateAndUpdateDto(currentRequest.partner)
                        )
                    }

                    if (!await this.customerUserService.isCreate(currentRequest.manager.id)) {
                        // Заказчика не существует
                        console.log("Create customer user")
                        await this.customerUserService.create(
                            CustomerUserMappers.toCreateDto(currentRequest.manager)
                        )
                    } else {
                        console.log("Update customer user")
                        await this.customerUserService.update(
                            currentRequest.manager.id,
                            CustomerUserMappers.toUpdateDto(currentRequest.manager)
                        )
                    }

                    if (!await this.requestService.isCreate(currentRequest.id)) {
                        // Заявки не существует
                        console.log("Create request")
                        await this.requestService.create(
                            RequestMappers.toCreateDto(currentRequest)
                        )
                    } else {
                        console.log("Update request")
                        await this.requestService.update(
                            currentRequest.id,
                            RequestMappers.toUpdateDto(currentRequest)
                        )
                    }
                }
            } catch (error) {
                throw new BadRequestException(error)
            }
        }
        console.log("End of parse requests")
    }

    async parsePassports(parsePassportsDto: ParsePassportsDto) {
        let myHeaders = new Headers();
        myHeaders.append("Cookie", "session-cookie=" + parsePassportsDto.session_cookie + ";key=" + parsePassportsDto.token);

        let requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let pagesCount = await this.getPassportsPagesCount({...parsePassportsDto, semester: "2023-1"});
        console.log("Pages count: ", pagesCount)


        for (let i = 1; i < (pagesCount + 1); i++) {
            try {
                let currentPassportsResponse = await fetch(
                    "https://partner.urfu.ru/learning/request/?mode=projects&semester=2023-1&own=me&page=" + i,
                    requestOptions
                )

                let currentPassports = await currentPassportsResponse.json();

                for (let passport of currentPassports.results) {
                    let currentPassport = await this.parsePassport({...parsePassportsDto, id: passport.id})
                    let currentRequest = await this.parseRequest({
                        ...parsePassportsDto,
                        id: currentPassport.source.id
                    })

                    if (!await this.customerCompanyService.isCreate(currentRequest.partner.id)) {
                        // Компании заказчика не существует
                        console.log("Create customer company")
                        await this.customerCompanyService.create(
                            CustomerCompanyMappers.partnerToCreateAndUpdateDto(currentRequest.partner)
                        )
                    } else {
                        console.log("Update customer company")
                        await this.customerCompanyService.update(
                            currentRequest.partner.id,
                            CustomerCompanyMappers.partnerToCreateAndUpdateDto(currentRequest.partner)
                        )
                    }

                    if (!await this.customerUserService.isCreate(currentRequest.manager.id)) {
                        // Заказчика не существует
                        console.log("Create customer user")
                        await this.customerUserService.create(
                            CustomerUserMappers.toCreateDto(currentRequest.manager)
                        )
                    } else {
                        console.log("Update customer user")
                        await this.customerUserService.update(
                            currentRequest.manager.id,
                            CustomerUserMappers.toUpdateDto(currentRequest.manager)
                        )
                    }

                    if (!await this.requestService.isCreate(currentRequest.id)) {
                        // Заявки не существует
                        console.log("Create request")
                        await this.requestService.create(
                            RequestMappers.toCreateDto(currentRequest)
                        )
                    } else {
                        console.log("Update request")
                        await this.requestService.update(
                            currentRequest.id,
                            RequestMappers.toUpdateDto(currentRequest)
                        )
                    }

                    if (!await this.passportService.isCreate(passport.id)) {
                        console.log("Create passport")
                        // Паспорта не существует
                        await this.passportService.create(
                            PassportMappers.toCreateDto(currentPassport)
                        )
                    } else {
                        console.log("Update passport")
                        await this.passportService.update(
                            currentPassport.id,
                            PassportMappers.toUpdateDto(currentPassport)
                        )
                    }
                }
            } catch (error) {
                throw new BadRequestException(error)
            }
        }
        console.log("End of parse")
    }

    async getRequestsPagesCount(getRequestsPagesCountDto: GetRequestsPagesCountDto): Promise<number> {
        let myHeaders = new Headers();
        myHeaders.append("Cookie", "session-cookie=" + getRequestsPagesCountDto.session_cookie + ";key=" + getRequestsPagesCountDto.token);

        let requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            let pagesCountRequest = await fetch(
                "https://partner.urfu.ru/learning/request/?mode=requests&own=me&semester=2023-1",
                requestOptions
            )
            let pagesCountRequestJSON = await pagesCountRequest.json();

            return pagesCountRequestJSON.pages.at(-1)[1] || 0;
        } catch (error) {
            throw new InternalServerErrorException("Get pages count error: " + error)
        }
    }

    async getPassportsPagesCount(getPassportsPagesCountDto: GetPassportsPagesCountDto): Promise<number> {
        let myHeaders = new Headers();
        myHeaders.append("Cookie", "session-cookie=" + getPassportsPagesCountDto.session_cookie + ";key=" + getPassportsPagesCountDto.token);

        let requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            let pagesCountRequest = await fetch(
                "https://partner.urfu.ru/learning/request/?mode=projects&semester=" + getPassportsPagesCountDto.semester + "&own=me",
                requestOptions
            )
            let pagesCountRequestJSON = await pagesCountRequest.json();

            return pagesCountRequestJSON.pages.at(-1)[1] || 0;
        } catch (error) {
            throw new InternalServerErrorException("Get pages count error: " + error)
        }
    }

    async parsePassport(parsePassportDto: ParsePassportDto) {
        let myHeaders = new Headers();
        myHeaders.append("Cookie", "session-cookie=" + parsePassportDto.session_cookie + ";key=" + parsePassportDto.token);

        let requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let fullPassport = await fetch(
            "https://partner.urfu.ru/learning/request/" + parsePassportDto.id + "/?comments=yes", requestOptions)
            .then(response => response.json())
            .then(result => result)
            .catch(error => {
                throw new UnauthorizedException(error)
            });

        let mainProgram = fullPassport.programs.find(program => program.is_main)

        return {
            ...fullPassport,
            mainProgram
        }
    }

    async parseRequest(parseRequestDto: ParseRequestDto) {
        let myHeaders = new Headers();
        myHeaders.append("Cookie", "session-cookie=" + parseRequestDto.session_cookie + ";key=" + parseRequestDto.token);

        let requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let fullRequest = await fetch(
            "https://partner.urfu.ru/learning/request/" + parseRequestDto.id + "/?comments=yes", requestOptions)
            .then(response => response.json())
            .then(result => result)
            .catch(error => {
                throw new UnauthorizedException(error)
            });

        return fullRequest;
    }


    async createRequestReport() {
        let requests = await this.requestService.findAll({
            period_id: 8
        })

        let workbook = XLSX.utils.book_new();

        let requestsSheet = {
            '!ref': 'A1:G' + (requests.length + 1), // Sheet Range (Which cells will be included in the output)
            'A1': {
                t: 's',
                v: 'Паспорт',
            },
            'B1': {
                t: 's',
                v: 'Название',
            },
            'C1': {
                t: 's',
                v: 'Описание',
            },
            'D1': {
                t: 's',
                v: 'Цель',
            },
            'E1': {
                t: 's',
                v: 'Критерии',
            },
            'F1': {
                t: 's',
                v: 'Статус',
            },
            'G1': {
                t: 's',
                v: 'Ссылка',
            }
        };

        requests.forEach((request, index) => {
            requestsSheet["A" + (index + 2)] = {t: 's', v: request.uid, }
            requestsSheet["B" + (index + 2)] = {t: 's', v: request.name}
            requestsSheet["C" + (index + 2)] = {t: 's', v: htmlToText(request.description)}
            requestsSheet["D" + (index + 2)] = {t: 's', v: htmlToText(request.goal)}
            requestsSheet["E" + (index + 2)] = {t: 's', v: htmlToText(request.criteria)}
            requestsSheet["F" + (index + 2)] = {t: 's', v: htmlToText(request.status)}
            requestsSheet["G" + (index + 2)] = {t: 's', v: "https://partner.urfu.ru/ptraining/services/learning/#/requests/"+request.id}
        })

        XLSX.utils.book_append_sheet(workbook, requestsSheet, 'Заявки');
        JS_XLSX.writeFile(workbook, 'Заявки.xlsx');
        console.log("End of create report")
    }
}
