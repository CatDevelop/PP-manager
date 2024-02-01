import {Injectable} from '@nestjs/common';
import {Cron, CronExpression} from "@nestjs/schedule";

@Injectable()
export class SheduleManagerService {
    @Cron("0 */30 * * * *")
    async handleCron() {
        const postResponse = await fetch('https://compute.api.cloud.yandex.net/compute/v1/instances/fhmhtmqf4rga3slbcm41:start', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer t1.9euelZqbj83Nl86Px8-KksyMjY2eiu3rnpWamY2Wz86JkMaYiY-RmMbKyp7l9PdoIRBS-e90S1ae3fT3KFANUvnvdEtWns3n9euelZrKnZXLkZSKyMuZnYrKnJuZiu_8xeuelZrKnZXLkZSKyMuZnYrKnJuZig.juadbwqJ726GJk0VHaB9w4_3-oERnAGhJlIKiq7-ozxAfmFzMorE_Zqm4bO1_yrFhCWcv6zeqvTKwJOAJ5s5DQ'
            },
        });

        if (postResponse.ok) {
            console.log('Turn on pincode-dev.ru server');
        }
    }
}
