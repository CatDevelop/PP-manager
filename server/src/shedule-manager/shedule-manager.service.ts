import {Injectable} from '@nestjs/common';
import {Cron, CronExpression} from "@nestjs/schedule";

@Injectable()
export class SheduleManagerService {
    private readonly apiUrl = "http://pincode-dev.ru/";

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleCron() {
        try {
            // @ts-ignore
            const response = await fetch(this.apiUrl, {method: 'GET', timeout: 5000});
            if (response.ok) {
                const data = await response.text();
                console.log('Response:', data);
            } else {
                console.error('Error:', `HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error.message, error.code);
            try {
                const postResponse = await fetch('https://compute.api.cloud.yandex.net/compute/v1/instances/fhmhtmqf4rga3slbcm41:start', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer t1.9euelZqbj83Nl86Px8-KksyMjY2eiu3rnpWamY2Wz86JkMaYiY-RmMbKyp7l9PdoIRBS-e90S1ae3fT3KFANUvnvdEtWns3n9euelZrKnZXLkZSKyMuZnYrKnJuZiu_8xeuelZrKnZXLkZSKyMuZnYrKnJuZig.juadbwqJ726GJk0VHaB9w4_3-oERnAGhJlIKiq7-ozxAfmFzMorE_Zqm4bO1_yrFhCWcv6zeqvTKwJOAJ5s5DQ'
                    },
                });

                if (postResponse.ok) {
                    const postData = await postResponse.text();
                    console.log('POST Response:', postData);
                } else {
                    console.error('POST Error:', `HTTP error! Status: ${postResponse.status}`);
                }
            } catch (postError) {
                console.error('POST Error:', postError.message);
            }
        }
    }
}
