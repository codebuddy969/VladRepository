import {Injectable} from '@angular/core';

declare const SERVICE_URL: string;

@Injectable()
export class JoinUsProvider {

    private URL: string = `${SERVICE_URL}/send`;

    send(data: FormData): Promise<any> {
        return new Promise((resolve, reject) => {
            let xhr: XMLHttpRequest = new XMLHttpRequest();

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.open('POST', this.URL, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(data);
        });
    }

}
