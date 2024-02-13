import {Injectable} from '@nestjs/common';
import {Cron} from "@nestjs/schedule";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class SheduleManagerService {
    constructor(private readonly configService: ConfigService) {
    }

    // @Cron("0 */1 * * * *")
    // async handleCron() {
    //     const postResponse = await fetch('https://compute.api.cloud.yandex.net/compute/v1/instances/fhmhtmqf4rga3slbcm41:start', {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': this.configService.get("YANDEX_TOKEN")
    //         },
    //     });
    //
    //     if (postResponse.ok) {
    //         console.log('Turn on pincode-dev.ru server');
    //     } else {
    //         console.log("Error from turn on pincode-dev.ru server ", postResponse)
    //     }
    // }
}
