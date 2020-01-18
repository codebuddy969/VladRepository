import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CommonProvider {
    
    private base_route = 'http://usalinksystem.loc/api';
    
    constructor(private http: HttpClient) { }
    
    postRequest(link: string, postdata: any, type?: string): Promise<any> {
    
        const options = {
            headers: new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'})
        };
        
        let request_data: any;
        
        switch(type) {
            case "form":
                request_data = new FormData(postdata);
                break;
            case "object":
                request_data = postdata;
                break;
            default:
                request_data = new FormData();
                for (let key in postdata) {
                    if (!postdata.hasOwnProperty(key)) continue;
                    request_data.append(key, postdata[key]);
                }
        }
        
        return this.http.post(`${this.base_route}/${link}`, request_data, options).toPromise();
    }
    
    getRequest(link): Promise<any> {
        return this.http.get(`${this.base_route}/${link}`).toPromise();
    }
}
